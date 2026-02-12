'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type KieModel =
  | 'kling/v2-1-master-text-to-video'
  | 'wan/2-2-a14b-text-to-video-turbo'
  | 'sora-2-pro-text-to-video';

type GenerationStatus = 'idle' | 'submitting' | 'waiting' | 'success' | 'fail';

const MODEL_OPTIONS: Array<{
  id: KieModel;
  name: string;
  description: string;
  tags: string[];
}> = [
  {
    id: 'kling/v2-1-master-text-to-video',
    name: 'Kling v2.1',
    description: 'Cinematic output with negative prompts and CFG tuning.',
    tags: ['Duration', 'CFG', 'Negative prompt'],
  },
  {
    id: 'wan/2-2-a14b-text-to-video-turbo',
    name: 'Wan 2.2 Turbo',
    description: 'Fast renders with resolution and seed controls.',
    tags: ['Resolution', 'Seed', 'Acceleration'],
  },
  {
    id: 'sora-2-pro-text-to-video',
    name: 'Sora 2 Pro',
    description: 'High-fidelity storytelling with frame and size control.',
    tags: ['Frames', 'Size', 'Watermark'],
  },
];

const PROMPT_LIMITS: Record<KieModel, number> = {
  'kling/v2-1-master-text-to-video': 5000,
  'wan/2-2-a14b-text-to-video-turbo': 5000,
  'sora-2-pro-text-to-video': 10000,
};

export default function VibVibStudio({ email }: { email?: string }) {
  const [model, setModel] = useState<KieModel>(
    'kling/v2-1-master-text-to-video'
  );
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');

  const [klingDuration, setKlingDuration] = useState<'5' | '10'>('5');
  const [klingAspect, setKlingAspect] = useState<'16:9' | '9:16' | '1:1'>(
    '9:16'
  );
  const [klingCfgScale, setKlingCfgScale] = useState(0.5);

  const [wanResolution, setWanResolution] = useState<'480p' | '580p' | '720p'>(
    '720p'
  );
  const [wanAspect, setWanAspect] = useState<'16:9' | '9:16' | '1:1'>('9:16');
  const [wanPromptExpansion, setWanPromptExpansion] = useState(false);
  const [wanSeed, setWanSeed] = useState('');
  const [wanAcceleration, setWanAcceleration] = useState<'none' | 'regular'>(
    'none'
  );

  const [soraAspect, setSoraAspect] = useState<'portrait' | 'landscape'>(
    'portrait'
  );
  const [soraFrames, setSoraFrames] = useState<'10' | '15'>('10');
  const [soraSize, setSoraSize] = useState<'standard' | 'high'>('standard');
  const [soraRemoveWatermark, setSoraRemoveWatermark] = useState(true);

  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [failInfo, setFailInfo] = useState<{
    code?: string | null;
    message?: string | null;
  } | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const promptLimit = PROMPT_LIMITS[model];
  const selectedModel = MODEL_OPTIONS.find((option) => option.id === model);
  const isBusy = status === 'submitting' || status === 'waiting';
  const isPromptValid =
    prompt.trim().length > 0 && prompt.trim().length <= promptLimit;

  const promptPreview = useMemo(() => {
    const cleaned = prompt.trim();
    if (!cleaned) return 'Add a prompt to preview the payload.';
    if (cleaned.length <= 120) return cleaned;
    return `${cleaned.slice(0, 117)}...`;
  }, [prompt]);

  useEffect(() => {
    if (status !== 'waiting' || !taskId) return;

    let cancelled = false;
    const startTime = startTimeRef.current ?? Date.now();
    startTimeRef.current = startTime;

    const poll = async () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      if (elapsed > 10 * 60 * 1000) {
        setStatus('fail');
        setError('Render timed out. Please try again.');
        return;
      }

      try {
        const res = await fetch(`/api/generations/${taskId}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || 'Unable to fetch status.');
        }

        if (data.state === 'success') {
          setStatus('success');
          setResultUrls(data.resultUrls ?? []);
          setFailInfo(null);
          setError(null);
          return;
        }

        if (data.state === 'fail') {
          setStatus('fail');
          setFailInfo({
            code: data.failCode,
            message: data.failMsg,
          });
          setError(null);
          return;
        }

        const delay =
          elapsed < 30_000 ? 2000 : elapsed < 120_000 ? 5000 : 12000;

        timeoutRef.current = setTimeout(poll, delay);
      } catch (err) {
        if (!cancelled) {
          setStatus('fail');
          setError(err instanceof Error ? err.message : 'Unknown error.');
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status, taskId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPromptValid || isBusy) return;

    setStatus('submitting');
    setError(null);
    setFailInfo(null);
    setResultUrls([]);
    setTaskId(null);
    startTimeRef.current = Date.now();

    try {
      const input = buildInput();
      const res = await fetch('/api/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, input }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to create task.');
      }
      setTaskId(data.taskId);
      setStatus('waiting');
    } catch (err) {
      setStatus('fail');
      setError(err instanceof Error ? err.message : 'Unknown error.');
    }
  };

  const handleManualCheck = () => {
    if (!taskId) return;
    setStatus('waiting');
  };

  const handleReset = () => {
    setStatus('idle');
    setTaskId(null);
    setResultUrls([]);
    setError(null);
    setFailInfo(null);
    startTimeRef.current = null;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const summaryItems = useMemo(() => {
    const items = [
      { label: 'Model', value: selectedModel?.name ?? model },
      { label: 'Prompt', value: promptPreview },
    ];

    if (model === 'kling/v2-1-master-text-to-video') {
      items.push(
        { label: 'Duration', value: `${klingDuration}s` },
        { label: 'Aspect', value: klingAspect },
        { label: 'CFG', value: klingCfgScale.toFixed(1) }
      );
      if (negativePrompt.trim()) {
        items.push({ label: 'Negative', value: 'Enabled' });
      }
    }

    if (model === 'wan/2-2-a14b-text-to-video-turbo') {
      items.push(
        { label: 'Resolution', value: wanResolution },
        { label: 'Aspect', value: wanAspect },
        { label: 'Acceleration', value: wanAcceleration }
      );
      if (wanSeed.trim()) {
        items.push({ label: 'Seed', value: wanSeed.trim() });
      }
      if (wanPromptExpansion) {
        items.push({ label: 'Expansion', value: 'On' });
      }
    }

    if (model === 'sora-2-pro-text-to-video') {
      items.push(
        { label: 'Aspect', value: soraAspect },
        { label: 'Frames', value: soraFrames },
        { label: 'Size', value: soraSize },
        { label: 'Watermark', value: soraRemoveWatermark ? 'Removed' : 'Keep' }
      );
    }

    return items;
  }, [
    model,
    selectedModel,
    promptPreview,
    klingDuration,
    klingAspect,
    klingCfgScale,
    negativePrompt,
    wanResolution,
    wanAspect,
    wanAcceleration,
    wanSeed,
    wanPromptExpansion,
    soraAspect,
    soraFrames,
    soraSize,
    soraRemoveWatermark,
  ]);

  const statusLabel = useMemo(() => {
    if (status === 'idle') return 'Idle';
    if (status === 'submitting') return 'Submitting';
    if (status === 'waiting') return 'Rendering';
    if (status === 'success') return 'Complete';
    return 'Failed';
  }, [status]);

  const statusTone = useMemo(() => {
    if (status === 'success') return 'bg-emerald-400/20 text-emerald-200';
    if (status === 'waiting' || status === 'submitting') {
      return 'bg-cyan-400/20 text-cyan-200';
    }
    if (status === 'fail') return 'bg-rose-400/20 text-rose-200';
    return 'bg-white/10 text-slate-300';
  }, [status]);

  function buildInput() {
    const base = { prompt: prompt.trim() };

    if (model === 'kling/v2-1-master-text-to-video') {
      return {
        ...base,
        duration: klingDuration,
        aspect_ratio: klingAspect,
        negative_prompt: negativePrompt.trim() || undefined,
        cfg_scale: klingCfgScale,
      };
    }

    if (model === 'wan/2-2-a14b-text-to-video-turbo') {
      return {
        ...base,
        resolution: wanResolution,
        aspect_ratio: wanAspect,
        enable_prompt_expansion: wanPromptExpansion,
        seed: wanSeed.trim() ? Number(wanSeed) : undefined,
        acceleration: wanAcceleration,
      };
    }

    return {
      ...base,
      aspect_ratio: soraAspect,
      n_frames: soraFrames,
      size: soraSize,
      remove_watermark: soraRemoveWatermark,
    };
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.65)] backdrop-blur sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Text to video
            </p>
            <h1 className="mt-2 text-3xl font-[var(--font-heading)] text-white sm:text-4xl">
              Generate with Kie.ai models.
            </h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
            {email || 'VibVib Studio'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Model selection
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {MODEL_OPTIONS.map((option) => {
                const isSelected = model === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setModel(option.id)}
                    className={`group flex h-full flex-col gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-cyan-300/60 bg-cyan-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">
                      {option.name}
                    </div>
                    <p className="text-xs text-slate-400">
                      {option.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      {option.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="prompt"
              className="text-xs uppercase tracking-[0.4em] text-slate-500"
            >
              Prompt
            </label>
            <textarea
              id="prompt"
              rows={5}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the scene, lighting, camera movement, and mood."
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                {prompt.trim().length}/{promptLimit} characters
              </span>
              <span>Tip: Use camera cues and lighting notes.</span>
            </div>
          </div>

          {model === 'kling/v2-1-master-text-to-video' && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Duration
                  </label>
                  <select
                    value={klingDuration}
                    onChange={(event) =>
                      setKlingDuration(event.target.value as '5' | '10')
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Aspect ratio
                  </label>
                  <select
                    value={klingAspect}
                    onChange={(event) =>
                      setKlingAspect(
                        event.target.value as '16:9' | '9:16' | '1:1'
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="9:16">9:16 Vertical</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="1:1">1:1 Square</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Negative prompt (optional)
                </label>
                <input
                  value={negativePrompt}
                  onChange={(event) => setNegativePrompt(event.target.value)}
                  placeholder="blur, distort, low quality"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  CFG scale
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={klingCfgScale}
                    onChange={(event) =>
                      setKlingCfgScale(Number(event.target.value))
                    }
                    className="w-full accent-cyan-300"
                  />
                  <span className="text-sm text-slate-300">
                    {klingCfgScale.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {model === 'wan/2-2-a14b-text-to-video-turbo' && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Resolution
                  </label>
                  <select
                    value={wanResolution}
                    onChange={(event) =>
                      setWanResolution(
                        event.target.value as '480p' | '580p' | '720p'
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="480p">480p</option>
                    <option value="580p">580p</option>
                    <option value="720p">720p</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Aspect ratio
                  </label>
                  <select
                    value={wanAspect}
                    onChange={(event) =>
                      setWanAspect(
                        event.target.value as '16:9' | '9:16' | '1:1'
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="9:16">9:16 Vertical</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="1:1">1:1 Square</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Seed (optional)
                  </label>
                  <input
                    type="number"
                    value={wanSeed}
                    onChange={(event) => setWanSeed(event.target.value)}
                    placeholder="Random"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Acceleration
                  </label>
                  <select
                    value={wanAcceleration}
                    onChange={(event) =>
                      setWanAcceleration(
                        event.target.value as 'none' | 'regular'
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="none">None</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Prompt expansion
                  </div>
                  <div className="text-xs text-slate-400">
                    Let the model enrich your prompt.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={wanPromptExpansion}
                  onChange={(event) => setWanPromptExpansion(event.target.checked)}
                  className="h-5 w-5 accent-cyan-300"
                />
              </label>
            </div>
          )}

          {model === 'sora-2-pro-text-to-video' && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Aspect ratio
                  </label>
                  <select
                    value={soraAspect}
                    onChange={(event) =>
                      setSoraAspect(
                        event.target.value as 'portrait' | 'landscape'
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Frames
                  </label>
                  <select
                    value={soraFrames}
                    onChange={(event) =>
                      setSoraFrames(event.target.value as '10' | '15')
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Size
                  </label>
                  <select
                    value={soraSize}
                    onChange={(event) =>
                      setSoraSize(event.target.value as 'standard' | 'high')
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Remove watermark
                    </div>
                    <div className="text-xs text-slate-400">
                      Keep outputs clean by default.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soraRemoveWatermark}
                    onChange={(event) =>
                      setSoraRemoveWatermark(event.target.checked)
                    }
                    className="h-5 w-5 accent-cyan-300"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!isPromptValid || isBusy}
              className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:from-orange-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting'
                ? 'Submitting...'
                : status === 'waiting'
                  ? 'Rendering...'
                  : 'Generate video'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/40"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                Render status
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Output monitor
              </h3>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] ${statusTone}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            Task ID: {taskId || 'Not started yet.'}
          </div>

          {status === 'waiting' && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Rendering in progress. We will refresh automatically.
            </div>
          )}

          {status === 'success' && resultUrls.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {resultUrls.map((url) => (
                <div
                  key={url}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                    <video
                      className="h-full w-full object-cover"
                      src={url}
                      controls
                      playsInline
                    />
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-xs font-semibold text-cyan-200 hover:text-cyan-100"
                  >
                    Open video
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 text-center text-sm text-slate-400">
              <div className="text-base text-white">
                {status === 'success'
                  ? 'No result URLs returned.'
                  : 'Waiting for your first render.'}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Generated videos will appear here once the task is complete.
              </p>
            </div>
          )}

          {(error || failInfo?.message || failInfo?.code) && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
            >
              <div className="font-semibold">Render failed</div>
              <div className="mt-1 text-xs text-rose-100/80">
                {error || failInfo?.message || 'Unknown error.'}
              </div>
              {failInfo?.code && (
                <div className="mt-1 text-xs text-rose-100/70">
                  Code: {failInfo.code}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleManualCheck}
              disabled={!taskId || status === 'submitting'}
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Check status
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition-colors hover:border-white/30 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Payload preview
          </p>
          <div className="mt-4 grid gap-3">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-1 text-sm text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
