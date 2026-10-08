import { NextResponse } from 'next/server';
import { INITIAL_DICTIONARY } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  let results = [...INITIAL_DICTIONARY];

  if (category && category !== 'All') {
    results = results.filter((w) => w.category.toLowerCase() === category.toLowerCase());
  }

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (w) =>
        w.hanzi.includes(query) ||
        w.pinyin.toLowerCase().includes(query) ||
        w.meaningId.toLowerCase().includes(query) ||
        w.exampleZh.includes(query) ||
        w.exampleId.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}
