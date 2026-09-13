import { useState } from 'react';
import { Topic, Subject } from '../types/curriculum';
import { Sparkles, Send, MessageSquare, BookOpen, Terminal, Briefcase, RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  topic: Topic;
  subject: Subject;
}

type ExplanationStyle = 'mtech' | 'beginner' | 'interview' | 'code';

export function AITutorPanel({ topic, subject }: Props) {
  const [style, setStyle] = useState<ExplanationStyle>('mtech');
  const [loading, setLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Request personalized explanation from backend
  const handleFetchExplanation = async (overrideStyle?: ExplanationStyle) => {
    const targetStyle = overrideStyle || style;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topic.title,
          subjectTitle: subject.title,
          context: `${topic.summary}. Key concepts: ${topic.keyConcepts.join(', ')}`,
          style: targetStyle,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setExplanation(data.text);
      } else if (data.fallback) {
        setExplanation(data.explanation);
      } else {
        setErrorMsg(data.error || 'Failed to fetch AI explanation.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error connecting to Gemini service.');
    } finally {
      setLoading(false);
    }
  };

  // Submit interactive Q&A question
  const handleAskQuestion = async (promptText?: string) => {
    const query = (promptText || customQuestion).trim();
    if (!query) return;

    const userMessage = { role: 'user' as const, text: query };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setCustomQuestion('');
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          topicTitle: topic.title,
          subjectTitle: subject.title,
          history: updatedHistory.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = await res.json();
      if (res.ok && (data.success || data.fallback)) {
        setChatHistory((prev) => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        setErrorMsg(data.error || 'Failed to receive Q&A response.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error reaching Gemini backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm space-y-5 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">Gemini AI Interactive Learning Companion</h4>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Personalized Curriculum Tutoring & Live Q&A</p>
          </div>
        </div>

        {/* Style Selector Pills */}
        <div className="flex flex-wrap gap-1 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs">
          <button
            onClick={() => {
              setStyle('mtech');
              handleFetchExplanation('mtech');
            }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              style === 'mtech'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3 h-3" /> M.Tech Syllabus
          </button>
          <button
            onClick={() => {
              setStyle('beginner');
              handleFetchExplanation('beginner');
            }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              style === 'beginner'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            Intuition & Visual
          </button>
          <button
            onClick={() => {
              setStyle('interview');
              handleFetchExplanation('interview');
            }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              style === 'interview'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3 h-3" /> Interview Prep
          </button>
          <button
            onClick={() => {
              setStyle('code');
              handleFetchExplanation('code');
            }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              style === 'code'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3 h-3" /> Python Engine
          </button>
        </div>
      </div>

      {/* Trigger or Show Personalized Explanation */}
      {!explanation && !loading && (
        <div className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 text-center">
          <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-lg mx-auto mb-3 leading-relaxed">
            Generate a personalized deep-dive explanation for <strong className="text-white dark:text-white light:text-slate-900">"{topic.title}"</strong> tailored to your study goal.
          </p>
          <button
            onClick={() => handleFetchExplanation()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate {style.toUpperCase()} Explanation
          </button>
        </div>
      )}

      {loading && (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-500" />
          <span>Synthesizing pedagogical explanation with Gemini...</span>
        </div>
      )}

      {explanation && !loading && (
        <div className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 pb-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
            <span className="font-mono text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold uppercase">Perspective: {style}</span>
            <button
              onClick={() => handleFetchExplanation()}
              className="text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 text-[11px] flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Re-generate
            </button>
          </div>
          <div className="text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed whitespace-pre-line">
            {explanation}
          </div>
        </div>
      )}

      {/* Suggested Topic Questions */}
      {topic.suggestedPrompts && topic.suggestedPrompts.length > 0 && (
        <div>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider block mb-2">
            Suggested High-Yield Practice Questions
          </span>
          <div className="flex flex-wrap gap-2">
            {topic.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleAskQuestion(prompt)}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition text-left flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3 h-3 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 shrink-0" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className="space-y-3 pt-2">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-950/40 dark:bg-indigo-950/40 light:bg-indigo-50 border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200 text-indigo-100 dark:text-indigo-100 light:text-indigo-900 ml-6'
                  : 'bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 mr-6 whitespace-pre-line'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase font-mono mb-1">
                {msg.role === 'user' ? 'You' : 'Gemini AI Tutor'}
              </div>
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Interactive Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAskQuestion();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          placeholder={`Ask Gemini anything about ${topic.title}...`}
          className="flex-1 bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl px-3.5 py-2 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!customQuestion.trim() || loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-sm"
        >
          <Send className="w-3 h-3" /> Ask
        </button>
      </form>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-950/40 dark:bg-rose-950/40 light:bg-rose-50 border border-rose-800/40 dark:border-rose-800/40 light:border-rose-200 text-rose-300 dark:text-rose-300 light:text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
