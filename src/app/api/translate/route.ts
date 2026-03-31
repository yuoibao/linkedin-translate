import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, mode, style } = body;

    // Get API key from environment
    const apiKey = process.env.KIMI_API_KEY;

    const result = await translate({
      text,
      mode,
      style,
      apiKey,
    });

    if (result.success) {
      return NextResponse.json({ success: true, result: result.result });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'API_ERROR', message: '服务繁忙，请稍后重试' },
      },
      { status: 500 }
    );
  }
}
