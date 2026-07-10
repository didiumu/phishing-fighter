Phishing Fighter AI

1. Description

Phishing Fighter AI: is a cybersecurity tool designed to detect phishing messages using Machine Learning and rule-based risk analysis.

The system analyzes user-provided messages and classifies them into:

- SAFE
- SUSPICIOUS
- PHISHING

It also provides:

- AI confidence score
- Risk score
- Risk level
- Detection reasons

The project simulates a phishing detection solution used in cybersecurity awareness and SOC training environments.

2. How It Works

The system follows this workflow:

1. User enters a message or email content.
2. The text is converted into numerical features using 
CountVectorizer.
3. A trained Machine Learning model analyzes the message.
4. The AI model predicts the category:

   - Safe
   - Suspicious
   - Phishing

5. A rule-based analyzer performs additional security analysis:

   - Risk score calculation
   - Risk level classification
   - Detection reason extraction

6. The final result is returned through the application interface or API.

3. Technologies Used

 Machine Learning

- Python
- Scikit-learn
- Pandas
- Joblib
- CountVectorizer
- Multinomial Naive Bayes

Backend API

- Flask
- Flask-RESTX
- Flask-CORS
- Swagger UI

4. Features

 Version 1: Keyword Detection
- Basic phishing keyword analysis
- Message classification:

  - Safe
  - Suspicious
  - Phishing

Version 2: Risk Analysis
- Added risk score system
- Added detection reasons
- Improved message analysis

Version 3 : AI Phishing Detection

- Added Machine Learning classifier
- Added text feature extraction
- Added AI confidence score
- Combined ML prediction with rule-based analysis
- Added explainable detection results


Version 4: Web API Integration

- Added Flask REST API
- Added Swagger API documentation
- Added `/phishing/predict` endpoint
- Enabled communication with frontend applications
- Returned JSON-based detection results

Example API response:

json
{
  "prediction": "PHISHING",
  "confidence": 98.76,
  "risk_score": 100,
  "risk_level": "PHISHING",
  "reasons": [
    "bank",
    "urgent",
    "account",
    "suspended",
    "verify",
    "click here"
  ]
}