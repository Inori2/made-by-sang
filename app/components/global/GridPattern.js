export default function GridPattern({
  amount = 4,
  position = "absolute",
  className,
}) {
  return (
    <div
      className={`${position} inset-0 flex items-center justify-center w-full h-full px-5 ${className}`}
    >
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className="w-full h-full border-l-[0.3px] border-r-[0.3px] border-neutral-900"
        ></div>
      ))}
    </div>
  );
}
