import { NextRequest, NextResponse } from 'next/server';
import { getWellnessGuidance } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { archetype, meditationMinutes, streak, message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await getWellnessGuidance(
      archetype || null,
      meditationMinutes || 0,
      streak || 0,
      message
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI wellness error:', error);
    return NextResponse.json(
      { error: 'Failed to get wellness guidance. Please try again.' },
      { status: 500 }
    );
  }
}
