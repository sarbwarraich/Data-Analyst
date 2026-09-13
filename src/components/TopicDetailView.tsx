import { useState } from 'react';
import { Topic, Subject } from '../types/curriculum';
import { FlowchartViewer } from './FlowchartViewer';
import { AITutorPanel } from './AITutorPanel';
import { PipelineVisualizer } from './visualizers/PipelineVisualizer';
import { KMeansVisualizer } from './visualizers/KMeansVisualizer';
import { ConfusionMatrixVisualizer } from './visualizers/ConfusionMatrixVisualizer';
import { DistributionsVisualizer } from './visualizers/DistributionsVisualizer';
import { QueuingVisualizer } from './visualizers/QueuingVisualizer';
import { TimeSeriesVisualizer } from './visualizers/TimeSeriesVisualizer';
import { LSTMVisualizer } from './visualizers/LSTMVisualizer';
import { DecisionTreeVisualizer } from './visualizers/DecisionTreeVisualizer';
import { EDAVisualizer } from './visualizers/EDAVisualizer';
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

export function TopicDetailView({
  topic,
  subject,
  onNavigateTopic,
  isCompleted = false,
  onToggleComplete,
  nextTopic,
  prevTopic,
}: Props) {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Topic Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800/40">
              {subject.title}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {topic.difficulty}
            </span>
            <span className="text-xs text-slate-400 font-mono">Category: {topic.category}</span>
          </div>

          {/* Mark as Complete Action Button */}
          {onToggleComplete && (
            <button
              id={`topic-complete-toggle-${topic.id}`}
              onClick={() => onToggleComplete(topic.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 shadow-emerald-900/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/50'
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
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{topic.title}</h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">{topic.summary}</p>

        {/* Key Concepts Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 self-center mr-1">Key Syllabus Units:</span>
          {topic.keyConcepts.map((concept, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/60 font-medium"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Visualizer Canvas (Prominent Top Section) */}
      {renderVisualizer() && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Interactive Concept Playground & Dynamic Simulator
            </h3>
          </div>
          {renderVisualizer()}
        </div>
      )}

      {/* Flowchart Section (if defined) */}
      {topic.flowchart && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Algorithmic Execution Flowchart
            </h3>
          </div>
          <FlowchartViewer flowchart={topic.flowchart} />
        </div>
      )}

      {/* Real-World Industry Application & Case Study */}
      {topic.caseStudy && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Real-World Industry Case Study
                </span>
                <h3 className="text-base font-bold text-white">{topic.caseStudy.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{topic.caseStudy.companyExample}</span>
              <span className="text-slate-600">•</span>
              <span>{topic.caseStudy.industry}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Industry Problem & Constraints:
            </span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
              {topic.caseStudy.problem}
            </p>
          </div>

          {/* Solution Workflow */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-emerald-400" /> Analytics Solution Workflow
            </span>
            <div className="space-y-1.5 mt-2">
              {topic.caseStudy.solutionWorkflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome & Takeaway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Business Impact
              </span>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {topic.caseStudy.outcome}
              </p>
            </div>
            <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-lg p-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                Analyst Takeaway
              </span>
              <p className="text-xs text-indigo-200/90 leading-relaxed">
                {topic.caseStudy.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mathematical Formulations & Theory */}
      {topic.formulas && topic.formulas.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Theoretical Rigor
              </span>
              <h3 className="text-base font-bold text-white">Mathematical Formulations & Derivations</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.formulas.map((item, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
                <span className="text-xs font-bold text-slate-200">{item.name}</span>
                <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-lg text-xs font-mono text-purple-200 overflow-x-auto text-center">
                  {item.latex}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                {item.variables && item.variables.length > 0 && (
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60 font-mono">
                    {item.variables.map((v) => `${v.symbol}: ${v.meaning}`).join(' • ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Python / Analytics Code Implementation */}
      {topic.pythonSnippet && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  Production Python Script
                </span>
                <h3 className="text-base font-bold text-white">{topic.pythonSnippet.title}</h3>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">{topic.pythonSnippet.explanation}</p>

          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
            <code>{topic.pythonSnippet.code}</code>
          </pre>
        </div>
      )}

      {/* Gemini AI Interactive Learning Companion */}
      <AITutorPanel topic={topic} subject={subject} />

      {/* Assessment Quiz Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Formative Assessment
              </span>
              <h3 className="text-base font-bold text-white">Interactive Topic Quiz & Knowledge Check</h3>
            </div>
          </div>

          <button
            onClick={handleGenerateAIQuiz}
            disabled={quizLoading}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
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
                <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-white">
                    {qIdx + 1}. {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const isCorrect = q.answer === oIdx;

                      let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                      if (isSubmitted) {
                        if (isCorrect) optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                        else if (isSelected && !isCorrect) optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else if (isSelected) {
                        optStyle = 'bg-amber-950/60 border-amber-500 text-amber-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${optStyle}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">Explanation:</strong> {q.explanation}
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
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition"
                >
                  Submit Quiz & Check Score
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    Score:{' '}
                    <span className="text-emerald-400">
                      {quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length} /{' '}
                      {quizQuestions.length}
                    </span>
                  </span>
                  <button
                    onClick={handleGenerateAIQuiz}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
                  >
                    Try Another AI Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Topic Progression & Navigation Footer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onToggleComplete && (
            <button
              id={`footer-complete-toggle-${topic.id}`}
              onClick={() => onToggleComplete(topic.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 shadow-emerald-900/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/50'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>Topic Completed ✓ (Click to unmark)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark Topic as Complete</span>
                </>
              )}
            </button>
          )}
          <span className="text-xs text-slate-400">
            {isCompleted ? 'Saved to curriculum progress.' : 'Mark complete when you are ready to advance.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {prevTopic && onNavigateTopic && (
            <button
              id="prev-topic-btn"
              onClick={() => onNavigateTopic(prevTopic.topic.id, prevTopic.subjectId)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Topic</span>
            </button>
          )}
          {nextTopic && onNavigateTopic && (
            <button
              id="next-topic-btn"
              onClick={() => onNavigateTopic(nextTopic.topic.id, nextTopic.subjectId)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Next: {nextTopic.topic.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
