import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';
import { Order } from '@/types';

let localOrders: Order[] = [...INITIAL_ORDERS];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: localOrders.length,
    data: localOrders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date();
    const formattedDate = timestamp.toISOString().slice(0, 10) + ' ' + timestamp.toTimeString().slice(0, 5);
    const invoiceNum = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: invoiceNum,
      createdAt: formattedDate,
      status: 'Completed',
      ...body,
    };

    localOrders = [newOrder, ...localOrders];

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 400 });
  }
}
