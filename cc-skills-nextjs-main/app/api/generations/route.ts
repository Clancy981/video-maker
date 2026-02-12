import { NextResponse } from 'next/server';

import { auth } from 'app/auth';
import { kieCreateTask, type KieModel, KieError } from '@/lib/kie';

export const dynamic = 'force-dynamic';

const ALLOWED_MODELS: KieModel[] = [
  'kling/v2-1-master-text-to-video',
  'wan/2-2-a14b-text-to-video-turbo',
  'sora-2-pro-text-to-video',
];

class ValidationError extends Error {}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    const model = body?.model as KieModel;
    if (!ALLOWED_MODELS.includes(model)) {
      throw new ValidationError('Unsupported model.');
    }

    const input = buildInput(model, body?.input ?? {});
    const { taskId } = await kieCreateTask({ model, input });

    return NextResponse.json({ taskId });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof KieError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Unknown error.' }, { status: 500 });
  }
}

function buildInput(model: KieModel, raw: Record<string, unknown>) {
  const promptMax = model === 'sora-2-pro-text-to-video' ? 10000 : 5000;
  const prompt = getString(raw.prompt, 'prompt', promptMax);

  if (model === 'kling/v2-1-master-text-to-video') {
    const duration = getChoice(raw.duration, ['5', '10'], 'duration', '5');
    const aspect = getChoice(
      raw.aspect_ratio,
      ['16:9', '9:16', '1:1'],
      'aspect_ratio'
    );
    const negativePrompt = getOptionalString(
      raw.negative_prompt,
      'negative_prompt',
      500
    );
    const cfgScale = getOptionalNumber(raw.cfg_scale, 'cfg_scale', 0, 1);

    return {
      prompt,
      duration,
      ...(aspect ? { aspect_ratio: aspect } : {}),
      ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      ...(cfgScale !== undefined ? { cfg_scale: cfgScale } : {}),
    };
  }

  if (model === 'wan/2-2-a14b-text-to-video-turbo') {
    const resolution = getChoice(
      raw.resolution,
      ['480p', '580p', '720p'],
      'resolution',
      '720p'
    );
    const aspect = getChoice(
      raw.aspect_ratio,
      ['16:9', '9:16', '1:1'],
      'aspect_ratio'
    );
    const enablePromptExpansion = getOptionalBoolean(
      raw.enable_prompt_expansion,
      false
    );
    const seed = getOptionalInteger(raw.seed, 'seed', 0, 2147483647);
    const acceleration = getChoice(
      raw.acceleration,
      ['none', 'regular'],
      'acceleration',
      'none'
    );

    return {
      prompt,
      resolution,
      ...(aspect ? { aspect_ratio: aspect } : {}),
      ...(enablePromptExpansion !== undefined
        ? { enable_prompt_expansion: enablePromptExpansion }
        : {}),
      ...(seed !== undefined ? { seed } : {}),
      acceleration,
    };
  }

  const aspect = getChoice(
    raw.aspect_ratio,
    ['portrait', 'landscape'],
    'aspect_ratio'
  );
  const frames = getChoice(raw.n_frames, ['10', '15'], 'n_frames', '10');
  const size = getChoice(raw.size, ['standard', 'high'], 'size', 'standard');
  const removeWatermark = getOptionalBoolean(raw.remove_watermark, true);

  return {
    prompt,
    ...(aspect ? { aspect_ratio: aspect } : {}),
    n_frames: frames,
    size,
    remove_watermark: removeWatermark ?? true,
  };
}

function getString(
  value: unknown,
  name: string,
  maxLength: number
): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ValidationError(`${name} is required.`);
  }
  if (value.length > maxLength) {
    throw new ValidationError(`${name} exceeds ${maxLength} characters.`);
  }
  return value.trim();
}

function getOptionalString(
  value: unknown,
  name: string,
  maxLength: number
): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (typeof value !== 'string') {
    throw new ValidationError(`${name} must be a string.`);
  }
  if (value.length > maxLength) {
    throw new ValidationError(`${name} exceeds ${maxLength} characters.`);
  }
  return value.trim();
}

function getChoice(
  value: unknown,
  allowed: string[],
  name: string,
  fallback?: string
): string | undefined {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  if (!allowed.includes(String(value))) {
    throw new ValidationError(`${name} must be one of: ${allowed.join(', ')}`);
  }
  return String(value);
}

function getOptionalNumber(
  value: unknown,
  name: string,
  min: number,
  max: number
): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new ValidationError(`${name} must be a number.`);
  }
  if (num < min || num > max) {
    throw new ValidationError(`${name} must be between ${min} and ${max}.`);
  }
  return Math.round(num * 10) / 10;
}

function getOptionalInteger(
  value: unknown,
  name: string,
  min: number,
  max: number
): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  const num = Number(value);
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    throw new ValidationError(`${name} must be an integer.`);
  }
  if (num < min || num > max) {
    throw new ValidationError(`${name} must be between ${min} and ${max}.`);
  }
  return num;
}

function getOptionalBoolean(
  value: unknown,
  fallback?: boolean
): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return Boolean(value);
}
