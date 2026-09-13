import { useState } from 'react';
import { Flowchart } from '../types/curriculum';
import { ArrowDown, CheckCircle, ChevronRight, HelpCircle, Layers, PlayCircle } from 'lucide-react';

interface Props {
  flowchart: Flowchart;
}

export function FlowchartViewer({ flowchart }: Props) {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const selectedStep = flowchart.steps[selectedStepIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'input':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'process':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'decision':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'output':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Interactive Execution Flowchart
            </span>
            <span className="text-xs text-slate-400">{flowchart.steps.length} Sequenced Phases</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">{flowchart.title}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{flowchart.description}</p>
        </div>
      </div>

      {/* Horizontal / Vertical Flowchart Track */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 space-y-2.5">
          {flowchart.steps.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            const isLast = idx === flowchart.steps.length - 1;

            return (
              <div key={step.id} className="relative">
                <button
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-lg border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h5 className="text-xs font-bold text-white truncate">{step.title}</h5>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${getCategoryColor(step.category)}`}>
                        {step.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{step.description}</p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform mt-1.5 ${
                      isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>

                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed Deep Dive */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-lg p-4 sticky top-4">
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Step Deep-Dive (Phase 0{selectedStepIndex + 1})
            </span>
          </div>

          <h5 className="text-base font-bold text-white mb-2">{selectedStep.title}</h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">{selectedStep.description}</p>

          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Phase Classification:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getCategoryColor(selectedStep.category)}`}>
                {selectedStep.category}
              </span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded p-3 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                <CheckCircle className="w-3.5 h-3.5" /> Operational Objective
              </div>
              Execute this phase sequentially to prevent pipeline breakage or numerical instability in subsequent stages.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
