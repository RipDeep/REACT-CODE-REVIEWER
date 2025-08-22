function QualityScore({ score }) {
  const radius = 48; // circle radius
  const stroke = 8; // thickness
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  // choose color based on score
  const color =
    score >= 80
      ? "text-green-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#374151" // background circle (gray-700)
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`absolute text-xl font-bold ${color}`}
      >
        {score}%
      </span>
    </div>
  );
}
