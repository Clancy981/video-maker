import { NextResponse } from 'next/server';

import { auth } from 'app/auth';
import { kieQueryTask, KieError } from '@/lib/kie';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { taskId: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const taskId = params?.taskId;
  if (!taskId) {
    return NextResponse.json({ error: 'Missing taskId.' }, { status: 400 });
  }

  try {
    const result = await kieQueryTask(taskId);
    return NextResponse.json({
      taskId,
      state: result.state,
      resultUrls: result.resultUrls ?? [],
      failCode: result.failCode ?? null,
      failMsg: result.failMsg ?? null,
    });
  } catch (error) {
    if (error instanceof KieError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error.' }, { status: 500 });
  }
}
