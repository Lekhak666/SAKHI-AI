import { useEffect, useState } from "react";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import {
  landingTranslations,
  LANGUAGE_LABELS,
  type SiteLanguage,
} from "../../locales/landingTranslations";

function LandingPage() {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    const savedLanguage = localStorage.getItem("sakhi-site-language");

    if (
      savedLanguage === "en" ||
      savedLanguage === "hi" ||
      savedLanguage === "bn"
    ) {
      return savedLanguage;
    }

    return "en";
  });

  useEffect(() => {
    localStorage.setItem("sakhi-site-language", language);
  }, [language]);

  const t = landingTranslations[language];

  return (
    <div className="min-h-screen bg-[#fcfafb] text-slate-900">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        languageLabels={LANGUAGE_LABELS}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-rose-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            {/* Hero content */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
                <Sparkles size={15} />
                {t.hero.badge}
              </div>

              <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                {t.hero.titleLine1}
                <span className="block text-rose-600">{t.hero.titleLine2}</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                {t.hero.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/assessment"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {t.hero.talkToSakhi}
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {t.hero.learnHow}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  {t.hero.privacyConscious}
                </div>

                <div className="flex items-center gap-2">
                  <HeartHandshake size={16} className="text-rose-500" />
                  {t.hero.humanCentered}
                </div>
              </div>
            </div>

            {/* Hero conversation preview */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-2xl shadow-slate-200/60 backdrop-blur">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-50 via-white to-violet-50 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                        <HeartHandshake size={21} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">SAKHI</p>

                        <p className="text-xs text-slate-500">
                          {t.hero.cardTagline}
                        </p>
                      </div>
                    </div>

                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>

                  <div className="mt-10 space-y-4">
                    {/* SAKHI message */}
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
                      <p className="text-sm leading-6 text-slate-600">
                        {t.hero.message1}
                      </p>
                    </div>

                    {/* User message */}
                    <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-slate-900 p-4">
                      <p className="text-sm leading-6 text-white">
                        {t.hero.message2}
                      </p>
                    </div>

                    {/* SAKHI response */}
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
                      <p className="text-sm leading-6 text-slate-600">
                        {t.hero.message3}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3">
                    <div className="h-2 w-2 rounded-full bg-rose-400" />

                    <span className="text-xs text-slate-500">
                      {t.hero.careMessage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy badge */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {t.hero.privacyTitle}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {t.hero.privacySubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                {t.howItWorks.eyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {t.howItWorks.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {t.howItWorks.description}
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <FeatureCard
                number="01"
                title={t.howItWorks.cards.share.title}
                description={t.howItWorks.cards.share.description}
              />

              <FeatureCard
                number="02"
                title={t.howItWorks.cards.understand.title}
                description={t.howItWorks.cards.understand.description}
              />

              <FeatureCard
                number="03"
                title={t.howItWorks.cards.connect.title}
                description={t.howItWorks.cards.connect.description}
              />
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
              {t.support.eyebrow}
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {t.support.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-300">
              {t.support.description}
            </p>

            <a
              href="/assessment"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {t.support.button}
              <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="bg-[#fcfafb]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {t.privacy.title}
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {t.privacy.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>{t.footer.copyright}</p>

          <p>{t.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50">
      <span className="text-sm font-semibold text-rose-500">{number}</span>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default LandingPage;
