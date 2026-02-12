import Link from 'next/link';
import { auth } from 'app/auth';

const showcaseVideos = [
  { src: '/video/video-1.mp4', title: 'Neon District' },
  { src: '/video/video-2.mp4', title: 'Chrome Botanica' },
  { src: '/video/video-3.mp4', title: 'Solar Drift' },
  { src: '/video/video-4.mp4', title: 'Liquid Light' },
  { src: '/video/video-5.mp4', title: 'Analog Dream' },
  { src: '/video/video-6.mp4', title: 'Glass Orbit' },
];

const stats = [
  { value: '2.4M', label: 'Clips generated' },
  { value: '4.2s', label: 'Avg render time' },
  { value: '3:4', label: 'Native aspect' },
];

const features = [
  {
    title: 'Prompt to Storyboard',
    description:
      'Turn a single prompt into a paced sequence of shots, transitions, and beats.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 5l2-2h6l2 2" />
        <path d="M8 11h8" />
      </svg>
    ),
  },
  {
    title: 'Director Controls',
    description:
      'Dial in camera motion, lenses, lighting temperature, and pacing per scene.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <circle cx="12" cy="13" r="3" />
        <path d="M7 7l2-3h6l2 3" />
      </svg>
    ),
  },
  {
    title: 'Style Packs',
    description:
      'Choose cinematic, editorial, product, and anime looks with consistent tone.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" />
      </svg>
    ),
  },
  {
    title: 'Beat-Synced Cuts',
    description:
      'Audio-aware timing and smart transitions keep the rhythm locked in.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 12h4l2-6 4 12 2-6h4" />
      </svg>
    ),
  },
  {
    title: 'Brand Guardrails',
    description:
      'Lock colors, logos, and typography across every render for consistency.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 10l8-6 8 6-8 6-8-6z" />
        <path d="M4 10v6l8 4 8-4v-6" />
      </svg>
    ),
  },
  {
    title: 'Batch Rendering',
    description:
      'Generate multiple variations in parallel and pick the strongest cut.',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: 'Write the brief',
    description:
      'Describe characters, setting, and motion in natural language prompts.',
  },
  {
    title: 'Direct the scene',
    description: 'Pick a style pack, camera move, and tempo to match the story.',
  },
  {
    title: 'Export everywhere',
    description: 'Deliver 3:4, 9:16, and 1:1 cuts with one click.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Free forever',
    description: 'For experiments and concepting.',
    features: [
      '30 seconds of video / month',
      '720p exports',
      'Community presets',
      'Public gallery',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$29',
    period: 'Per creator / month',
    description: 'For creators shipping weekly videos.',
    features: [
      '10 minutes of video / month',
      '4K exports',
      'Director controls',
      'Brand kits',
      'Priority rendering',
    ],
    cta: 'Go Studio',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'For teams',
    description: 'Secure, scalable pipelines.',
    features: [
      'Unlimited render minutes',
      'Dedicated GPU capacity',
      'SSO + audit logs',
      'SLA support',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

export default async function Page() {
  const session = await auth();
  const heroPrimaryHref = session ? '/protected' : '/login';
  const heroSecondaryHref = session ? '#showcase' : '/login';


  return (
    <div className="min-h-screen bg-[#07080f] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
          <div className="absolute top-32 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-orange-500/20 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:64px_64px] opacity-20" />
        </div>

        <nav className="fixed left-0 right-0 top-6 z-40">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-[var(--font-heading)] text-lg">
                  V
                </div>
                <span className="text-sm font-semibold tracking-[0.35em]">VIBVIB</span>
              </div>
              <div className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
                <a className="transition-colors hover:text-white" href="#features">
                  Features
                </a>
                <a className="transition-colors hover:text-white" href="#studio">
                  Studio
                </a>
                <a className="transition-colors hover:text-white" href="#showcase">
                  Showcase
                </a>
                <a className="transition-colors hover:text-white" href="#pricing">
                  Pricing
                </a>
              </div>
              <Link
                href="/register"
                className="hidden rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:from-orange-300 hover:to-orange-400 md:inline-flex"
              >
                Start free
              </Link>
            </div>
          </div>
        </nav>

        <main className="relative z-10 pt-28">
          <section className="px-6 pb-24 pt-12">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-200 opacity-0 motion-safe:animate-[fade-in_0.8s_ease_forwards]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] motion-safe:animate-pulse" />
                  AI Video Studio
                </div>
                <h1 className="text-4xl font-[var(--font-heading)] leading-tight text-white opacity-0 motion-safe:animate-[fade-up_0.9s_ease_forwards] sm:text-5xl lg:text-6xl">
                  VibVib turns prompts into
                  <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-white bg-clip-text text-transparent">
                    cinematic vertical stories.
                  </span>
                </h1>
                <p className="max-w-xl text-base text-slate-300 opacity-0 motion-safe:animate-[fade-up_0.9s_ease_forwards] motion-safe:[animation-delay:120ms] sm:text-lg">
                  Generate 3:4 social-first videos in seconds with director
                  controls, smart pacing, and brand-safe styles.
                </p>
                <div className="flex flex-wrap items-center gap-4 opacity-0 motion-safe:animate-[fade-up_0.9s_ease_forwards] motion-safe:[animation-delay:200ms]">
                  <Link
                    href={heroPrimaryHref}
                    className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:from-orange-300 hover:to-orange-400"
                  >
                    Start free
                  </Link>
                  <Link
                    href={heroSecondaryHref}
                    className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/40"
                  >
                    Watch demo
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="text-xl font-semibold text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Creator teams
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Brand studios
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Agencies
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="relative aspect-[3/4] rounded-[32px] border border-white/15 bg-white/5 p-2 shadow-[0_30px_120px_rgba(15,23,42,0.65)]">
                  <div className="h-full w-full overflow-hidden rounded-[26px]">
                    <video
                      className="h-full w-full object-cover"
                      src="/video/video-1.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="VibVib hero video"
                    />
                  </div>
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                    Live Render
                  </div>
                  <div className="absolute -right-6 bottom-14 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur motion-safe:animate-[float_6s_ease-in-out_infinite]">
                    <div className="text-sm font-semibold">Shot Pack</div>
                    <div className="text-xs text-slate-400">Cinematic Drift</div>
                  </div>
                </div>
                <div className="absolute -left-8 bottom-10 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur motion-safe:animate-[float_7s_ease-in-out_infinite]">
                  <div className="text-sm font-semibold">3:4 Native</div>
                  <div className="text-xs text-slate-400">Social-first</div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Capabilities
                </p>
                <h2 className="mt-4 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                  A studio-grade toolkit for vertical storytelling.
                </h2>
                <p className="mt-4 text-base text-slate-300">
                  Build brand-consistent video loops, launch teasers, and product
                  reveals with cinematic polish.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="studio" className="px-6 py-24">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Studio Workflow
                </p>
                <h2 className="text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                  Direct every frame without leaving the browser.
                </h2>
                <p className="text-base text-slate-300">
                  VibVib combines generative models with a director timeline so
                  you can control camera, mood, and pacing without editing
                  software.
                </p>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-cyan-200">
                        0{index + 1}
                      </div>
                      <div>
                        <div className="text-base font-semibold text-white">
                          {step.title}
                        </div>
                        <p className="mt-1 text-sm text-slate-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Scene Builder
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Auto-generate shots, transitions, and story beats from a
                    single brief.
                  </p>
                  <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-black/30" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Camera Lab
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Set lens, depth, and motion curves to match your brand mood.
                  </p>
                  <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-black/30" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Lighting Pass
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Blend neon, daylight, or noir lighting with one slider.
                  </p>
                  <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-black/30" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Export Console
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Ship multiple sizes with platform-ready safe zones.
                  </p>
                  <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-black/30" />
                </div>
              </div>
            </div>
          </section>

          <section id="showcase" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Showcase
                  </p>
                  <h2 className="mt-3 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                    Recent clips generated in VibVib.
                  </h2>
                </div>
                <a
                  href="#pricing"
                  className="text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100"
                >
                  See plans {'->'} 
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                {showcaseVideos.map((video) => (
                  <div
                    key={video.title}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <video
                      className="h-full w-full object-cover"
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`Showcase video ${video.title}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                      {video.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Pricing
                </p>
                <h2 className="mt-4 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                  Plans for solo creators to studio teams.
                </h2>
                <p className="mt-4 text-base text-slate-300">
                  Scale from quick concepts to full campaign pipelines with
                  predictable monthly pricing.
                </p>
              </div>
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex h-full flex-col rounded-3xl border p-6 ${
                      plan.highlight
                        ? 'border-cyan-300 bg-gradient-to-br from-cyan-500/20 via-white/5 to-transparent'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {plan.name}
                        </h3>
                        {plan.highlight && (
                          <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-100">
                            Most popular
                          </span>
                        )}
                      </div>
                      <div className="mt-4 text-3xl font-semibold text-white">
                        {plan.price}
                      </div>
                      <div className="text-sm text-slate-400">
                        {plan.period}
                      </div>
                      <p className="mt-3 text-sm text-slate-300">
                        {plan.description}
                      </p>
                    </div>
                    <div className="mt-6 space-y-3 text-sm text-slate-300">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={`mt-8 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                        plan.highlight
                          ? 'bg-cyan-300 text-slate-900 hover:bg-cyan-200'
                          : 'border border-white/15 text-white/90 hover:border-white/40'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 pb-24">
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-10 text-center sm:p-12">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Ready to ship
              </p>
              <h2 className="mt-4 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                Launch your next campaign with VibVib.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
                Go from brief to cinematic vertical cut in minutes. No cameras,
                no editing suites, just your story and VibVib.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:from-orange-300 hover:to-orange-400"
                >
                  Start free
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/40"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/10 px-6 py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-[var(--font-heading)] text-lg">
                  V
                </div>
                <span className="text-sm font-semibold tracking-[0.35em]">
                  VIBVIB
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Cinematic AI video generation for modern creators.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <a className="hover:text-white" href="#features">
                Features
              </a>
              <a className="hover:text-white" href="#studio">
                Studio
              </a>
              <a className="hover:text-white" href="#showcase">
                Showcase
              </a>
              <a className="hover:text-white" href="#pricing">
                Pricing
              </a>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
            (c) 2026 VibVib. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
