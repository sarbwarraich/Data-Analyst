import { useState } from 'react';
import { Flowchart } from '../types/curriculum';
import {
  ArrowRight,
  ArrowDown,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Layers,
  PlayCircle,
  Sparkles,
  Workflow,
  Eye,
  ListTree,
} from 'lucide-react';

interface Props {
  flowchart: Flowchart;
}

export function FlowchartViewer({ flowchart }: Props) {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'diagram' | 'stepper'>('diagram');
  const selectedStep = flowchart.steps[selectedStepIndex] || flowchart.steps[0];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'input':
        return {
          badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-500',
          activeBg: 'from-blue-500/20 to-indigo-500/10 border-blue-500/50',
          nodeBorder: 'border-blue-500/40 text-blue-300',
        };
      case 'process':
        return {
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
          activeBg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/50',
          nodeBorder: 'border-emerald-500/40 text-emerald-300',
        };
      case 'decision':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500',
          activeBg: 'from-amber-500/20 to-orange-500/10 border-amber-500/50',
          nodeBorder: 'border-amber-500/40 text-amber-300',
        };
      case 'output':
        return {
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          dot: 'bg-purple-500',
          activeBg: 'from-purple-500/20 to-indigo-500/10 border-purple-500/50',
          nodeBorder: 'border-purple-500/40 text-purple-300',
        };
      default:
        return {
          badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
          dot: 'bg-slate-400',
          activeBg: 'from-slate-500/20 to-slate-700/10 border-slate-500/50',
          nodeBorder: 'border-slate-600 text-slate-300',
        };
    }
  };

  const handleNext = () => {
    if (selectedStepIndex < flowchart.steps.length - 1) {
      setSelectedStepIndex(selectedStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedStepIndex > 0) {
      setSelectedStepIndex(selectedStepIndex - 1);
    }
  };

  return (
    <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 md:p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 dark:text-indigo-300 light:text-indigo-600 border border-indigo-500/30 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5" />
              Algorithmic Flowchart
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
              {flowchart.steps.length} Sequenced Phases
            </span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
            {flowchart.title}
          </h4>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            {flowchart.description}
          </p>
        </div>

        {/* Apple-style segmented view toggle */}
        <div className="flex items-center self-start sm:self-auto bg-slate-950/80 dark:bg-slate-950 light:bg-slate-100 p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
          <button
            onClick={() => setViewMode('diagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'diagram'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive Nodes</span>
          </button>
          <button
            onClick={() => setViewMode('stepper')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'stepper'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Phase List</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE DIAGRAM NODES CANVAS */}
      {viewMode === 'diagram' && (
        <div className="mt-5 space-y-5">
          {/* Horizontal / Wrapped Visual Flow Pipeline */}
          <div className="bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200/90 rounded-xl p-4 overflow-x-auto">
            <div className="flex items-center min-w-max gap-2 py-2">
              {flowchart.steps.map((step, idx) => {
                const isSelected = idx === selectedStepIndex;
                const isLast = idx === flowchart.steps.length - 1;
                const theme = getCategoryTheme(step.category);

                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStepIndex(idx)}
                      className={`group relative text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between w-48 h-28 cursor-pointer ${
                        isSelected
                          ? `bg-gradient-to-br ${theme.activeBg} border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]`
                          : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border-slate-800/80 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 hover:bg-slate-900 light:hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span
                          className={`w-6 h-6 rounded-full text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider border ${theme.badge}`}
                        >
                          {step.category}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-white dark:text-white light:text-slate-900 line-clamp-2 mt-1 leading-snug">
                        {step.title}
                      </h5>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
                        <span>Click to inspect</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        )}
                      </div>
                    </button>

                    {!isLast && (
                      <div className="flex items-center justify-center px-1 text-slate-600 dark:text-slate-600 light:text-slate-300">
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Node Detail Card (Apple HIG Focus Card) */}
          <div className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{selectedStepIndex + 1}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                      getCategoryTheme(selectedStep.category).badge
                    }`}
                  >
                    Phase Type: {selectedStep.category}
                  </span>
                </div>

                <h5 className="text-base md:text-lg font-bold text-white dark:text-white light:text-slate-900">
                  {selectedStep.title}
                </h5>

                <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed max-w-3xl">
                  {selectedStep.description}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 border-t border-slate-800/80 dark:border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Best Practice: Enforce validation gates before advancing</span>
                  </div>
                  <span>•</span>
                  <span>Sequential order: Phase {selectedStepIndex + 1} of {flowchart.steps.length}</span>
                </div>
              </div>

              {/* Step Step-Through Navigation Controls */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={selectedStepIndex === 0}
                  className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Previous phase"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 px-1">
                  {selectedStepIndex + 1} / {flowchart.steps.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={selectedStepIndex === flowchart.steps.length - 1}
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm cursor-pointer"
                  title="Next phase"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: VERTICAL STEPPER LIST */}
      {viewMode === 'stepper' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-2">
            {flowchart.steps.map((step, idx) => {
              const isSelected = idx === selectedStepIndex;
              const isLast = idx === flowchart.steps.length - 1;
              const theme = getCategoryTheme(step.category);

              return (
                <div key={step.id} className="relative">
                  <button
                    onClick={() => setSelectedStepIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/50 dark:bg-indigo-950/50 light:bg-indigo-50/80 border-indigo-500 shadow-md'
                        : 'bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border-slate-800/80 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 text-slate-300 dark:text-slate-300 light:text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600'
                      }`}
                    >
                      0{idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate">
                          {step.title}
                        </h5>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${theme.badge}`}
                        >
                          {step.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform mt-1.5 ${
                        isSelected
                          ? 'text-indigo-400 translate-x-1'
                          : 'text-slate-600 dark:text-slate-600 light:text-slate-400'
                      }`}
                    />
                  </button>

                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-slate-600 dark:text-slate-600 light:text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stepper detail deep dive */}
          <div className="lg:col-span-5 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 sticky top-4">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider">
                Phase 0{selectedStepIndex + 1} Deep-Dive
              </span>
            </div>

            <h5 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">
              {selectedStep.title}
            </h5>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-4">
              {selectedStep.description}
            </p>

            <div className="space-y-3 pt-3 border-t border-slate-800/80 dark:border-slate-800 light:border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-600">Category:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    getCategoryTheme(selectedStep.category).badge
                  }`}
                >
                  {selectedStep.category}
                </span>
              </div>

              <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-lg p-3 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                <div className="flex items-center gap-1.5 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold mb-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Operational Objective
                </div>
                Execute this phase sequentially to prevent pipeline breakage or numerical instability in subsequent stages.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
