export default function GridPattern({ amount = 2, className }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 grid h-screen grid-cols-4 px-5 ${className ?? ''} z-1`}
    >
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className={`h-full w-full border-r-[0.3px] border-l-[0.3px] border-neutral-900 ${i === 0 ? 'col-start-2' : ''}`}
        ></div>
      ))}
    </div>
  );
}
