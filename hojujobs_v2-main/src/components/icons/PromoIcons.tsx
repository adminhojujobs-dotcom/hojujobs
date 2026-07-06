import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SalesTagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g transform="rotate(45 12 12)">
        <path
          d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z"
          fill="#375BF6"
        />
        <circle cx="7.5" cy="7.5" r="2" fill="none" stroke="#0F172A" strokeWidth="1.6" />
        <circle cx="7.5" cy="7.5" r="0.9" fill="#fff" />
        <line x1="12.6" y1="14" x2="15.6" y2="11" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="15" y1="16.6" x2="18" y2="13.6" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function NewsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M16 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-4-4Z" fill="#D7DAE0" />
      <path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8l-4-5Z" fill="#F2F3F6" />
      <rect x="6.5" y="7" width="4.4" height="3.2" rx="0.6" fill="#375BF6" />
      <line x1="12.2" y1="7.6" x2="16" y2="7.6" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="12.2" y1="9.6" x2="16" y2="9.6" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6.5" y1="13" x2="17" y2="13" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6.5" y1="15.4" x2="17" y2="15.4" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6.5" y1="17.8" x2="14.5" y2="17.8" stroke="#111827" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function EventsCalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="6.4" y="1.4" width="1.6" height="4" rx="0.8" fill="#111827" />
      <rect x="15.9" y="1.4" width="1.6" height="4" rx="0.8" fill="#111827" />
      <rect x="3" y="4" width="18" height="17" rx="2.2" fill="#F2F3F6" />
      <path d="M3 6.2A2.2 2.2 0 0 1 5.2 4h13.6A2.2 2.2 0 0 1 21 6.2V8H3Z" fill="#375BF6" />
      <rect x="6" y="11" width="3" height="3" rx="0.6" fill="#C7CAD2" />
      <rect x="10.5" y="11" width="3" height="3" rx="0.6" fill="#C7CAD2" />
      <rect x="15" y="11" width="3" height="3" rx="0.6" fill="#C7CAD2" />
      <rect x="6" y="15" width="3" height="3" rx="0.6" fill="#C7CAD2" />
      <rect x="10.5" y="15" width="3" height="3" rx="0.6" fill="#C7CAD2" />
      <rect x="15" y="15" width="3" height="3" rx="0.6" fill="#375BF6" />
    </svg>
  );
}
