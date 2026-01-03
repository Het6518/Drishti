import { useState } from "react";

function SymptomPage({ onResult }) {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);

    const res = await fetch("https://drishti-backend.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symptoms,
        age: Number(age),
      }),
    });

    const data = await res.json();
    setLoading(false);
    onResult(data);
  };

  return (
    <div className="container">
      <h2>Describe Your Symptoms</h2>

      <textarea
        rows="4"
        placeholder="e.g. fever and headache"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

      <button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default SymptomPage;
