export type KieModel =
  | 'kling/v2-1-master-text-to-video'
  | 'wan/2-2-a14b-text-to-video-turbo'
  | 'sora-2-pro-text-to-video';

type CreateTaskResponse = {
  code: number;
  msg: string;
  data?: { taskId: string };
};

type RecordInfoResponse = {
  code: number;
  msg: string;
  data?: {
    taskId: string;
    model: string;
    state: 'waiting' | 'success' | 'fail';
    param: string;
    resultJson: string;
    failCode: string | null;
    failMsg: string | null;
    costTime: number | null;
    completeTime: number | null;
    createTime: number;
  };
};

export class KieError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const KIE_BASE_URL = 'https://api.kie.ai';
const KIE_API_KEY = process.env.KIE_API_KEY;

function requireApiKey(): string {
  if (!KIE_API_KEY) {
    throw new Error('Missing env: KIE_API_KEY');
  }
  return KIE_API_KEY;
}

export async function kieCreateTask(params: {
  model: KieModel;
  input: Record<string, unknown>;
  callBackUrl?: string;
}): Promise<{ taskId: string }> {
  const apiKey = requireApiKey();

  const res = await fetch(`${KIE_BASE_URL}/api/v1/jobs/createTask`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new KieError(
      res.status,
      `Kie createTask failed: HTTP ${res.status} ${text}`
    );
  }

  const json = (await res.json()) as CreateTaskResponse;

  if (json.code !== 200 || !json.data?.taskId) {
    throw new KieError(
      502,
      `Kie createTask error: code=${json.code} msg=${json.msg}`
    );
  }

  return { taskId: json.data.taskId };
}

export async function kieQueryTask(taskId: string): Promise<{
  state: 'waiting' | 'success' | 'fail';
  resultUrls?: string[];
  failCode?: string | null;
  failMsg?: string | null;
  raw: RecordInfoResponse;
}> {
  const apiKey = requireApiKey();

  const url = new URL(`${KIE_BASE_URL}/api/v1/jobs/recordInfo`);
  url.searchParams.set('taskId', taskId);

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new KieError(
      res.status,
      `Kie recordInfo failed: HTTP ${res.status} ${text}`
    );
  }

  const json = (await res.json()) as RecordInfoResponse;

  if (json.code !== 200 || !json.data) {
    throw new KieError(
      502,
      `Kie recordInfo error: code=${json.code} msg=${json.msg}`
    );
  }

  const { state, resultJson, failCode, failMsg } = json.data;

  if (state === 'success') {
    const parsed = safeJsonParse(resultJson) as { resultUrls?: string[] } | null;
    const resultUrls = parsed?.resultUrls ?? [];
    return { state, resultUrls, raw: json };
  }

  return { state, failCode, failMsg, raw: json };
}

function safeJsonParse(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
