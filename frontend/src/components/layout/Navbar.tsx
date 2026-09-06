import { HeartHandshake, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="SAKHI Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <HeartHandshake size={21} strokeWidth={2} />
          </div>

          <div>
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              SAKHI
            </span>

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
              A friend who listens
            </p>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            How it works
          </a>

          <a
            href="#support"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Support
          </a>

          <a
            href="#privacy"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Privacy
          </a>

          <a
            href="/assessment"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Get Support
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" className="text-sm text-slate-700">
              How it works
            </a>

            <a href="#support" className="text-sm text-slate-700">
              Support
            </a>

            <a href="#privacy" className="text-sm text-slate-700">
              Privacy
            </a>

            <a
              href="/assessment"
              className="mt-2 rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white"
            >
              Get Support
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;