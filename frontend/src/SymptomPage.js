import { useState } from "react";

function SymptomPage({ onResult }) {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");

  const analyze = async () => {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symptoms,
        age: Number(age),
      }),
    });

    const data = await res.json();
    onResult(data);
  };

  return (
    <div className="container">
      <h2>Describe Your Symptoms</h2>

      <textarea
        rows="4"
        placeholder="e.g. fever and headache"
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Age (used if profile not set)"
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />
      <button onClick={analyze}>Analyze</button>
    </div>
  );
}

export default SymptomPage;
