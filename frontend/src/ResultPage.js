import React from "react";

function ResultPage({ result, loading }) {
  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <div className="spinner" />
        <p style={{ marginTop: 15, color: "#555" }}>
          Analyzing your symptoms...
        </p>
      </div>
    );
  }

  if (!result) return null;

  const urgencyColor =
    result.urgency === "HIGH"
      ? "#b91c1c"
      : result.urgency === "MODERATE"
      ? "#92400e"
      : "#166534";

  const urgencyBg =
    result.urgency === "HIGH"
      ? "#fee2e2"
      : result.urgency === "MODERATE"
      ? "#fef3c7"
      : "#dcfce7";

  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="container">
      <h2>Assessment Result</h2>

      {/* Urgency badge */}
      <div
        style={{
          display: "inline-block",
          padding: "8px 14px",
          borderRadius: "999px",
          fontWeight: 600,
          background: urgencyBg,
          color: urgencyColor,
          marginBottom: 20
        }}
      >
        {result.urgency} URGENCY
      </div>

      {/* Confidence */}
      <p style={{ marginTop: 15 }}>
        Confidence: <strong>{confidencePercent}%</strong>
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 10,
          background: "#eee",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20
        }}
      >
        <div
          style={{
            width: `${confidencePercent}%`,
            height: "100%",
            background: urgencyColor,
            transition: "width 0.5s ease"
          }}
        />
      </div>

      <p style={{ fontSize: 14, color: "#555" }}>
        {result.disclaimer}
      </p>

      {result.urgency === "HIGH" && (
        <button
          style={{ marginTop: 20 }}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/nearby+doctor",
              "_blank"
            )
          }
        >
          Find Nearby Doctor
        </button>
      )}
    </div>
  );
}

export default ResultPage;
