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
- Detection reasons

2. How It Works

The system follows this workflow:

1. User enters a message or email content.
2. The text is converted into numerical features using CountVectorizer.
3. A trained Machine Learning model analyzes the message.
4. The system predicts the category:
   - Safe
   - Suspicious
   - Phishing
5. A rule-based analyzer calculates:
   - Risk score
   - Risk level
   - Reasons for detection

3. Technologies Used

- Python
- Machine Learning
- Scikit-learn
- Pandas
- Joblib
- CountVectorizer
- Multinomial Naive Bayes

 4. Features

Version 1 - Keyword Detection
- Basic phishing keyword analysis
- Message classification:
  - Safe
  - Suspicious
  - Phishing

 Version 2 - Risk Analysis
- Added risk score system
- Added detection reasons
- Improved message analysis

Version 3 - AI Phishing Detection
- Added Machine Learning classifier
- Added text feature extraction
- Added AI confidence score
- Combined ML prediction with rule-based analysis
- Added explainable detection results

5. Project Goal
This project simulates a phishing detection system used in cybersecurity awareness and SOC training environments.


