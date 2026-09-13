import { useState, useMemo } from 'react';
import { CHEAT_SHEETS } from '../data/cheatSheetsData';
import { SubjectId } from '../types/curriculum';
import { Search, Copy, Check, FileText, Code2, BookOpen, Bookmark, Lightbulb, Printer } from 'lucide-react';

const SUBJECT_LABELS: Record<SubjectId, string> = {
  'data-analytics': 'Data Analytics',
  'data-visualization': 'Data Visualization',
  'probability-statistics': 'Probability & Statistics',
  'machine-learning': 'Machine Learning',
  'time-series': 'Time Series Analysis',
};

export function CheatSheetsView() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    return CHEAT_SHEETS.filter((entry) => {
      const matchSubject = selectedSubjectId === 'all' || entry.subjectId === selectedSubjectId;
      if (!matchSubject) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.formulaOrSyntax.toLowerCase().includes(q) ||
        (entry.ruleOfThumb && entry.ruleOfThumb.toLowerCase().includes(q))
      );
    });
  }, [selectedSubjectId, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 dark:text-blue-400 light:text-blue-700 border border-blue-500/30">
              Exam & Interview Quick Reference
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Total Entries: {CHEAT_SHEETS.length}</span>
          </div>
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-1">M.Tech Data Analyst Cheat Sheet Hub</h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Essential formulas, Pandas / NumPy idioms, evaluation metrics, and diagnostic decision rules.
          </p>
        </div>

        {/* Search Input & Print Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas, tests, rules..."
              className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-700 border border-slate-700 dark:border-slate-700 light:border-slate-300 transition cursor-pointer flex items-center gap-1.5 shrink-0"
            title="Print Cheat Sheet Hub or Save as PDF"
          >
            <Printer className="w-4 h-4 text-sky-400 dark:text-sky-400 light:text-sky-600" />
            <span className="hidden sm:inline">Print Hub</span>
          </button>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pb-3">
        <button
          onClick={() => setSelectedSubjectId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border cursor-pointer ${
            selectedSubjectId === 'all'
              ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-sm'
              : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-50'
          }`}
        >
          All Topics ({CHEAT_SHEETS.length})
        </button>
        {(Object.keys(SUBJECT_LABELS) as SubjectId[]).map((subId) => (
          <button
            key={subId}
            onClick={() => setSelectedSubjectId(subId)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border cursor-pointer ${
              selectedSubjectId === subId
                ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-sm'
                : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {SUBJECT_LABELS[subId]}
          </button>
        ))}
      </div>

      {/* Cheat Sheet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEntries.map((entry) => {
          const isCopied = copiedId === entry.id;

          return (
            <div
              key={entry.id}
              className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 shadow-lg light:shadow-sm flex flex-col justify-between hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-950/60 dark:bg-blue-950/60 light:bg-blue-50 text-blue-300 dark:text-blue-300 light:text-blue-700 border border-blue-800/40 dark:border-blue-800/40 light:border-blue-200 font-bold">
                        {entry.category}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                        {SUBJECT_LABELS[entry.subjectId]}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">{entry.title}</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(entry.formulaOrSyntax, entry.id)}
                    className="p-1.5 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-600 transition shrink-0 cursor-pointer"
                    title="Copy formula/syntax"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Formula / Syntax Box */}
                <div className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-3.5 font-mono text-xs text-blue-200 dark:text-blue-200 light:text-blue-700 overflow-x-auto my-3 font-semibold">
                  {entry.formulaOrSyntax}
                </div>

                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed whitespace-pre-line mb-3 font-normal">
                  {entry.description}
                </p>

                {entry.pythonSnippet && (
                  <div className="mt-3">
                    <span className="text-[11px] font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700 uppercase tracking-wider block mb-1 font-bold">
                      Python Idiom
                    </span>
                    <pre className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-3 text-xs font-mono text-emerald-300 dark:text-emerald-300 light:text-emerald-800 overflow-x-auto">
                      <code>{entry.pythonSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {entry.ruleOfThumb && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start gap-2 bg-amber-950/20 dark:bg-amber-950/20 light:bg-amber-50 p-2.5 rounded-xl border border-amber-800/30 dark:border-amber-800/30 light:border-amber-200">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 dark:text-amber-400 light:text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 dark:text-amber-200/90 light:text-amber-900 leading-relaxed font-normal">
                    <strong className="text-amber-300 dark:text-amber-300 light:text-amber-700 font-semibold">Rule of Thumb:</strong> {entry.ruleOfThumb}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
