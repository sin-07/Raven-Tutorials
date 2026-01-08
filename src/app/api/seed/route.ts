import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase, clearDatabase, getDatabaseStats } from '@/lib/seedData';

export async function GET(request: NextRequest) {
  try {
    const stats = await getDatabaseStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to get database stats', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'seed') {
      const result = await seedDatabase();
      return NextResponse.json(result);
    } else if (action === 'clear') {
      const result = await clearDatabase();
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid action. Use "seed" or "clear"' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process request', error },
      { status: 500 }
    );
  }
}
