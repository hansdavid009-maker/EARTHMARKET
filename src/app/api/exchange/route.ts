import { NextResponse } from 'next/server';
import { INITIAL_EXCHANGES, INITIAL_EXCHANGE_RATE, DEFAULT_EXCHANGE_FEE_IDR } from '@/lib/data';
import { ExchangeTransaction } from '@/types';

let localExchanges: ExchangeTransaction[] = [...INITIAL_EXCHANGES];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: localExchanges,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fromCurrency, toCurrency, fromAmount, accountName, accountNumber } = body;

    const rate = INITIAL_EXCHANGE_RATE;
    const fee = DEFAULT_EXCHANGE_FEE_IDR;

    let toAmount = 0;
    if (fromCurrency === 'IDR') {
      const netIdr = Math.max(0, fromAmount - fee);
      toAmount = Math.floor(netIdr / rate);
    } else {
      toAmount = Math.round(fromAmount * rate) + fee;
    }

    const newTx: ExchangeTransaction = {
      id: `exc-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      rate,
      fee,
      status: 'Completed',
      accountName,
      accountNumber,
    };

    localExchanges = [newTx, ...localExchanges];

    return NextResponse.json({
      success: true,
      message: 'Exchange transaction submitted successfully',
      data: newTx,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process exchange' }, { status: 400 });
  }
}
