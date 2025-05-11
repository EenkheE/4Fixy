import styles from "../styles/RiskMatrix.module.css";

const RiskMatrix = ({ likelihood, impact }) => {
  const getRiskLevel = (likelihood, impact) => {
    const score = likelihood * impact;
    if (score >= 17) return { level: "Critical", color: "#dc3545" };
    if (score >= 10) return { level: "High", color: "#fd7e14" };
    if (score >= 5) return { level: "Moderate", color: "#ffc107" };
    return { level: "Low", color: "#28a745" };
  };

  const risk = likelihood && impact ? getRiskLevel(likelihood, impact) : null;

  const matrix = [
    [25, 20, 15, 10, 5],
    [20, 16, 12, 8, 4],
    [15, 12, 9, 6, 3],
    [10, 8, 6, 4, 2],
    [5, 4, 3, 2, 1],
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Risk Assessment Matrix</h3>
      <div className={styles.matrix}>
        <div className={styles.axisLabel}>Impact</div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            <div className={styles.label}>
              {
                ["Catastrophic", "Major", "Moderate", "Minor", "Negligible"][
                  rowIndex
                ]
              }
            </div>
            {row.map((score, colIndex) => {
              const cellLikelihood = 5 - colIndex;
              const cellImpact = 5 - rowIndex;
              const isSelected =
                likelihood === cellLikelihood && impact === cellImpact;
              const cellRisk = getRiskLevel(cellLikelihood, cellImpact);
              return (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${
                    isSelected ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: cellRisk.color }}
                >
                  {cellRisk.level}
                </div>
              );
            })}
          </div>
        ))}
        <div className={styles.bottomLabels}>
          <div className={styles.label}>Likelihood</div>
          {["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"].map(
            (label, index) => (
              <div key={index} className={styles.label}>
                {label}
              </div>
            )
          )}
        </div>
      </div>
      {risk && (
        <div className={styles.summary}>
          <strong>Risk Level:</strong> {risk.level} (Likelihood: {likelihood},
          Impact: {impact})
        </div>
      )}
    </div>
  );
};

export default RiskMatrix;
