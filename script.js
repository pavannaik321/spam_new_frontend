// function checkNews() {
//     let newsInput = document.getElementById("newsInput").value;
//     let resultBox = document.getElementById("result");

//     if (newsInput.trim() === "") {
//         resultBox.innerHTML = "⚠️ Please enter some text!";
//         resultBox.className = "result-box unreliable";
//         return;
//     }

//     // Simulating API Response
//     let isFake = Math.random() < 0.5; // Simulated random response

//     if (isFake) {
//         resultBox.innerHTML = "🚨 Unreliable News!";
//         resultBox.className = "result-box unreliable";
//     } else {
//         resultBox.innerHTML = "✅ Reliable News!";
//         resultBox.className = "result-box reliable";
//     }
// }







async function checkNews() {
    let newsInput = document.getElementById("newsInput").value;
    let resultBox = document.getElementById("result");

    if (newsInput.trim() === "") {
        resultBox.innerHTML = "⚠️ Please enter some text!";
        resultBox.className = "result-box unreliable";
        return;
    }

    // Call FastAPI backend
    try {
        let response = await fetch("https://spam-news-flask-backend.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ news: newsInput })
        });

        let data = await response.json();
        
        if (data.prediction === 1) {
            resultBox.innerHTML = "🚨 Unreliable News!";
            resultBox.className = "result-box unreliable";
        } else {
            resultBox.innerHTML = "✅ Reliable News!";
            resultBox.className = "result-box reliable";
        }
    } catch (error) {
        resultBox.innerHTML = "❌ Error connecting to server!";
        resultBox.className = "result-box unreliable";
        console.error("Error:", error);
    }
}
