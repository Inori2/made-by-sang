const BORDER_COLOR_MAP = {
  dark: 'var(--primary-800)',
  light: 'var(--primary-300)',
};

export default function GridPattern({
  amount = 2,
  className,
  borderTone = 'dark',
}) {
  const resolvedBorderColor =
    BORDER_COLOR_MAP[borderTone] ?? BORDER_COLOR_MAP.dark;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid h-full w-full grid-cols-4 px-5 ${className ?? ''}`}
      style={{
        zIndex: -1,
        '--grid-pattern-border-color': resolvedBorderColor,
      }}
    >
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className={`h-full w-full border-r-[0.3px] border-l-[0.3px] ${i === 0 ? 'col-start-2' : ''}`}
          style={{ borderColor: 'var(--grid-pattern-border-color)' }}
        ></div>
      ))}
    </div>
  );
}
