import { useState, useMemo } from 'react';
import { CHEAT_SHEETS } from '../data/cheatSheetsData';
import { SubjectId } from '../types/curriculum';
import { Search, Copy, Check, FileText, Code2, BookOpen, Bookmark, Lightbulb } from 'lucide-react';

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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Exam & Interview Quick Reference
            </span>
            <span className="text-xs text-slate-400">Total Entries: {CHEAT_SHEETS.length}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">M.Tech Data Analyst Cheat Sheet Hub</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Essential formulas, Pandas / NumPy idioms, evaluation metrics, and diagnostic decision rules.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas, tests, rules..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedSubjectId('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
            selectedSubjectId === 'all'
              ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          All Topics ({CHEAT_SHEETS.length})
        </button>
        {(Object.keys(SUBJECT_LABELS) as SubjectId[]).map((subId) => (
          <button
            key={subId}
            onClick={() => setSelectedSubjectId(subId)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
              selectedSubjectId === subId
                ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
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
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-950/60 text-blue-300 border border-blue-800/40">
                        {entry.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {SUBJECT_LABELS[entry.subjectId]}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{entry.title}</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(entry.formulaOrSyntax, entry.id)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
                    title="Copy formula/syntax"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Formula / Syntax Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-blue-200 overflow-x-auto my-3">
                  {entry.formulaOrSyntax}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-3 font-normal">
                  {entry.description}
                </p>

                {entry.pythonSnippet && (
                  <div className="mt-3">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                      Python Idiom
                    </span>
                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                      <code>{entry.pythonSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {entry.ruleOfThumb && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 leading-relaxed font-normal">
                    <strong className="text-amber-300 font-semibold">Rule of Thumb:</strong> {entry.ruleOfThumb}
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
