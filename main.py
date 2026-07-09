import joblib
from analyzer import analyze_message

# Load trained AI model
model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

print("\n=== PHISHING FIGHTER AI SYSTEM ===")

while True:
    message = input("\nEnter message/email (or type 'exit'): ")

    if message.lower() == "exit":
        print("\nThank you for using Phishing Fighter AI.")
        break

    # Machine Learning Prediction
    vector = vectorizer.transform([message])
    prediction = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]
    confidence = max(probs) * 100

    # Rule-Based Risk Analysis
    risk_score, risk_level, reasons = analyze_message(message)

    print("\n--- RESULT ---")
    print("Message:", message)
    print("Prediction:", prediction.upper())
    print("AI Confidence:", f"{confidence:.2f}%")

    print("\nRule-Based Analysis")
    print("Risk Score:", f"{risk_score}/100")
    print("Risk Level:", risk_level.strip())

    if reasons:
        print("Reasons:")
        for reason in reasons:
            print(f" - {reason}")
    else:
        print("Reasons: No suspicious keywords detected.")