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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Gemini AI Interactive Learning Companion</h4>
            <p className="text-xs text-slate-400">Personalized Curriculum Tutoring & Live Q&A</p>
          </div>
        </div>

        {/* Style Selector Pills */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => {
              setStyle('mtech');
              handleFetchExplanation('mtech');
            }}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
              style === 'mtech' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3 h-3" /> M.Tech Syllabus
          </button>
          <button
            onClick={() => {
              setStyle('beginner');
              handleFetchExplanation('beginner');
            }}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
              style === 'beginner' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Intuition & Visual
          </button>
          <button
            onClick={() => {
              setStyle('interview');
              handleFetchExplanation('interview');
            }}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
              style === 'interview' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3 h-3" /> Interview Prep
          </button>
          <button
            onClick={() => {
              setStyle('code');
              handleFetchExplanation('code');
            }}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
              style === 'code' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" /> Python Engine
          </button>
        </div>
      </div>

      {/* Trigger or Show Personalized Explanation */}
      {!explanation && !loading && (
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-5 text-center">
          <p className="text-xs text-slate-300 max-w-lg mx-auto mb-3 leading-relaxed">
            Generate a personalized deep-dive explanation for <strong className="text-white">"{topic.title}"</strong> tailored to your study goal.
          </p>
          <button
            onClick={() => handleFetchExplanation()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 shadow-md transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate {style.toUpperCase()} Explanation
          </button>
        </div>
      )}

      {loading && (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
          <span>Synthesizing pedagogical explanation with Gemini...</span>
        </div>
      )}

      {explanation && !loading && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-mono text-indigo-400 font-semibold uppercase">Perspective: {style}</span>
            <button
              onClick={() => handleFetchExplanation()}
              className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3 h-3" /> Re-generate
            </button>
          </div>
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
            {explanation}
          </div>
        </div>
      )}

      {/* Suggested Topic Questions */}
      {topic.suggestedPrompts && topic.suggestedPrompts.length > 0 && (
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Suggested High-Yield Practice Questions
          </span>
          <div className="flex flex-wrap gap-2">
            {topic.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleAskQuestion(prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition text-left flex items-center gap-1.5"
              >
                <MessageSquare className="w-3 h-3 text-indigo-400 shrink-0" />
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
              className={`p-3 rounded-lg text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-950/40 border border-indigo-800/40 text-indigo-100 ml-6'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 mr-6 whitespace-pre-line'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">
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
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!customQuestion.trim() || loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
        >
          <Send className="w-3 h-3" /> Ask
        </button>
      </form>

      {errorMsg && (
        <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
