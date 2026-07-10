import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/phishing/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }

    setLoading(false);
  };

  const clearAll = () => {
    setMessage("");
    setResult(null);
  };

  const getBadgeColor = () => {
    if (!result) return "";

    switch (result.prediction) {
      case "PHISHING":
        return "bg-red-600";
      case "SUSPICIOUS":
        return "bg-yellow-500";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          🛡️ Phishing Fighter AI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI-powered phishing message detection system
        </p>

        <textarea
          className="w-full mt-8 border rounded-xl p-4 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste SMS, Email or WhatsApp message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex gap-4 mt-5">

          <button
            onClick={analyzeMessage}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "🔍 Analyze Message"}
          </button>

          <button
            onClick={clearAll}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-xl"
          >
            Clear
          </button>

        </div>

        {result && (

          <div className="mt-8 border rounded-xl p-6 bg-gray-50">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Analysis Result
              </h2>

              <span
                className={`text-white px-4 py-2 rounded-full ${getBadgeColor()}`}
              >
                {result.prediction}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <p>
                <strong>AI Confidence:</strong> {result.confidence}%
              </p>

              <p>
                <strong>Risk Score:</strong> {result.risk_score}/100
              </p>

              <div>

                <div className="w-full bg-gray-300 rounded-full h-4">

                  <div
                    className="bg-red-600 h-4 rounded-full"
                    style={{
                      width: `${result.risk_score}%`,
                    }}
                  ></div>

                </div>

              </div>

              <p>
                <strong>Risk Level:</strong> {result.risk_level}
              </p>

              <div>

                <h3 className="font-bold mb-2">
                  Detection Reasons
                </h3>

                <ul className="list-disc ml-6">

                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        )}

        <div className="text-center mt-8 text-gray-400 text-sm">
          Phishing Fighter AI © 2026 | Built with React, Flask & Machine Learning
        </div>

      </div>

    </div>
  );
}

export default App;