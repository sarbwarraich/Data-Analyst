import { useState } from 'react';
import { Topic, Subject } from '../types/curriculum';
import { FlowchartViewer } from './FlowchartViewer';
import { TopicVisualCard } from './TopicVisualCard';
import { AITutorPanel } from './AITutorPanel';
import { ConceptDetailModal } from './ConceptDetailModal';
import { TopicCheatSheetModal } from './TopicCheatSheetModal';
import { PipelineVisualizer } from './visualizers/PipelineVisualizer';
import { KMeansVisualizer } from './visualizers/KMeansVisualizer';
import { ConfusionMatrixVisualizer } from './visualizers/ConfusionMatrixVisualizer';
import { DistributionsVisualizer } from './visualizers/DistributionsVisualizer';
import { QueuingVisualizer } from './visualizers/QueuingVisualizer';
import { TimeSeriesVisualizer } from './visualizers/TimeSeriesVisualizer';
import { LSTMVisualizer } from './visualizers/LSTMVisualizer';
import { DecisionTreeVisualizer } from './visualizers/DecisionTreeVisualizer';
import { EDAVisualizer } from './visualizers/EDAVisualizer';
import { DataTypesVisualizer } from './visualizers/DataTypesVisualizer';
import {
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Award,
  ListChecks,
  Building2,
  CheckCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Compass,
  FileCode,
  LayoutGrid,
  FileText,
  Download,
  Printer,
} from 'lucide-react';

interface Props {
  topic: Topic;
  subject: Subject;
  onNavigateTopic?: (topicId: string, subjectId?: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: (topicId: string) => void;
  nextTopic?: { topic: Topic; subjectId: string };
  prevTopic?: { topic: Topic; subjectId: string };
}

type TopicSectionTab = 'all' | 'simulator' | 'flowchart' | 'case-study' | 'code-tutor' | 'quiz';

export function TopicDetailView({
  topic,
  subject,
  onNavigateTopic,
  isCompleted = false,
  onToggleComplete,
  nextTopic,
  prevTopic,
}: Props) {
  const [activeTab, setActiveTab] = useState<TopicSectionTab>('all');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [selectedConceptIndex, setSelectedConceptIndex] = useState<number | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Pre-loaded quiz or Gemini generated quiz
  const [quizQuestions, setQuizQuestions] = useState<
    { question: string; options: string[]; answer: number; explanation: string }[]
  >(
    topic.quiz.map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.correctIndex,
      explanation: q.explanation,
    }))
  );
  const [quizLoading, setQuizLoading] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleCopyCode = () => {
    if (topic.pythonSnippet?.code) {
      navigator.clipboard.writeText(topic.pythonSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleGenerateAIQuiz = async () => {
    setQuizLoading(true);
    try {
      const res = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          subjectTitle: subject.title,
          context: topic.summary,
        }),
      });
      const data = await res.json();
      if (res.ok && data.questions) {
        setQuizQuestions(data.questions);
        setUserAnswers({});
        setShowScore(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setQuizLoading(false);
    }
  };

  const renderVisualizer = () => {
    switch (topic.interactiveType) {
      case 'pipeline':
        return <PipelineVisualizer />;
      case 'kmeans':
        return <KMeansVisualizer />;
      case 'confusion-matrix':
        return <ConfusionMatrixVisualizer />;
      case 'distributions':
        return <DistributionsVisualizer />;
      case 'queuing':
        return <QueuingVisualizer />;
      case 'timeseries-decomp':
        return <TimeSeriesVisualizer />;
      case 'lstm-cell':
        return <LSTMVisualizer />;
      case 'decision-tree':
        return <DecisionTreeVisualizer />;
      case 'eda-visualizer':
        return <EDAVisualizer />;
      case 'data-types':
        return <DataTypesVisualizer />;
      default:
        return null;
    }
  };

  const hasVisualizer = Boolean(renderVisualizer());
  const hasFlowchart = Boolean(topic.flowchart);
  const hasVisual = Boolean(topic.visualDiagram);
  const hasCaseStudy = Boolean(topic.caseStudy);
  const hasFormulas = Boolean(topic.formulas && topic.formulas.length > 0);
  const hasCode = Boolean(topic.pythonSnippet);

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full">
      {/* Topic Hero Card (Apple HIG design with frosted glass and balanced whitespace) */}
      <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 md:p-8 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm relative overflow-hidden transition-all">
        {/* Subtle Apple ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 dark:text-indigo-300 light:text-indigo-600 bg-indigo-950/60 dark:bg-indigo-950/60 light:bg-indigo-50 px-3 py-1 rounded-full border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200">
              {subject.title}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800/80 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/80 dark:border-slate-700 light:border-slate-200">
              {topic.difficulty}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
              Module: {topic.category}
            </span>
          </div>

          {/* Action Buttons: Export Cheat Sheet & Mark as Complete */}
          <div className="flex items-center gap-2">
            <button
              id={`topic-export-pdf-${topic.id}`}
              onClick={() => setShowExportModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 shadow-indigo-900/20"
              title="Export structured printable cheat sheet in PDF format for offline study"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-100" />
              <span>Export Cheat Sheet (PDF)</span>
            </button>

            {/* Mark as Complete Action Button */}
            {onToggleComplete && (
              <button
                id={`topic-complete-toggle-${topic.id}`}
                onClick={() => onToggleComplete(topic.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 shadow-emerald-900/20'
                    : 'bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/80 dark:border-slate-700 light:border-slate-300'
                }`}
                title={isCompleted ? 'Topic completed! Click to mark as incomplete' : 'Click to mark this topic as complete'}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                    <span>Completed ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-slate-500" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight leading-tight">
          {topic.title}
        </h1>
        <p className="text-sm md:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2.5 max-w-3xl leading-relaxed">
          {topic.summary}
        </p>

        {/* Key Concepts Pills (SF-style interactive chips) */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Syllabus Core Concepts:</span>
            </div>
            <span className="text-[11px] font-medium text-indigo-400 dark:text-indigo-400 light:text-indigo-600 bg-indigo-500/10 dark:bg-indigo-500/10 light:bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-500/20 flex items-center gap-1">
              <Workflow className="w-3 h-3" /> Click any concept for detailed answer &amp; flowchart
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {topic.keyConcepts.map((concept, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedConceptIndex(i)}
                className="group text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 font-medium hover:border-indigo-500 hover:bg-indigo-950/40 dark:hover:bg-indigo-950/40 light:hover:bg-indigo-50 hover:text-indigo-300 dark:hover:text-indigo-300 light:hover:text-indigo-700 transition-all cursor-pointer flex items-center gap-2 shadow-sm text-left"
                title="Click to view detailed answer, flowchart, formulas & code"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform shrink-0" />
                <span>{concept}</span>
                <span className="text-[10px] text-indigo-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-0.5">
                  ➔
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apple-style Segmented View Controller (Addresses "Space is very less can you adjust the section for better view") */}
      <div className="sticky top-16 z-30 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-md py-2 -mx-2 px-2 border-y border-slate-800/60 dark:border-slate-800/60 light:border-slate-200/60 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Sections</span>
          </button>

          {hasVisualizer && (
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Simulator</span>
            </button>
          )}

          {(hasFlowchart || hasVisual) && (
            <button
              onClick={() => setActiveTab('flowchart')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'flowchart'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Flowchart & Visuals</span>
            </button>
          )}

          {(hasCaseStudy || hasFormulas) && (
            <button
              onClick={() => setActiveTab('case-study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'case-study'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Case Study & Math</span>
            </button>
          )}

          {hasCode && (
            <button
              onClick={() => setActiveTab('code-tutor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'code-tutor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python & AI Tutor</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Quiz Assessment</span>
          </button>
        </div>

        {/* Quick actions & hint indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 hover:bg-indigo-950/60 dark:hover:bg-indigo-950/60 light:hover:bg-indigo-50 border border-indigo-500/30 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
            title="Export topic cheat sheet into structured PDF format"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cheat Sheet PDF</span>
          </button>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
            <span>Viewing: {activeTab === 'all' ? 'Complete Scope' : activeTab.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* SECTION: CONCEPT PLAYGROUND / SIMULATOR */}
      {(activeTab === 'all' || activeTab === 'simulator') && hasVisualizer && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400 dark:text-indigo-400 light:text-indigo-600" />
            <h3 className="text-sm md:text-base font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">
              Interactive Concept Playground & Dynamic Simulator
            </h3>
          </div>
          {renderVisualizer()}
        </div>
      )}

      {/* SECTION: FLOWCHART & VISUAL DIAGRAMS */}
      {(activeTab === 'all' || activeTab === 'flowchart') && (
        <div className="space-y-6">
          {/* Flowchart Section */}
          {topic.flowchart && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400 dark:text-indigo-400 light:text-indigo-600" />
                <h3 className="text-sm md:text-base font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">
                  Algorithmic Execution Flowchart
                </h3>
              </div>
              <FlowchartViewer flowchart={topic.flowchart} />
            </div>
          )}

          {/* Visual Diagram & Architecture Image */}
          {topic.visualDiagram && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400 dark:text-indigo-400 light:text-indigo-600" />
                <h3 className="text-sm md:text-base font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">
                  Conceptual Architecture & Visual Diagram
                </h3>
              </div>
              <TopicVisualCard visual={topic.visualDiagram} topicTitle={topic.title} />
            </div>
          )}
        </div>
      )}

      {/* SECTION: CASE STUDY & MATH */}
      {(activeTab === 'all' || activeTab === 'case-study') && (
        <div className="space-y-6">
          {/* Real-World Industry Application & Case Study */}
          {topic.caseStudy && (
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 md:p-7 shadow-xl light:shadow-sm space-y-5 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 dark:text-emerald-400 light:text-emerald-600 uppercase tracking-wider">
                      Real-World Industry Case Study
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white dark:text-white light:text-slate-900">
                      {topic.caseStudy.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 bg-slate-950/70 dark:bg-slate-950 light:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{topic.caseStudy.companyExample}</span>
                  <span className="text-slate-600">•</span>
                  <span>{topic.caseStudy.industry}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider">
                  Industry Problem & Constraints:
                </span>
                <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-normal">
                  {topic.caseStudy.problem}
                </p>
              </div>

              {/* Solution Workflow */}
              <div className="bg-slate-950/70 dark:bg-slate-950 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 md:p-5 space-y-2">
                <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-emerald-400" /> Analytics Solution Workflow
                </span>
                <div className="space-y-2 mt-3">
                  {topic.caseStudy.solutionWorkflow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome & Takeaway */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/80 border border-emerald-800/30 dark:border-emerald-800/40 light:border-emerald-200 rounded-xl p-4">
                  <span className="text-xs font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-700 uppercase tracking-wider block mb-1">
                    Business Impact
                  </span>
                  <p className="text-xs md:text-sm text-emerald-200/90 dark:text-emerald-200/90 light:text-emerald-900 leading-relaxed">
                    {topic.caseStudy.outcome}
                  </p>
                </div>
                <div className="bg-indigo-950/20 dark:bg-indigo-950/20 light:bg-indigo-50/80 border border-indigo-800/30 dark:border-indigo-800/40 light:border-indigo-200 rounded-xl p-4">
                  <span className="text-xs font-bold text-indigo-400 dark:text-indigo-400 light:text-indigo-700 uppercase tracking-wider block mb-1">
                    Analyst Takeaway
                  </span>
                  <p className="text-xs md:text-sm text-indigo-200/90 dark:text-indigo-200/90 light:text-indigo-900 leading-relaxed">
                    {topic.caseStudy.keyTakeaway}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mathematical Formulations & Theory */}
          {hasFormulas && (
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 md:p-7 shadow-xl light:shadow-sm space-y-5 transition-all">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-400 dark:text-purple-400 light:text-purple-600 uppercase tracking-wider">
                    Theoretical Rigor
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white dark:text-white light:text-slate-900">
                    Mathematical Formulations & Derivations
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.formulas!.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/70 dark:bg-slate-950 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 space-y-3">
                    <span className="text-xs md:text-sm font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 block">
                      {item.name}
                    </span>
                    <div className="p-3.5 bg-purple-950/30 dark:bg-purple-950/30 light:bg-purple-100/60 border border-purple-800/30 dark:border-purple-800/40 light:border-purple-200 rounded-xl text-xs md:text-sm font-mono text-purple-200 dark:text-purple-200 light:text-purple-900 overflow-x-auto text-center font-bold">
                      {item.latex}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                      {item.explanation}
                    </p>
                    {item.variables && item.variables.length > 0 && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-500 light:text-slate-600 pt-2 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 font-mono">
                        {item.variables.map((v) => `${v.symbol}: ${v.meaning}`).join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: PYTHON CODE & GEMINI AI TUTOR */}
      {(activeTab === 'all' || activeTab === 'code-tutor') && (
        <div className="space-y-6">
          {/* Python Implementation */}
          {topic.pythonSnippet && (
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 md:p-7 shadow-xl light:shadow-sm space-y-4 transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-sky-400 dark:text-sky-400 light:text-sky-600 uppercase tracking-wider">
                      Production Python Script
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white dark:text-white light:text-slate-900">
                      {topic.pythonSnippet.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 rounded-xl text-xs font-medium flex items-center gap-1.5 transition border border-slate-700/80 dark:border-slate-700 light:border-slate-200 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                {topic.pythonSnippet.explanation}
              </p>

              <pre className="bg-slate-950 dark:bg-slate-950 light:bg-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-800 rounded-xl p-5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                <code>{topic.pythonSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Gemini AI Interactive Learning Companion */}
          <AITutorPanel topic={topic} subject={subject} />
        </div>
      )}

      {/* SECTION: FORMATIVE ASSESSMENT QUIZ */}
      {(activeTab === 'all' || activeTab === 'quiz') && (
        <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xl light:shadow-sm space-y-6 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-amber-400 dark:text-amber-400 light:text-amber-600 uppercase tracking-wider">
                  Formative Assessment
                </span>
                <h3 className="text-base md:text-lg font-bold text-white dark:text-white light:text-slate-900">
                  Interactive Topic Quiz & Knowledge Check
                </h3>
              </div>
            </div>

            <button
              onClick={handleGenerateAIQuiz}
              disabled={quizLoading}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {quizLoading ? 'Generating AI Questions...' : 'Generate New AI Quiz'}
            </button>
          </div>

          {quizQuestions.length > 0 && (
            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                const isSubmitted = showScore;

                return (
                  <div
                    key={qIdx}
                    className="bg-slate-950/70 dark:bg-slate-950 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 space-y-3"
                  >
                    <h4 className="text-sm md:text-base font-semibold text-white dark:text-white light:text-slate-900">
                      {qIdx + 1}. {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedOpt === oIdx;
                        const isCorrect = q.answer === oIdx;

                        let optStyle =
                          'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100';
                        if (isSubmitted) {
                          if (isCorrect) optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 dark:text-emerald-200 light:text-emerald-900';
                          else if (isSelected && !isCorrect)
                            optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 dark:text-rose-200 light:text-rose-900';
                        } else if (isSelected) {
                          optStyle = 'bg-amber-950/60 border-amber-500 text-amber-200 dark:text-amber-200 light:text-amber-900';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isSubmitted}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-3.5 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        <strong className="text-amber-400 dark:text-amber-300 light:text-amber-600">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-between pt-2">
                {!showScore ? (
                  <button
                    onClick={() => setShowScore(true)}
                    disabled={Object.keys(userAnswers).length < quizQuestions.length}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm"
                  >
                    Submit Quiz & Check Score
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Score:{' '}
                      <span className="text-emerald-400 font-mono">
                        {quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length} / {quizQuestions.length}
                      </span>
                    </span>
                    <button
                      onClick={handleGenerateAIQuiz}
                      className="px-4 py-2 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-slate-200 dark:text-slate-200 light:text-slate-800 rounded-xl text-xs font-medium transition cursor-pointer"
                    >
                      Try Another AI Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Topic Progression & Navigation Footer */}
      <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 shadow-lg light:shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
        <div className="flex items-center gap-3">
          {onToggleComplete && (
            <button
              id={`footer-complete-toggle-${topic.id}`}
              onClick={() => onToggleComplete(topic.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 shadow-emerald-900/20'
                  : 'bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/80 dark:border-slate-700 light:border-slate-300'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>Topic Completed ✓</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400 dark:text-slate-400 light:text-slate-500" />
                  <span>Mark Topic as Complete</span>
                </>
              )}
            </button>
          )}
          <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
            {isCompleted ? 'Saved to curriculum progress.' : 'Mark complete when you are ready to advance.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {prevTopic && onNavigateTopic && (
            <button
              id="prev-topic-btn"
              onClick={() => onNavigateTopic(prevTopic.topic.id, prevTopic.subjectId)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-1.5 transition border border-slate-700/80 dark:border-slate-700 light:border-slate-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          )}
          {nextTopic && onNavigateTopic && (
            <button
              id="next-topic-btn"
              onClick={() => onNavigateTopic(nextTopic.topic.id, nextTopic.subjectId)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Next: {nextTopic.topic.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* DETAILED CONCEPT POPUP MODAL (QUESTION, ANSWER, FLOWCHART & FORMULA) */}
      {selectedConceptIndex !== null && (
        <ConceptDetailModal
          concept={topic.keyConcepts[selectedConceptIndex]}
          topicTitle={topic.title}
          subjectTitle={subject.title}
          conceptIndex={selectedConceptIndex}
          totalConcepts={topic.keyConcepts.length}
          onClose={() => setSelectedConceptIndex(null)}
          onNextConcept={
            selectedConceptIndex < topic.keyConcepts.length - 1
              ? () => setSelectedConceptIndex(selectedConceptIndex + 1)
              : undefined
          }
          onPrevConcept={
            selectedConceptIndex > 0
              ? () => setSelectedConceptIndex(selectedConceptIndex - 1)
              : undefined
          }
        />
      )}

      {/* TOPIC CHEAT SHEET EXPORT MODAL (PDF DOWNLOAD & STRUCTURED PRINTABLE SHEET) */}
      {showExportModal && (
        <TopicCheatSheetModal
          topic={topic}
          subject={subject}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
