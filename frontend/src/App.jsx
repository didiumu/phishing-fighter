import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem(
      "scanHistory",
      JSON.stringify(history)
    );
  }, [history]);



  const analyzeMessage = async () => {

    if (!message.trim()) return;


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/phishing/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: message,
          }),
        }
      );


      const data = await response.json();


      setResult(data);



      const scan = {

        message:
          message.length > 35
            ? message.substring(0, 35) + "..."
            : message,

        result: data.prediction,

        score: data.risk_score,

        date: new Date().toLocaleString(),

      };


      setHistory((prev) => [
        scan,
        ...prev,
      ]);



    } catch (error) {

      console.error(error);

      alert(
        "Cannot connect to Phishing Fighter API"
      );

    }


    setLoading(false);

  };





  const clearAll = () => {

    setMessage("");

    setResult(null);

  };





  const clearHistory = () => {

    setHistory([]);

    localStorage.removeItem(
      "scanHistory"
    );

  };





  const phishingCount = history.filter(
    (item) =>
      item.result === "PHISHING"
  ).length;



  const suspiciousCount = history.filter(
    (item) =>
      item.result === "SUSPICIOUS"
  ).length;



  const safeCount = history.filter(
    (item) =>
      item.result === "SAFE"
  ).length;




  const getRiskColor = () => {

    if (!result) return "";

    if (result.risk_level === "PHISHING")
      return "bg-red-50 border-red-500";


    if (result.risk_level === "SUSPICIOUS")
      return "bg-yellow-50 border-yellow-500";


    return "bg-green-50 border-green-500";

  };





  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-5xl mx-auto">


        <div className="bg-white rounded-xl shadow-lg p-8">


          <h1 className="text-4xl font-bold text-center text-blue-700">

            🛡️ Phishing Fighter AI

          </h1>



          <p className="text-center text-gray-600 mt-2">

            AI-powered phishing message detection system

          </p>





          <textarea

            className="w-full mt-6 p-4 border rounded-lg h-40"

            placeholder="Paste SMS, Email or WhatsApp message here..."

            value={message}

            onChange={(e)=>
              setMessage(e.target.value)
            }

          />





          <div className="flex gap-3 mt-4">


            <button

              onClick={analyzeMessage}

              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

            >

              {
                loading
                ? "Analyzing..."
                : "🔍 Analyze Message"
              }

            </button>




            <button

              onClick={clearAll}

              className="px-6 bg-gray-300 rounded-lg"

            >

              Clear

            </button>


          </div>






          <div className="mt-5 flex gap-4">


            <button

              className="text-red-600 font-semibold"

              onClick={()=>setMessage(
                "URGENT! Your bank account has been suspended. Click here to verify your account immediately."
              )}

            >

              🚨 Phishing Example

            </button>




            <button

              className="text-green-600 font-semibold"

              onClick={()=>setMessage(
                "Hello, our meeting is scheduled tomorrow at 10 AM. See you there."
              )}

            >

              ✅ Safe Example

            </button>


          </div>







          {result && (

            <div
              className={`mt-8 border-2 rounded-xl p-6 ${getRiskColor()}`}
            >


              <h2 className="text-2xl font-bold mb-5">

                📊 Analysis Result

              </h2>





              <div className="grid md:grid-cols-2 gap-4">


                <div className="bg-white p-4 rounded-lg shadow">

                  <p className="text-gray-500">
                    Prediction
                  </p>


                  <p
                  className={`text-2xl font-bold ${
                    result.prediction === "PHISHING"
                    ? "text-red-600"
                    :
                    result.prediction === "SUSPICIOUS"
                    ? "text-yellow-600"
                    :
                    "text-green-600"
                  }`}
                  >

                    {result.prediction}

                  </p>

                </div>





                <div className="bg-white p-4 rounded-lg shadow">

                  <p className="text-gray-500">
                    AI Confidence
                  </p>

                  <p className="text-2xl font-bold">
                    {result.confidence}%
                  </p>

                </div>






                <div className="bg-white p-4 rounded-lg shadow">

                  <p className="text-gray-500">
                    Risk Score
                  </p>


                  <p className="text-2xl font-bold">

                    {result.risk_score}/100

                  </p>



                  <div className="w-full bg-gray-200 rounded-full h-3 mt-3">


                    <div

                    className="bg-red-600 h-3 rounded-full"

                    style={{
                      width:
                      `${result.risk_score}%`
                    }}

                    ></div>


                  </div>


                </div>






                <div className="bg-white p-4 rounded-lg shadow">

                  <p className="text-gray-500">
                    Risk Level
                  </p>

                  <p className="text-2xl font-bold">

                    {result.risk_level}

                  </p>

                </div>



              </div>







              <div className="bg-white rounded-lg p-5 mt-5 shadow">


                <h3 className="font-bold text-lg">

                  🔍 Detection Reasons

                </h3>



                {
                  result.reasons.length > 0 ?

                  <ul className="list-disc ml-6 mt-3">

                    {
                      result.reasons.map(
                        (reason,index)=>(

                          <li key={index}>
                            {reason}
                          </li>

                        )
                      )
                    }

                  </ul>


                  :

                  <p className="text-gray-500 mt-2">
                    No suspicious indicators detected.
                  </p>

                }


              </div>


            </div>

          )}








          <div className="mt-10">


            <h2 className="text-xl font-bold">
              📊 Security Dashboard
            </h2>




            <div className="grid grid-cols-3 gap-4 mt-4">


              <div className="bg-red-100 p-5 rounded-lg text-center">

                🚨 Phishing

                <p className="text-3xl font-bold">
                  {phishingCount}
                </p>

              </div>



              <div className="bg-yellow-100 p-5 rounded-lg text-center">

                ⚠️ Suspicious

                <p className="text-3xl font-bold">
                  {suspiciousCount}
                </p>

              </div>




              <div className="bg-green-100 p-5 rounded-lg text-center">

                ✅ Safe

                <p className="text-3xl font-bold">
                  {safeCount}
                </p>

              </div>


            </div>


          </div>







          <div className="mt-10">


            <div className="flex justify-between">


              <h2 className="text-xl font-bold">
                📋 Scan History
              </h2>


              <button

              onClick={clearHistory}

              className="text-red-600"

              >

                🗑 Clear History

              </button>


            </div>





            <table className="w-full mt-4 border">


              <thead>

                <tr className="bg-gray-200">

                  <th className="border p-2">
                    Message
                  </th>

                  <th className="border p-2">
                    Result
                  </th>

                  <th className="border p-2">
                    Score
                  </th>

                  <th className="border p-2">
                    Date
                  </th>


                </tr>

              </thead>



              <tbody>


              {
                history.map(
                  (item,index)=>(

                    <tr key={index}>

                      <td className="border p-2">
                        {item.message}
                      </td>

                      <td className="border p-2 font-bold">
                        {item.result}
                      </td>

                      <td className="border p-2">
                        {item.score}/100
                      </td>

                      <td className="border p-2">
                        {item.date}
                      </td>


                    </tr>

                  )
                )
              }


              </tbody>


            </table>


          </div>



        </div>





        <footer className="text-center mt-6 text-gray-600">

          Phishing Fighter AI © 2026 | Built with React, Flask & Machine Learning

        </footer>


      </div>


    </div>

  );

}


export default App;