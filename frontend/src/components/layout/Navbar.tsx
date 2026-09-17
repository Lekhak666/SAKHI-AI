import { ChevronDown, HeartHandshake, Menu, X } from "lucide-react";
import { useState } from "react";

type SiteLanguage = "en" | "hi" | "bn";

interface NavbarProps {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
  languageLabels: Record<SiteLanguage, string>;
}

function Navbar({ language, onLanguageChange, languageLabels }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const languages: SiteLanguage[] = ["en", "hi", "bn"];

  const handleLanguageChange = (selectedLanguage: SiteLanguage) => {
    onLanguageChange(selectedLanguage);
    setLanguageOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3" aria-label="SAKHI Home">
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
        <nav className="hidden items-center gap-7 md:flex">
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

          {/* Language selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((current) => !current)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
            >
              <span>{languageLabels[language]}</span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50"
                role="menu"
              >
                {languages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleLanguageChange(item)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      language === item
                        ? "bg-rose-50 font-medium text-rose-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    role="menuitem"
                  >
                    <span>{languageLabels[item]}</span>

                    {language === item && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get Support */}
          <a
            href="/assessment"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Get Support
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile language selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((current) => !current)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
            >
              <span>{languageLabels[language]}</span>

              <ChevronDown
                size={13}
                className={`transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50"
                role="menu"
              >
                {languages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleLanguageChange(item)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      language === item
                        ? "bg-rose-50 font-medium text-rose-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                    role="menuitem"
                  >
                    <span>{languageLabels[item]}</span>

                    {language === item && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-lg p-2 text-slate-700"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#how-it-works"
              className="text-sm text-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </a>

            <a
              href="#support"
              className="text-sm text-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              Support
            </a>

            <a
              href="#privacy"
              className="text-sm text-slate-700"
              onClick={() => setMenuOpen(false)}
            >
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
