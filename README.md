# Indian Tax Calculator - Backend API

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)

**Python Flask API for Indian Income Tax Calculations (FY 2024-25)**

Backend service powering the [Indian Tax Calculator](https://github.com/SGajjar24/indian-tax-calculator) web app.

## 🎯 Features

- ✅ New vs Old Tax Regime comparison
- ✅ Section 80C/80D deductions
- ✅ HRA exemption calculation
- ✅ Standard Deduction
- ✅ RESTful API design

## 🚀 Quick Start

```bash
git clone https://github.com/SGajjar24/indian-tax-calculator-backend.git
cd indian-tax-calculator-backend
pip install -r requirements.txt
python app.py
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/calculate` | POST | Calculate tax for given income |
| `/api/compare` | POST | Compare New vs Old regime |
| `/api/deductions` | POST | Calculate total deductions |

## 👤 Author

**Swetang Gajjar** - [@gajjarswetang](https://linkedin.com/in/gajjarswetang)
