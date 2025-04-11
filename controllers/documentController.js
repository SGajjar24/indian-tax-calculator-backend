/**
 * Document Controller for handling document uploads and AI processing
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, PNG, and Excel files are allowed.'), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Initialize Gemini AI
// Note: In a production environment, API key would be stored in environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');

/**
 * Extract text from PDF document
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Process document with Gemini AI
 */
const processDocumentWithAI = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
    You are a tax document analyzer for Indian tax documents for FY 2024-2025. 
    Analyze the following text extracted from a tax document and extract the following information:
    
    1. Income details:
       - Salary income
       - Business/Professional income
       - Capital gains
       - Income from house property
       - Income from other sources
    
    2. Deduction details:
       - Section 80C investments (PPF, ELSS, etc.)
       - Section 80D (medical insurance)
       - HRA exemption
       - LTA exemption
       - NPS contribution
       - Home loan interest
       - Other deductions
    
    3. Recommended tax regime (old or new) based on the extracted information
    
    Format your response as a JSON object with the following structure:
    {
      "incomeDetails": {
        "salaryIncome": number,
        "businessIncome": number,
        "capitalGains": number,
        "housePropertyIncome": number,
        "otherIncome": number
      },
      "deductionDetails": {
        "section80C": number,
        "section80D": number,
        "hra": number,
        "lta": number,
        "nps": number,
        "homeLoanInterest": number,
        "otherDeductions": number
      },
      "taxRegime": "old" or "new"
    }
    
    If you cannot determine a value, use 0. If you cannot determine the tax regime, use "old".
    
    Document text:
    ${text}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();
    
    // Extract JSON from response (in case there's additional text)
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
    
  } catch (error) {
    console.error('Error processing document with AI:', error);
    throw new Error('Failed to process document with AI');
  }
};

/**
 * Upload document controller
 */
const uploadDocument = (req, res) => {
  const uploadMiddleware = upload.array('documents', 5); // Allow up to 5 files
  
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }
    
    try {
      // Return successful upload response
      res.status(200).json({
        success: true,
        message: 'Files uploaded successfully',
        files: req.files.map(file => ({
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        }))
      });
    } catch (error) {
      console.error('Error in upload controller:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during upload'
      });
    }
  });
};

/**
 * Process document controller
 */
const processDocument = async (req, res) => {
  try {
    const { filename } = req.body;
    
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Filename is required'
      });
    }
    
    const filePath = path.join(__dirname, '../../uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    // Extract text based on file type
    let text;
    if (path.extname(filename).toLowerCase() === '.pdf') {
      text = await extractTextFromPDF(filePath);
    } else {
      // For other file types, we would need different extraction methods
      // For this example, we'll return an error for non-PDF files
      return res.status(400).json({
        success: false,
        message: 'Only PDF processing is currently implemented'
      });
    }
    
    // Process text with Gemini AI
    const extractedData = await processDocumentWithAI(text);
    
    res.status(200).json({
      success: true,
      message: 'Document processed successfully',
      data: extractedData
    });
    
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document processing'
    });
  }
};

module.exports = {
  uploadDocument,
  processDocument
};
