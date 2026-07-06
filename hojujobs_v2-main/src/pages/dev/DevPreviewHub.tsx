import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const previewLinks = [
  { href: "/dev/preview/onboarding", label: "온보딩 (계정 유형 선택)" },
  { href: "/dev/preview/profile/job-seeker", label: "일반 회원 프로필 / CV" },
  { href: "/dev/preview/profile/business", label: "사업자 프로필 + 공고 목록" },
  { href: "/dev/preview/post-job", label: "사업자 채용 공고 등록" },
];

export default function DevPreviewHub() {
  useSEO({ title: "Dev previews | Hoju Jobs", noindex: true });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Local dev only</p>
        <h1 className="mb-3 text-2xl font-black text-neutral-950">Auth flow previews</h1>
        <p className="mb-8 text-sm text-slate-600">
          These pages mock a logged-in session so you can review UI without OAuth. Saves and submits are disabled or will fail without a real account.
        </p>
        <div className="grid gap-3">
          {previewLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
