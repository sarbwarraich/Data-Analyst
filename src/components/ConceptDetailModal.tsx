import { useState, useEffect } from 'react';
import {
  X,
  Workflow,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Code2,
  Calculator,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { resolveConceptDetail, ConceptDiagramNode } from '../data/conceptDetailsData';

interface ConceptDetailModalProps {
  concept: string | null;
  topicTitle: string;
  subjectTitle?: string;
  onClose: () => void;
  onNextConcept?: () => void;
  onPrevConcept?: () => void;
  conceptIndex?: number;
  totalConcepts?: number;
}

type ModalTab = 'diagram' | 'answer' | 'math' | 'code';

export function ConceptDetailModal({
  concept,
  topicTitle,
  subjectTitle,
  onClose,
  onNextConcept,
  onPrevConcept,
  conceptIndex,
  totalConcepts,
}: ConceptDetailModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('diagram');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNextConcept) {
        onNextConcept();
      } else if (e.key === 'ArrowLeft' && onPrevConcept) {
        onPrevConcept();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNextConcept, onPrevConcept]);

  if (!concept) return null;

  const detail = resolveConceptDetail(concept, topicTitle);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selectedNode = detail.diagram.nodes.find((n) => n.id === selectedNodeId) || detail.diagram.nodes[0];

  const getNodeColorStyles = (type: ConceptDiagramNode['type']) => {
    switch (type) {
      case 'input':
        return 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 hover:border-emerald-400';
      case 'process':
        return 'border-sky-500/40 bg-sky-950/20 text-sky-300 dark:text-sky-300 light:text-sky-700 hover:border-sky-400';
      case 'decision':
        return 'border-amber-500/40 bg-amber-950/20 text-amber-300 dark:text-amber-300 light:text-amber-700 hover:border-amber-400';
      case 'warning':
        return 'border-rose-500/40 bg-rose-950/20 text-rose-300 dark:text-rose-300 light:text-rose-700 hover:border-rose-400';
      case 'output':
        return 'border-purple-500/40 bg-purple-950/20 text-purple-300 dark:text-purple-300 light:text-purple-700 hover:border-purple-400';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-200';
    }
  };

  const getNodeBadgeColor = (type: ConceptDiagramNode['type']) => {
    switch (type) {
      case 'input':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'process':
        return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'decision':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'warning':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'output':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50/80">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 pr-2">
              <div className="flex flex-wrap items-center gap-2">
                {subjectTitle && (
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/30">
                    {subjectTitle}
                  </span>
                )}
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {topicTitle}
                </span>
                {conceptIndex !== undefined && totalConcepts !== undefined && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Concept {conceptIndex + 1} of {totalConcepts}
                  </span>
                )}
              </div>

              {/* Formulated Question in Display Typography */}
              <h2 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-slate-900 leading-snug pt-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 hidden sm:inline" />
                {detail.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2">
                {detail.shortSummary}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition-colors shrink-0"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Segmented Control Tabs (Apple HIG) */}
          <div className="flex items-center gap-1.5 mt-4 p-1 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-200/80 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-300 w-fit overflow-x-auto">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'diagram'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Flowchart & Diagram</span>
            </button>

            <button
              onClick={() => setActiveTab('answer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'answer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Detailed Answer</span>
            </button>

            {detail.mathFormula && (
              <button
                onClick={() => setActiveTab('math')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'math'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Formulas & Math</span>
              </button>
            )}

            {detail.pythonExample && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Python Blueprint</span>
              </button>
            )}
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE CONTENT) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: INTERACTIVE FLOWCHART & DIAGRAM */}
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white dark:text-white light:text-slate-900">
                    {detail.diagram.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                    {detail.diagram.subtitle} • Click any node below to inspect deep step parameters
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700 dark:border-slate-700 light:border-slate-200">
                  {detail.diagram.nodes.length} Stages
                </span>
              </div>

              {/* FLOWCHART VISUAL PIPELINE */}
              <div className="relative p-4 sm:p-6 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {detail.diagram.nodes.map((node, idx) => {
                    const isSelected = selectedNode?.id === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${getNodeColorStyles(
                          node.type
                        )} ${
                          isSelected
                            ? 'ring-2 ring-indigo-500 shadow-lg scale-[1.02]'
                            : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300">
                            STEP 0{idx + 1}
                          </span>
                          {node.badge && (
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getNodeBadgeColor(
                                node.type
                              )}`}
                            >
                              {node.badge}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 leading-snug">
                            {node.label}
                          </h4>
                          {node.sublabel && (
                            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5">
                              {node.sublabel}
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 line-clamp-2">
                          {node.description}
                        </p>

                        <div className="flex items-center justify-between text-[11px] font-medium pt-1 border-t border-white/10 text-slate-400">
                          <span className="capitalize">{node.type}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* FLOW EDGES PROGRESSION BAR */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Sequential Pipeline Flow:
                    </span>
                    <span className="font-mono text-indigo-400">
                      {detail.diagram.nodes.map((n) => n.label).join(' ➔ ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* INSPECTED NODE DEEP DIVE CARD */}
              {selectedNode && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/20 dark:bg-indigo-950/20 light:bg-indigo-50/50 border border-indigo-500/30 dark:border-indigo-500/30 light:border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Node Deep-Dive: {selectedNode.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed">
                    {selectedNode.description}
                  </p>
                  {selectedNode.sublabel && (
                    <div className="mt-2.5 inline-block text-xs font-mono px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-900 light:bg-white text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-indigo-500/20">
                      Parameter/Execution signature: {selectedNode.sublabel}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DETAILED ANSWER & MECHANICS */}
          {activeTab === 'answer' && (
            <div className="space-y-6">
              {/* CORE DEFINITION */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider uppercase">Core Definition</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed font-normal">
                  {detail.detailedAnswer.coreDefinition}
                </p>
              </div>

              {/* HOW IT WORKS STEP-BY-STEP */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  Mechanics & Underlying Principles
                </h4>
                <div className="grid gap-2.5">
                  {detail.detailedAnswer.howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TWO COLUMNS: REAL WORLD CASES & COMMON PITFALLS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Real-World Use Cases */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/50 border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Real-World Industry Applications</span>
                  </div>
                  <ul className="space-y-2">
                    {detail.detailedAnswer.realWorldUseCases.map((useCase, idx) => (
                      <li key={idx} className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Pitfalls */}
                <div className="p-4 rounded-2xl bg-rose-950/20 dark:bg-rose-950/20 light:bg-rose-50/50 border border-rose-500/30 dark:border-rose-500/30 light:border-rose-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Common Pitfalls & Traps</span>
                  </div>
                  <ul className="space-y-2">
                    {detail.detailedAnswer.commonPitfalls.map((pitfall, idx) => (
                      <li key={idx} className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* KEY TAKEAWAY CALLOUT */}
              <div className="p-4 rounded-2xl bg-amber-950/20 dark:bg-amber-950/20 light:bg-amber-50/60 border border-amber-500/30 dark:border-amber-500/30 light:border-amber-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Key Exam & Industry Takeaway
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed font-medium">
                    {detail.detailedAnswer.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS & MATH */}
          {activeTab === 'math' && detail.mathFormula && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    {detail.mathFormula.name}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    LaTeX / Rigorous Form
                  </span>
                </div>

                {/* Mathematical Equation Display Box */}
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 overflow-x-auto text-center">
                  <div className="text-base sm:text-lg font-mono font-bold text-indigo-300 dark:text-indigo-300 light:text-indigo-800 tracking-wide py-2">
                    {detail.mathFormula.latex}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {detail.mathFormula.explanation}
                </p>

                {/* Variable Glossary Table */}
                <div className="space-y-2 pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
                    Variable Definitions
                  </h5>
                  <div className="grid gap-2">
                    {detail.mathFormula.variables.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-xs border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200"
                      >
                        <span className="font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/40">
                          {v.symbol}
                        </span>
                        <span className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-right">
                          {v.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PYTHON BLUEPRINT */}
          {activeTab === 'code' && detail.pythonExample && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    {detail.pythonExample.title}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Production-ready snippet demonstrating defensive execution
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(detail.pythonExample?.code || '')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-200 hover:bg-slate-700 transition"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-700 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400">
                  <span>python3</span>
                  <span>UTF-8</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  <code>{detail.pythonExample.code}</code>
                </pre>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 italic">
                💡 {detail.pythonExample.explanation}
              </p>
            </div>
          )}
        </div>

        {/* MODAL FOOTER CONTROLS */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onPrevConcept && (
              <button
                onClick={onPrevConcept}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300 hover:bg-slate-700 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Concept
              </button>
            )}
            {onNextConcept && (
              <button
                onClick={onNextConcept}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300 hover:bg-slate-700 transition cursor-pointer"
              >
                Next Concept <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
