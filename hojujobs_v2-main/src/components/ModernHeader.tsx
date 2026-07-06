import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, Shield } from "lucide-react";
import hojuJobsLogo from "@/assets/hoju-jobs-logo.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  children?: Array<{
    label: string;
    to: string;
  }>;
}

const navItems: NavItem[] = [
  { label: "채용정보", to: "/", children: [{ label: "회사 디렉토리", to: "/directory" }, { label: "사용자 업로드 공고", to: "/jobs" }] },
  { label: "온세일", to: "/sales" },
  { label: "뉴스", to: "/news" },
  { label: "이벤트", to: "/events" },
  { label: "플렛메이트", to: "/flatmates" },
];

function isNavActive(pathname: string, to: string) {
  if (to === "/") {
    return pathname === "/" || ["/sydney", "/melbourne", "/brisbane", "/adelaide", "/directory", "/jobs"].includes(pathname);
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function ModernHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const navLinkClass = (to: string) =>
    cn(
      "whitespace-nowrap text-left transition-colors hover:text-blue-700",
      isNavActive(location.pathname, to) && "text-blue-600",
    );

  const mobileNavLinkClass = (to: string) =>
    cn(
      "rounded-md py-3 transition-colors hover:text-blue-700",
      isNavActive(location.pathname, to) && "text-blue-600",
    );

  const loginButtonClass =
    "inline-flex h-12 items-center rounded-2xl bg-blue-600 px-5 text-base font-black text-white transition-colors hover:bg-blue-700";
  const secondaryButtonClass =
    "h-12 rounded-2xl border border-slate-200 bg-white px-5 text-base font-black text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950";

  const actionButtons = user ? (
    <>
      <button type="button" onClick={() => navigate("/profile")} className={secondaryButtonClass}>
        내 프로필
      </button>
      {isAdmin && (
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className={cn(secondaryButtonClass, "inline-flex items-center gap-2")}
        >
          <Shield className="h-4 w-4" />
          관리
        </button>
      )}
    </>
  ) : (
    <button type="button" onClick={() => navigate("/auth")} className={loginButtonClass}>
      로그인
    </button>
  );

  const mobileSecondaryButtonClass =
    "h-12 rounded-md border border-slate-200 px-5 text-base font-black text-slate-700";

  const mobileActionButtons = user ? (
    <>
      <button type="button" onClick={() => navigate("/profile")} className={mobileSecondaryButtonClass}>
        내 프로필
      </button>
      {isAdmin && (
        <button type="button" onClick={() => navigate("/admin")} className={mobileSecondaryButtonClass}>
          관리
        </button>
      )}
    </>
  ) : (
    <button type="button" onClick={() => navigate("/auth")} className="h-12 rounded-md bg-blue-600 px-5 text-base font-black text-white">
      로그인
    </button>
  );

  return (
    <header className="border-b border-neutral-100 bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1220px] items-center justify-between px-5 lg:hidden">
        <Link to="/" className="inline-flex min-w-0 items-center" aria-label="Hoju Jobs home">
          <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-9 w-auto max-w-[170px] object-contain" />
        </Link>

        <div className="flex shrink-0 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" aria-label="메뉴 열기" className="inline-flex h-9 w-9 items-center justify-center text-neutral-950">
                <Menu className="h-7 w-7" strokeWidth={2.3} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(22rem,85vw)] p-0">
              <SheetHeader className="border-b border-slate-100 px-6 py-5 text-left">
                <SheetTitle>
                  <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-1 px-6 py-5 text-lg font-black text-neutral-950">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link to={item.to} className={mobileNavLinkClass(item.to)}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-3 grid border-l border-slate-100 pl-4 text-base text-slate-500">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.to} className={mobileNavLinkClass(child.to)}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="grid gap-2 border-t border-slate-100 px-6 py-5">{mobileActionButtons}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1220px] items-center justify-between gap-5 px-5 py-6 lg:flex lg:px-14">
        <Link to="/" className="inline-flex shrink-0 items-center" aria-label="Hoju Jobs home">
          <img src={hojuJobsLogo} alt="Hoju Jobs" className="h-8 w-auto sm:h-10" />
        </Link>

        <nav className="grid flex-1 grid-cols-3 gap-2 px-6 text-base font-black text-neutral-950 sm:flex sm:items-center sm:justify-center sm:gap-8 lg:text-lg">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                <Link to={item.to} className={cn(navLinkClass(item.to), item.children && "inline-flex items-center gap-1.5")}>
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-20 w-48 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-black text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700",
                            isNavActive(location.pathname, child.to) && "bg-blue-50 text-blue-700",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">{actionButtons}</div>
      </div>
    </header>
  );
}
