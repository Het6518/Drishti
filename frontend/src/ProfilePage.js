import { useState } from "react";

function ProfilePage({ onNext }) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [conditions, setConditions] = useState([]);

  const toggleCondition = (cond) => {
    setConditions((prev) =>
      prev.includes(cond)
        ? prev.filter((c) => c !== cond)
        : [...prev, cond]
    );
  };

  const saveProfile = async () => {
    await fetch("https://drishti-backend.onrender.com/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: Number(age),
        height_cm: Number(height),
        weight_kg: Number(weight),
        conditions,
      }),
    });

    onNext();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>User Health Profile</h2>

      <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <br /><br />

      <input placeholder="Height (cm)" onChange={(e) => setHeight(e.target.value)} />
      <br /><br />

      <input placeholder="Weight (kg)" onChange={(e) => setWeight(e.target.value)} />
      <br /><br />

      <h4>Existing Conditions</h4>
      {["diabetes", "hypertension", "asthma"].map((c) => (
        <label key={c}>
          <input type="checkbox" onChange={() => toggleCondition(c)} /> {c}
          <br />
        </label>
      ))}

      <br />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

export default ProfilePage;
