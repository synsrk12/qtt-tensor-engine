import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import type { OperationEntry } from '@/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'operations.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as OperationEntry[];
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to load operations' },
      { status: 500 }
    );
  }
}
