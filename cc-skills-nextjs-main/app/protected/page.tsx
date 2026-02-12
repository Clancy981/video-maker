import Link from 'next/link';
import { auth, signOut } from 'app/auth';

import VibVibStudio from './vibvib-studio';

export default async function ProtectedPage() {
  const session = await auth();
  const email = session?.user?.email ?? 'Creator';

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

        <div className="relative z-10">
          <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-[var(--font-heading)] text-lg">
                V
              </div>
              <span className="text-sm font-semibold tracking-[0.35em]">
                VIBVIB
              </span>
            </Link>

            <div className="flex flex-1 flex-wrap items-center justify-center gap-3 text-sm text-slate-300 sm:justify-end">
              <span className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Studio
              </span>
              <span className="hidden sm:inline">Signed in as {email}</span>
              <SignOut />
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 pb-16">
            <VibVibStudio email={email} />
          </main>
        </div>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/40"
      >
        Sign out
      </button>
    </form>
  );
}
