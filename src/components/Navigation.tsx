"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Inicio",
    labelEn: "Home",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    href: "/ingles",
    label: "Ingles",
    labelEn: "English",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    href: "/biblioteca",
    label: "Biblioteca",
    labelEn: "Library",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: "/novelas",
    label: "Novelas",
    labelEn: "Light novels",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h12.75a2.25 2.25 0 0 1 2.25 2.25v13.5a.75.75 0 0 1-1.065.681L12 17.25l-5.685 3.682A.75.75 0 0 1 5.25 20.25V6.75A2.25 2.25 0 0 1 7.5 4.5h-3.75ZM15 8.25h.008v.008H15V8.25Zm0 2.25h.008v.008H15V10.5Zm0 2.25h.008v.008H15v-.008Z" />
      </svg>
    ),
  },
  {
    href: "/vocabulario",
    label: "Vocabulario",
    labelEn: "Vocabulary",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
      </svg>
    ),
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-72 glass flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="block group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-background font-bold text-lg shadow-lg shadow-accent/20">
              AL
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                AI Lang
              </h1>
              <p className="text-xs text-muted">
                Language Learning
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-6 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "bg-accent/10 text-accent glow-border"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className={isActive ? "text-accent" : ""}>{item.icon}</span>
              <div>
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ml-2 ${isActive ? "text-accent/50" : "text-muted/50"}`}>
                  {item.labelEn}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 mx-3 mb-3 rounded-xl bg-white/[0.02] border border-white/5">
        <p className="text-xs text-muted">
          AI-Powered Language Learning
        </p>
        <p className="text-xs text-muted/50 mt-1">
          Flashcards · Bilingual Reader · AI Coach
        </p>
      </div>
    </nav>
  );
}
