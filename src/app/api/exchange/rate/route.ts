import { NextResponse } from 'next/server';
import { INITIAL_EXCHANGE_RATE, DEFAULT_EXCHANGE_FEE_IDR } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    rate: INITIAL_EXCHANGE_RATE,
    currencyFrom: 'CNY',
    currencyTo: 'IDR',
    feeIdr: DEFAULT_EXCHANGE_FEE_IDR,
    updatedAt: new Date().toISOString(),
  });
}
