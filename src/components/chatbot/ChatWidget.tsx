'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useExchange } from '@/context/ExchangeContext';
import { useOrders } from '@/context/OrderContext';
import { useSavedWords } from '@/context/SavedWordsContext';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { formatIdr, formatCny } from '@/lib/utils';
import { MessageSquare, X, Send, Sparkles, Volume2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  hanziAudio?: string;
  productId?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { rate, fee } = useExchange();
  const { orders } = useOrders();
  const { allWords } = useSavedWords();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Halo! 👋 Saya Mandarin Assistant RedMandarin. Ada yang bisa saya bantu seputar belanja kebutuhan China, kurs Yuan, kosakata Mandarin, atau pesanan Anda?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakMandarin = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const processUserQuery = (query: string): { reply: string; audio?: string; productId?: string } => {
    const q = query.toLowerCase();

    // 1. Currency calculation checks
    // e.g. "berapa 2 juta rupiah ke yuan" or "berapa ¥100 ke rupiah" or "kurs yuan"
    if (q.includes('kurs') || q.includes('rate') || q.includes('yuan') || q.includes('cny') || q.includes('rupiah') || q.includes('idr')) {
      const matchIdr = q.match(/(\d+[\d.,]*)\s*(juta|jt|ribu|rb|k|rupiah|idr)/i) || q.match(/rp\s*(\d+[\d.,]*)/i);
      const matchCny = q.match(/¥\s*(\d+[\d.,]*)/i) || q.match(/(\d+[\d.,]*)\s*(yuan|cny|rmb)/i);

      if (matchCny) {
        const val = parseFloat(matchCny[1].replace(/,/g, ''));
        if (!isNaN(val)) {
          const idrVal = Math.round(val * rate) + fee;
          return {
            reply: `¥${val.toLocaleString()} sekitar ${formatIdr(idrVal)} (dengan kurs 1 CNY ≈ Rp ${rate.toLocaleString('id-ID')} dan estimasi biaya Rp ${fee.toLocaleString('id-ID')}).`,
          };
        }
      }

      if (matchIdr) {
        let multiplier = 1;
        if (q.includes('juta') || q.includes('jt')) multiplier = 1000000;
        else if (q.includes('ribu') || q.includes('rb')) multiplier = 1000;
        
        const rawNum = parseFloat(matchIdr[1].replace(/,/g, '')) || 1;
        const totalIdr = rawNum * multiplier;
        const netIdr = Math.max(0, totalIdr - fee);
        const cnyVal = Math.floor(netIdr / rate);
        return {
          reply: `Uang ${formatIdr(totalIdr)} dapat ditukarkan menjadi sekitar ${formatCny(cnyVal)} (Kurs acuan 1 CNY = Rp ${rate.toLocaleString('id-ID')}). Anda bisa langsung melakukan simulasi di menu Exchange!`,
        };
      }

      return {
        reply: `Kurs RedMandarin hari ini: 1 CNY (Yuan) ≈ Rp ${rate.toLocaleString('id-ID')}. Anda dapat menukar IDR ke CNY maupun CNY ke IDR secara aman dengan biaya layanan transparan Rp ${fee.toLocaleString('id-ID')}.`,
      };
    }

    // 2. Orders status check
    // e.g. "status pesanan", "cek order", "inv-"
    if (q.includes('pesanan') || q.includes('order') || q.includes('status') || q.includes('inv')) {
      if (orders.length > 0) {
        const latest = orders[0];
        return {
          reply: `Pesanan terakhir Anda [#${latest.orderNumber}] berstatus "${latest.status}" dengan total ${formatIdr(latest.totalIdr)} (${formatCny(latest.totalCny)}). Terdiri dari ${latest.items.length} jenis produk.`,
        };
      }
      return {
        reply: 'Anda belum memiliki riwayat pesanan aktif. Mulai belanja produk kebutuhan China di katalog Shop kami!',
      };
    }

    // 3. Products lookup
    // e.g. "adapter", "esim", "vpn", "tas", "teh", "kuas", "termos", "rekomendasi"
    if (q.includes('adapter') || q.includes('colokan')) {
      const prod = INITIAL_PRODUCTS[0];
      return {
        reply: `Rekomendasi untuk stopkontak China: "${prod.name}". Kompatibel dengan colokan 3-pin miring & 2-pin pipih standar China, ada fitur GaN Fast Charging 65W. Harga ${formatIdr(prod.priceIdr)} (${formatCny(prod.priceCny)}).`,
        productId: prod.id,
      };
    }
    if (q.includes('esim') || q.includes('internet') || q.includes('kuota') || q.includes('vpn') || q.includes('wa')) {
      const prod = INITIAL_PRODUCTS[1];
      return {
        reply: `Untuk internet di China: "${prod.name}". Sudah bebas blokir Great Firewall sehingga WhatsApp, Google Maps, dan Instagram langsung aktif tanpa perlu pasang VPN lagi! Harga ${formatIdr(prod.priceIdr)} (${formatCny(prod.priceCny)}).`,
        productId: prod.id,
      };
    }
    if (q.includes('produk') || q.includes('belanja') || q.includes('rekomendasi') || q.includes('beli')) {
      return {
        reply: `Kami menyediakan produk esensial untuk perjalanan ke China: Universal Travel Adapter Type A/I, eSIM Data Unlimited dengan Built-in VPN, Smart AI Voice Translator, Tas Kabin 35L, Teh Tie Guan Yin asli Fujian, dan Termos LED SUS316. Cek halaman Shop untuk katalog lengkap!`,
      };
    }

    // 4. Mandarin translation & vocabulary
    // search in dictionary database
    const foundWord = allWords.find(
      (w) =>
        q.includes(w.meaningId.toLowerCase()) ||
        q.includes(w.pinyin.toLowerCase()) ||
        q.includes(w.hanzi) ||
        (q.includes('berapa') && w.hanzi === '多少钱') ||
        (q.includes('terima kasih') && w.hanzi === '谢谢') ||
        (q.includes('halo') && w.hanzi === '你好') ||
        (q.includes('tolong') && w.hanzi === '救命')
    );

    if (foundWord) {
      return {
        reply: `Berikut kata Mandarin untuk pertanyaan Anda:\n\n【${foundWord.hanzi}】\nPinyin: ${foundWord.pinyin}\nArtinya: ${foundWord.meaningId}\n\nContoh kalimat:\n"${foundWord.exampleZh}"\n(${foundWord.examplePinyin} - ${foundWord.exampleId})`,
        audio: foundWord.hanzi,
      };
    }

    // Generic friendly answer
    return {
      reply: `Saya bisa membantu Anda mengenai:\n1. 🛍️ Rekomendasi produk (adapter, eSIM VPN, translator, tas)\n2. 💱 Cek simulasi kurs Yuan (contoh: "Berapa 1 juta rupiah ke Yuan?")\n3. 🇨🇳 Belajar kosakata Mandarin (contoh: "Bagaimana bilang terima kasih?")\n4. 📦 Cek status pesanan Anda.`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate smart agent response
    setTimeout(() => {
      const res = processUserQuery(query);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: res.reply,
        hanziAudio: res.audio,
        productId: res.productId,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const quickChips = [
    'Berapa 2 juta rupiah ke Yuan?',
    'Cari adapter untuk China',
    'Bagaimana mengatakan berapa harganya?',
    'Status pesanan saya?',
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white shadow-floating hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">AI Assistant</span>
              <span className="text-[10px] text-white/80 font-chinese">小助手</span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-chinese font-bold text-lg">
                红
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  Mandarin Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h3>
                <p className="text-[11px] text-white/80">E-Commerce • Kurs • Bahasa Mandarin</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Audio pronounce button if hanzi present */}
                  {m.hanziAudio && (
                    <button
                      onClick={() => speakMandarin(m.hanziAudio!)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-primary border border-red-200 rounded-lg font-bold text-[11px] hover:bg-red-100 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Pengucapan ({m.hanziAudio})</span>
                    </button>
                  )}

                  {/* Product card link if recommended */}
                  {m.productId && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/shop`}
                        className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Lihat Produk di Toko</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan (kurs, produk, Mandarin)..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover disabled:opacity-40 disabled:hover:bg-primary transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
