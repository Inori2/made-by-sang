export default function GridPattern({
  amount = 2,
  position = "absolute",
  className,
}) {
  return (
    <div
      className={`${position} inset-0 grid grid-cols-4 px-5 pointer-events-none ${className ?? ""} z-1`}
    >
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-full border-l-[0.3px] border-r-[0.3px] border-neutral-900 ${i === 0 ? "col-start-2" : ""}`}
        ></div>
      ))}
    </div>
  );
}
