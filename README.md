<p align="center">
  <h1>💰 Indian Tax Calculator - Backend API</h1>
  <p><strong>Python Flask REST API for Indian Income Tax Calculations (FY 2024-25)</strong></p>
</p>

<p align="center">
  <a href="https://www.python.org/downloads/"><img src="https://img.shields.io/badge/python-3.10+-blue.svg" alt="Python 3.10+"></a>
  <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-3.0+-green.svg" alt="Flask"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/FY-2024--25-orange.svg" alt="FY 2024-25">
</p>

---

## 📋 Overview

Backend service providing comprehensive tax computation endpoints for Indian taxpayers. Supports both New and Old tax regimes with full deduction calculations.

## 🎯 Features

| Feature | Description |
|:---|:---|
| **📊 Dual Regime** | New vs Old tax regime comparison |
| **💵 Section 80C** | ₹1.5L limit for PPF, ELSS, etc. |
| **🏥 Section 80D** | Health insurance premium deductions |
| **🏠 HRA Exemption** | Rule-based HRA calculation |
| **📋 Standard Deduction** | ₹50,000 support |

## 🛠️ Technology Stack

| Category | Technology |
|:---|:---|
| **Language** | Python 3.10+ |
| **Framework** | Flask 3.0 |
| **CORS** | Flask-CORS |
| **Validation** | Pydantic |
| **API Format** | RESTful JSON |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SGajjar24/indian-tax-calculator-backend.git
cd indian-tax-calculator-backend

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Server runs at `http://localhost:5000`

## 📡 API Endpoints

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/calculate` | POST | Calculate tax for given income |
| `/api/compare` | POST | Compare New vs Old regime |
| `/api/deductions` | POST | Calculate total eligible deductions |
| `/api/hra` | POST | Calculate HRA exemption |

### Example Request

```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"income": 1500000, "regime": "new"}'
```

### Example Response

```json
{
  "gross_income": 1500000,
  "taxable_income": 1450000,
  "tax_payable": 150000,
  "cess": 6000,
  "total_tax": 156000
}
```

---

## 👤 Author

<table>
  <tr>
    <td><strong>Swetang Gajjar</strong></td>
  </tr>
  <tr>
    <td>Senior AI Engineer | Full-Stack Developer</td>
  </tr>
  <tr>
    <td>
      <a href="https://linkedin.com/in/gajjarswetang">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white" alt="LinkedIn">
      </a>
      <a href="https://github.com/SGajjar24">
        <img src="https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white" alt="GitHub">
      </a>
      <a href="mailto:gajjarswetang@gmail.com">
        <img src="https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white" alt="Email">
      </a>
    </td>
  </tr>
</table>

---

<p align="center">
  <sub>Built with ❤️ for Indian taxpayers</sub>
</p>
