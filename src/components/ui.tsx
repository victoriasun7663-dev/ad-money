import Link from "next/link";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-6 pb-8 pt-6">{children}</main>
  );
}

export function TopBar({ back, step, title }: { back?: string; step?: [number, number]; title?: string }) {
  return (
    <div className="flex items-center gap-3">
      {back && (
        <Link
          href={back}
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-xl border border-line"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      {title && <span className="font-display text-lg font-bold">{title}</span>}
      {step && (
        <>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: step[1] }, (_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step[0] ? "bg-brand" : "bg-line"}`} />
            ))}
          </div>
          <span className="text-[13px] text-muted">
            {step[0]} of {step[1]}
          </span>
        </>
      )}
    </div>
  );
}

const buttonBase =
  "flex items-center justify-center gap-2 rounded-2xl font-semibold disabled:cursor-not-allowed disabled:opacity-50";
export const buttonPrimary = `${buttonBase} h-14 bg-brand text-brand-ink text-[17px]`;
export const buttonSecondary = `${buttonBase} h-12 border border-[#3a3150] text-[15px] font-medium`;

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-panel p-4 ${className}`}>{children}</div>;
}

/** Renders copy strings, turning **double-asterisk** runs into bold. */
export function Rich({ text, strongClass }: { text: string; strongClass?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={strongClass}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold tracking-[0.08em] text-muted">{children}</span>;
}
