import { Link, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import hojuJobsLogo from "@/assets/hoju-jobs-logo.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "채용정보", to: "/" },
  { label: "온세일", to: "/sales" },
  { label: "뉴스", to: "/news" },
  { label: "이벤트", to: "/" },
  { label: "플렛메이트", to: "/flatmates" },
];

export function ModernHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-neutral-100 bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1520px] items-center justify-between px-6 lg:hidden">
        <Link to="/" className="inline-flex min-w-0 items-center" aria-label="Hoju Jobs home">
          <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-[46px] w-auto max-w-[220px] object-contain" />
        </Link>

        <div className="flex shrink-0 items-center gap-4">
          <button type="button" aria-label="검색" className="inline-flex h-12 w-12 items-center justify-center text-neutral-950" onClick={() => navigate("/")}>
            <Search className="h-[34px] w-[34px]" strokeWidth={2.6} />
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button type="button" aria-label="메뉴 열기" className="inline-flex h-12 w-12 items-center justify-center text-neutral-950">
                <Menu className="h-[36px] w-[36px]" strokeWidth={2.6} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(22rem,85vw)] p-0">
              <SheetHeader className="border-b border-slate-100 px-6 py-5 text-left">
                <SheetTitle>
                  <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-1 px-6 py-5 text-xl font-black text-neutral-950">
                {navItems.map((item) => (
                  <Link key={item.label} to={item.to} className="rounded-md py-3 transition-colors hover:text-blue-700">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="grid gap-2 border-t border-slate-100 px-6 py-5">
                <button type="button" onClick={() => navigate("/auth")} className="h-12 rounded-md bg-blue-600 px-5 text-base font-black text-white">
                  회원가입
                </button>
                <button type="button" onClick={() => navigate("/auth")} className="h-12 rounded-md border border-slate-200 px-5 text-base font-black text-slate-700">
                  로그인
                </button>
                <button type="button" onClick={() => navigate("/post-job")} className="h-12 rounded-md border border-slate-200 px-5 text-base font-black text-slate-700">
                  공고 등록
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1520px] flex-col gap-5 px-5 py-6 lg:flex lg:px-14">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-1 items-center gap-10">
            <Link to="/" className="inline-flex items-center" aria-label="Hoju Jobs home">
              <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-8 w-auto sm:h-10" />
            </Link>
            <form
              className="hidden h-12 w-full max-w-[520px] items-center rounded-full border-2 border-blue-600 bg-white pl-9 pr-5 lg:flex"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                aria-label="알바 검색"
                className="min-w-0 flex-1 bg-transparent text-base font-semibold text-neutral-900 outline-none placeholder:text-slate-400"
                placeholder="어떤 알바를 찾으세요?"
              />
              <Search className="h-6 w-6 text-neutral-300" />
            </form>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <nav className="grid flex-1 grid-cols-3 gap-2 text-base font-black text-neutral-950 sm:flex sm:items-center sm:gap-9 lg:text-xl">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="whitespace-nowrap text-left transition-colors hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <button type="button" onClick={() => navigate("/auth")} className="h-12 px-3 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900">
              로그인
            </button>
            <button type="button" onClick={() => navigate("/auth")} className="h-12 rounded-2xl bg-blue-600 px-5 text-base font-black text-white transition-colors hover:bg-blue-700">
              회원가입
            </button>
            <button type="button" onClick={() => navigate("/my-posts")} className="h-12 rounded-2xl border border-slate-200 bg-white px-5 text-base font-black text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950">
              이력서 등록
            </button>
            <button type="button" onClick={() => navigate("/post-job")} className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-base font-black text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950">
              공고 등록
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
