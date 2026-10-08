'use client';

import React, { useState, useMemo } from 'react';
import { useSavedWords } from '@/context/SavedWordsContext';
import { DictionaryWord } from '@/types';
import { Search, Volume2, Star, BookOpen, BookmarkCheck, Sparkles } from 'lucide-react';

export default function MandarinPage() {
  const { allWords, savedWords, toggleSaveWord, isWordSaved } = useSavedWords();

  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'Semua Kategori', icon: '📚' },
    { id: 'Greetings', label: '👋 Greetings', icon: '👋' },
    { id: 'Food', label: '🍜 Food', icon: '🍜' },
    { id: 'Shopping', label: '🛍 Shopping', icon: '🛍' },
    { id: 'Transportation', label: '🚕 Transportation', icon: '🚕' },
    { id: 'Hotel', label: '🏨 Hotel', icon: '🏨' },
    { id: 'Airport', label: '✈️ Airport', icon: '✈️' },
    { id: 'Conversation', label: '💬 Conversation', icon: '💬' },
    { id: 'Money', label: '💰 Money', icon: '💰' },
    { id: 'Emergency', label: '🏥 Emergency', icon: '🏥' },
    { id: 'Business', label: '💼 Business', icon: '💼' },
  ];

  const filteredWords = useMemo(() => {
    const listToFilter = activeTab === 'all' ? allWords : savedWords;

    return listToFilter.filter((word) => {
      const matchSearch =
        word.hanzi.includes(searchQuery) ||
        word.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.meaningId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.exampleZh.includes(searchQuery) ||
        word.exampleId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || word.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [activeTab, allWords, savedWords, searchQuery, selectedCategory]);

  const playSpeech = (word: DictionaryWord) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.hanzi);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;

      setPlayingId(word.id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. DICTIONARY HERO & SEARCH (PRD Section 17) */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-card text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-primary text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Mandarin Dictionary • 汉印词典</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-2">
          Kamus Bahasa Mandarin Interaktif
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
          Temukan arti kosakata, cara baca Pinyin akurat, contoh kalimat kontekstual, dan dengarkan pelafalan audio langsung.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kata Mandarin (Hanzi), Pinyin, atau Bahasa Indonesia (contoh: Terima kasih, 多少钱)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-dark focus:outline-none focus:border-primary focus:bg-white shadow-sm transition-all"
          />
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-400">
          <span>Contoh populer:</span>
          {['谢谢', '多少钱', '不要辣', '微信支付', '地铁站'].map((k) => (
            <button
              key={k}
              onClick={() => setSearchQuery(k)}
              className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:text-primary hover:bg-red-50 transition-colors"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TABS & CATEGORIES (PRD Section 18, 20) */}
      <div className="space-y-4">
        
        {/* Main Tab: All Words vs My Vocabulary */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Semua Kosakata ({allWords.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'saved'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>My Vocabulary (Disimpan: {savedWords.length})</span>
            </button>
          </div>

          <span className="text-xs text-gray-400 hidden sm:inline">
            Menampilkan {filteredWords.length} entri
          </span>
        </div>

        {/* Category Pills (Section 18) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-dark text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-dark'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3. WORD CARDS GRID (PRD Section 19) */}
      {filteredWords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => {
            const isSaved = isWordSaved(word.id);
            const isPlaying = playingId === word.id;

            return (
              <div
                key={word.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Bar: Category badge & Save button */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 uppercase">
                      {word.category}
                    </span>

                    <button
                      onClick={() => toggleSaveWord(word)}
                      className={`p-2 rounded-xl transition-colors ${
                        isSaved
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-gray-50 text-gray-400 hover:text-amber-500'
                      }`}
                      title={isSaved ? 'Hapus dari Tersimpan' : 'Simpan Kosakata'}
                    >
                      <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Character, Pinyin, Meaning */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-3xl font-extrabold text-dark font-chinese group-hover:text-primary transition-colors">
                        {word.hanzi}
                      </h3>
                      <span className="text-sm font-bold text-primary font-mono">
                        {word.pinyin}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {word.meaningId}
                    </p>
                    {word.notes && (
                      <p className="text-[11px] text-gray-400 italic">
                        {word.notes}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-4" />

                  {/* Example sentences */}
                  <div className="space-y-1.5 bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Contoh Kalimat:
                    </span>
                    <p className="text-xs font-bold text-dark font-chinese">
                      {word.exampleZh}
                    </p>
                    <p className="text-[11px] text-primary font-medium">
                      {word.examplePinyin}
                    </p>
                    <p className="text-[11px] text-gray-600">
                      {word.exampleId}
                    </p>
                  </div>

                </div>

                {/* Bottom Actions: Listen Audio & Save */}
                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
                  <button
                    onClick={() => playSpeech(word)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isPlaying
                        ? 'bg-primary text-white animate-pulse'
                        : 'bg-red-50 text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlaying ? 'Memutar Suara...' : '🔊 Listen (Dengarkan)'}</span>
                  </button>

                  <button
                    onClick={() => toggleSaveWord(word)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                      isSaved
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`} />
                    <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-700">
            {activeTab === 'saved'
              ? 'Belum ada kosakata yang disimpan di My Vocabulary'
              : 'Tidak ditemukan kata yang cocok'}
          </h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            {activeTab === 'saved'
              ? 'Klik ikon bintang (☆) pada kartu kata untuk menyimpan kosakata favorit Anda.'
              : 'Coba ubah kata kunci pencarian atau pilih kategori lain.'}
          </p>
          {activeTab === 'saved' && (
            <button
              onClick={() => setActiveTab('all')}
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover"
            >
              Jelajahi Semua Kosakata
            </button>
          )}
        </div>
      )}

    </div>
  );
}
