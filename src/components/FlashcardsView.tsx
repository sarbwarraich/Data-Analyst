import { useState, useMemo } from 'react';
import { FLASHCARDS } from '../data/flashcardsData';
import { Flashcard, SubjectId } from '../types/curriculum';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle,
  Filter,
  BookOpen
} from 'lucide-react';

const SUBJECT_LABELS: Record<SubjectId, string> = {
  'data-analytics': 'Data Analytics',
  'data-visualization': 'Data Visualization',
  'probability-statistics': 'Probability & Statistics',
  'machine-learning': 'Machine Learning',
  'time-series': 'Time Series Analysis',
};

export function FlashcardsView() {
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Filtered card list
  const filteredCards = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      return subjectFilter === 'all' || card.subjectId === subjectFilter;
    });
  }, [subjectFilter]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progressPercent =
    filteredCards.length > 0
      ? Math.round(
          (filteredCards.filter((c) => masteredIds.has(c.id)).length / filteredCards.length) * 100
        )
      : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header & Stats Banner */}
      <div className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 border border-emerald-500/30">
              Active Recall Engine
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Total Deck: {FLASHCARDS.length} Cards</span>
          </div>
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-1">M.Tech Flashcards & Revision Deck</h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Test retention of mathematical proofs, assumptions, interview traps, and diagnostic formulas.
          </p>
        </div>

        {/* Mastery Meter */}
        <div className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 min-w-[200px]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium">Mastery Progress</span>
            <span className="font-mono font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 p-3.5 rounded-xl text-xs light:shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 light:text-slate-500" />
          <select
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 transition"
          >
            <option value="all">All Subjects ({FLASHCARDS.length})</option>
            <option value="data-analytics">Data Analytics</option>
            <option value="data-visualization">Data Visualization</option>
            <option value="probability-statistics">Probability & Statistics</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="time-series">Time Series Analysis</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Shuffle className="w-3 h-3" /> Shuffle
          </button>
          <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
            {filteredCards.length > 0 ? `${currentIndex + 1} / ${filteredCards.length}` : '0 / 0'}
          </span>
        </div>
      </div>

      {/* 3D Flipping Flashcard */}
      {currentCard ? (
        <div className="perspective-1000 min-h-[340px]">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full h-full min-h-[340px] rounded-2xl border transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between select-none shadow-2xl light:shadow-md relative ${
              isFlipped
                ? 'bg-gradient-to-br from-indigo-950/90 to-slate-950 dark:from-indigo-950/90 dark:to-slate-950 light:from-indigo-50/90 light:to-white border-indigo-500/60 dark:border-indigo-500/60 light:border-indigo-300'
                : 'bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 light:from-white light:to-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 light:hover:border-slate-300'
            }`}
          >
            {/* Top Badge & Hint */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase font-bold bg-indigo-950/70 dark:bg-indigo-950/70 light:bg-indigo-100 text-indigo-300 dark:text-indigo-300 light:text-indigo-800 border border-indigo-800/50 dark:border-indigo-800/50 light:border-indigo-200">
                  {currentCard.tag}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  {SUBJECT_LABELS[currentCard.subjectId] || currentCard.subjectId} • {currentCard.topicTitle}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                <RotateCw className={`w-3.5 h-3.5 ${isFlipped ? 'rotate-180' : ''} transition-transform`} />
                <span>Click card to flip</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="py-6 flex-1 flex flex-col justify-center items-center text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold">
                    Question / Conceptual Challenge
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900 max-w-xl mx-auto leading-relaxed">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 max-w-xl mx-auto text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-semibold block text-center">
                    Detailed Solution & Insight
                  </span>
                  <div className="text-sm md:text-base text-slate-100 dark:text-slate-100 light:text-slate-800 leading-relaxed font-normal bg-slate-950/50 dark:bg-slate-950/50 light:bg-white p-4 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 whitespace-pre-line shadow-sm">
                    {currentCard.back}
                  </div>

                  {currentCard.formula && (
                    <div className="bg-purple-950/30 dark:bg-purple-950/30 light:bg-purple-100/70 border border-purple-800/40 dark:border-purple-800/40 light:border-purple-200 rounded-lg p-2.5 font-mono text-xs text-purple-200 dark:text-purple-200 light:text-purple-900 text-center font-bold">
                      {currentCard.formula}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-700 dark:border-slate-700 light:border-slate-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {masteredIds.has(currentCard.id) ? 'Mastered ✓' : 'Mark as Mastered'}
              </button>

              <span className="text-[11px] text-slate-500 dark:text-slate-500 light:text-slate-400 font-mono">ID: {currentCard.id}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-12 text-center text-slate-400 dark:text-slate-400 light:text-slate-500">
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-500" />
          <p className="text-sm">No flashcards matching the current filter criteria.</p>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-white dark:text-white light:text-slate-800 transition flex items-center gap-2 text-xs font-semibold shadow-md light:shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 text-xs font-semibold shadow-md cursor-pointer"
        >
          <RotateCw className="w-4 h-4" /> {isFlipped ? 'Show Question' : 'Reveal Answer'}
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-white dark:text-white light:text-slate-800 transition flex items-center gap-2 text-xs font-semibold shadow-md light:shadow-sm cursor-pointer"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
