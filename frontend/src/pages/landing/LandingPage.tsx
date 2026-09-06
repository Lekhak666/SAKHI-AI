import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfafb] text-slate-900">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-rose-100/60 blur-3xl" />

          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            
            {/* Left */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
                <Sparkles size={15} />
                A safer space to be heard
              </div>

              <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                You don't have to
                <span className="block text-rose-600">
                  face it alone.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                SAKHI is a compassionate support platform designed to
                listen, understand and help identify when someone may need
                additional care.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/assessment"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Talk to SAKHI
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Learn how it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Privacy-conscious
                </div>

                <div className="flex items-center gap-2">
                  <HeartHandshake size={16} className="text-rose-500" />
                  Human-centered
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-2xl shadow-slate-200/60 backdrop-blur">
                
                <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-50 via-white to-violet-50 p-8">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                        <HeartHandshake size={21} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          SAKHI
                        </p>
                        <p className="text-xs text-slate-500">
                          Here to listen
                        </p>
                      </div>
                    </div>

                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>

                  <div className="mt-10 space-y-4">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
                      <p className="text-sm leading-6 text-slate-600">
                        Take your time. You can share only what you're
                        comfortable sharing.
                      </p>
                    </div>

                    <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-slate-900 p-4">
                      <p className="text-sm leading-6 text-white">
                        I've been feeling overwhelmed lately...
                      </p>
                    </div>

                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white p-4 shadow-sm">
                      <p className="text-sm leading-6 text-slate-600">
                        I'm listening. Let's take this one step at a time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3">
                    <div className="h-2 w-2 rounded-full bg-rose-400" />

                    <span className="text-xs text-slate-500">
                      Your conversation is being handled with care.
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Your privacy matters
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Designed with care
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
                How SAKHI helps
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Support that starts with listening.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                SAKHI uses conversations and assessment signals to help
                identify when someone may need additional support.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <FeatureCard
                number="01"
                title="Share"
                description="Tell SAKHI what you're experiencing through text or supported voice interactions."
              />

              <FeatureCard
                number="02"
                title="Understand"
                description="SAKHI analyzes relevant signals to identify potential stress and vulnerability."
              />

              <FeatureCard
                number="03"
                title="Connect"
                description="Receive guidance toward the appropriate support or intervention."
              />
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section id="support" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
              You're not alone
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Sometimes, asking for help is the strongest step you can take.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-300">
              When you're ready, SAKHI is here to listen and help you find
              the next step.
            </p>

            <a
              href="/assessment"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Get Support
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
                    Your privacy matters.
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    SAKHI is designed around confidentiality, informed
                    consent and responsible use of AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 SAKHI. A friend who listens.</p>

          <p>Built with empathy, technology and care.</p>
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
      <span className="text-sm font-semibold text-rose-500">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default LandingPage;