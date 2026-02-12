import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from 'app/submit-button';

export default function Register() {
  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists';
    }

    await createUser(email, password);
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#07080f] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
          <div className="absolute top-32 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-orange-500/20 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:64px_64px] opacity-20" />
        </div>

        <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
          <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.65)] backdrop-blur sm:p-10">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-[var(--font-heading)] text-lg">
                    V
                  </div>
                  <span className="text-sm font-semibold tracking-[0.35em]">
                    VIBVIB
                  </span>
                </Link>
                <span className="text-[11px] uppercase tracking-[0.4em] text-slate-500">
                  Sign up
                </span>
              </div>

              <h1 className="mt-8 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
                Build your VibVib studio
              </h1>
              <p className="mt-3 text-sm text-slate-300">
                Create an account to generate cinematic 3:4 stories in minutes.
              </p>

              <Form action={register}>
                <SubmitButton>Create account</SubmitButton>
                <p className="text-center text-xs text-slate-400">
                  {'Already have an account? '}
                  <Link
                    href="/login"
                    className="font-semibold text-cyan-200 hover:text-cyan-100"
                  >
                    Sign in
                  </Link>
                </p>
              </Form>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    No credit card
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Start free
                  </p>
                  <p className="text-xs text-slate-400">
                    Try 30 seconds of renders.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Studio presets
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    24 looks
                  </p>
                  <p className="text-xs text-slate-400">
                    Cinematic style packs.
                  </p>
                </div>
              </div>
            </section>

            <aside className="hidden flex-col gap-6 lg:flex">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                  <video
                    className="h-full w-full object-cover"
                    src="/video/video-4.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="VibVib preview video"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  <span>Creator kit</span>
                  <span>3:4</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Scenes
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">12</p>
                  <p className="text-xs text-slate-400">Per render</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Export
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">3:4</p>
                  <p className="text-xs text-slate-400">Social native</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
