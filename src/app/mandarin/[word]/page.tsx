'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_DICTIONARY } from '@/lib/data';
import { useSavedWords } from '@/context/SavedWordsContext';
import { ArrowLeft, Volume2, Star, BookOpen, Share2 } from 'lucide-react';

interface PageProps {
  params: {
    word: string;
  };
}

export default function WordDetailPage({ params }: PageProps) {
  const decodedWord = decodeURIComponent(params.word);
  const { allWords, toggleSaveWord, isWordSaved } = useSavedWords();

  const word = allWords.find(
    (w) =>
      w.hanzi === decodedWord ||
      w.pinyin.toLowerCase().replace(/\s+/g, '-') === decodedWord.toLowerCase() ||
      w.id === decodedWord
  );

  const [isPlaying, setIsPlaying] = useState(false);

  if (!word) {
    return notFound();
  }

  const isSaved = isWordSaved(word.id);

  const playSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.hanzi);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;

      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/mandarin"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kamus Mandarin</span>
        </Link>
      </div>

      {/* Main Word Card (PRD Section 19) */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-card space-y-8">
        
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-primary uppercase">
            {word.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveWord(word)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                isSaved
                  ? 'border-amber-400 bg-amber-50 text-amber-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isSaved ? 'Disimpan' : '☆ Save Word'}</span>
            </button>
          </div>
        </div>

        {/* Hanzi, Pinyin, Meaning */}
        <div className="text-center space-y-3 py-4">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-dark font-chinese tracking-wide">
            {word.hanzi}
          </h1>
          <p className="text-2xl font-bold text-primary font-mono tracking-wide">
            {word.pinyin}
          </p>
          <p className="text-lg text-gray-400 font-mono">
            /{word.pinyin.toLowerCase()}/
          </p>
          <p className="text-xl font-bold text-gray-800 pt-2">
            {word.meaningId}
          </p>
          {word.notes && (
            <p className="text-xs text-gray-500 max-w-md mx-auto italic mt-1">
              Catatan: {word.notes}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Example section (PRD Section 19) */}
        <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Contoh Kalimat (Example)
          </h3>
          <p className="text-lg font-bold text-dark font-chinese leading-relaxed">
            {word.exampleZh}
          </p>
          <p className="text-sm font-semibold text-primary font-mono">
            {word.examplePinyin}
          </p>
          <p className="text-sm text-gray-600">
            {word.exampleId}
          </p>
        </div>

        {/* Audio Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={playSpeech}
            className={`flex-1 py-4 px-6 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
              isPlaying
                ? 'bg-primary text-white animate-pulse'
                : 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-red-200 hover:scale-[1.01]'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlaying ? 'Sedang Memutar Audio...' : '🔊 Listen (Dengarkan Pengucapan Asli)'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
