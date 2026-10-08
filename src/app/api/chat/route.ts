import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS, INITIAL_DICTIONARY, INITIAL_EXCHANGE_RATE, DEFAULT_EXCHANGE_FEE_IDR } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const q = (message || '').toLowerCase();

    // 1. Currency calculation
    if (q.includes('kurs') || q.includes('rate') || q.includes('yuan') || q.includes('cny') || q.includes('rupiah') || q.includes('idr')) {
      const matchIdr = q.match(/(\d+[\d.,]*)\s*(juta|jt|ribu|rb|k|rupiah|idr)/i);
      const matchCny = q.match(/¥\s*(\d+[\d.,]*)/i) || q.match(/(\d+[\d.,]*)\s*(yuan|cny|rmb)/i);

      if (matchCny) {
        const val = parseFloat(matchCny[1].replace(/,/g, ''));
        const idrVal = Math.round(val * INITIAL_EXCHANGE_RATE) + DEFAULT_EXCHANGE_FEE_IDR;
        return NextResponse.json({
          reply: `¥${val.toLocaleString()} setara dengan sekitar Rp ${idrVal.toLocaleString('id-ID')} (kurs 1 CNY ≈ Rp ${INITIAL_EXCHANGE_RATE.toLocaleString('id-ID')}).`,
        });
      }

      if (matchIdr) {
        let mult = 1;
        if (q.includes('juta') || q.includes('jt')) mult = 1000000;
        else if (q.includes('ribu') || q.includes('rb')) mult = 1000;
        const val = parseFloat(matchIdr[1].replace(/,/g, '')) * mult;
        const net = Math.max(0, val - DEFAULT_EXCHANGE_FEE_IDR);
        const cny = Math.floor(net / INITIAL_EXCHANGE_RATE);
        return NextResponse.json({
          reply: `Uang Rp ${val.toLocaleString('id-ID')} dapat ditukar menjadi sekitar ¥${cny.toLocaleString()} Yuan dengan estimasi biaya Rp ${DEFAULT_EXCHANGE_FEE_IDR.toLocaleString('id-ID')}.`,
        });
      }

      return NextResponse.json({
        reply: `Kurs RedMandarin: 1 CNY ≈ Rp ${INITIAL_EXCHANGE_RATE.toLocaleString('id-ID')}. Anda bisa menukarkan Rupiah ↔ Yuan langsung di menu Exchange!`,
      });
    }

    // 2. Product recommendation
    const matchingProd = INITIAL_PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
    if (matchingProd) {
      return NextResponse.json({
        reply: `Rekomendasi untuk Anda: ${matchingProd.name} seharga Rp ${matchingProd.priceIdr.toLocaleString('id-ID')} (¥${matchingProd.priceCny}). Silakan cek katalog Shop.`,
        product: matchingProd,
      });
    }

    // 3. Mandarin Dictionary
    const matchingWord = INITIAL_DICTIONARY.find((w) =>
      w.meaningId.toLowerCase().includes(q) ||
      w.pinyin.toLowerCase().includes(q) ||
      w.hanzi.includes(q)
    );
    if (matchingWord) {
      return NextResponse.json({
        reply: `Karakter: ${matchingWord.hanzi} (${matchingWord.pinyin})\nArtinya: ${matchingWord.meaningId}\nContoh: "${matchingWord.exampleZh}" (${matchingWord.examplePinyin} - ${matchingWord.exampleId})`,
        audioHanzi: matchingWord.hanzi,
      });
    }

    return NextResponse.json({
      reply: 'Saya asisten RedMandarin. Anda bisa bertanya tentang rekomendasi produk perjalanan China, cek kurs Yuan, atau bertanya arti kosakata bahasa Mandarin!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Chat processing error' }, { status: 500 });
  }
}
