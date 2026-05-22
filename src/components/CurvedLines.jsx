export function CurvedLines() {
  const paths = Array.from({ length: 8 }, (_, index) => {
    const offset = index * 40;
    return `M ${-180} ${80 + offset} C ${180} ${230 + offset}, ${520} ${310 + offset}, ${900} ${420 + offset} S ${1320} ${650 + offset}, ${1620} ${820 + offset}`;
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="white"
          strokeWidth="0.8"
          fill="none"
          opacity="0.05"
        />
      ))}
    </svg>
  );
}

export default CurvedLines;
