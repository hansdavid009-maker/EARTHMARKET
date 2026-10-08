import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    { id: 'Travel', name: 'Travel & Adaptor', icon: '✈️' },
    { id: 'Gadget', name: 'eSIM & AI Translator', icon: '📱' },
    { id: 'Fashion', name: 'Sutra & Busana', icon: '🧣' },
    { id: 'Souvenir', name: 'Teh Oolong & Kaligrafi', icon: '🍵' },
  ];

  return NextResponse.json({
    success: true,
    data: categories,
  });
}
