export function Form({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] uppercase tracking-[0.3em] text-slate-400"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="user@vibvib.ai"
          autoComplete="email"
          required
          className="mt-2 block w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-[11px] uppercase tracking-[0.3em] text-slate-400"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 block w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
        />
      </div>
      {children}
    </form>
  );
}
