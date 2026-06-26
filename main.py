import joblib

model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

print("\n=== PHISHING FIGHTER AI SYSTEM ===")

while True:
    message = input("\nEnter message/email (or type 'exit'): ")

    if message.lower() == "exit":
        break

    vector = vectorizer.transform([message])

    prediction = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]

    confidence = max(probs) * 100

    # LEVEL LOGIC
    if prediction == "phishing":
        level = "PHISHING"
    elif prediction == "suspicious":
        level = "SUSPICIOUS"
    else:
        level = "SAFE"

    print("\n--- RESULT ---")
    print("Message:", message)
    print("Prediction:", prediction.upper())
    print("Level:", level)
    print("Confidence:", f"{confidence:.2f}%")