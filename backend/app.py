from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import joblib

from analyzer import analyze_message


app = Flask(__name__)

# Allow React frontend to connect later
CORS(app)


api = Api(
    app,
    version="1.0",
    title="Phishing Fighter AI API",
    description="AI-powered phishing message detection API"
)


ns = api.namespace(
    "phishing",
    description="Phishing detection operations"
)


# Load AI model
model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


# Swagger input model
message_model = api.model(
    "Message",
    {
        "message": fields.String(
            required=True,
            description="Message to analyze"
        )
    }
)


@ns.route("/predict")
class Predict(Resource):

    @ns.expect(message_model)
    def post(self):

        data = api.payload

        message = data["message"]

        # ML Prediction
        vector = vectorizer.transform([message])

        prediction = model.predict(vector)[0]

        probabilities = model.predict_proba(vector)[0]

        confidence = max(probabilities) * 100


        # Rule-based analysis
        risk_score, risk_level, reasons = analyze_message(message)


        return {
            "prediction": prediction.upper(),
            "confidence": round(confidence, 2),
            "risk_score": risk_score,
            "risk_level": risk_level.strip(),
            "reasons": reasons
        }


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )