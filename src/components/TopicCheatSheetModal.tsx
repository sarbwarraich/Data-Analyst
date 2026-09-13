import { useState, useMemo, useEffect } from 'react';
import { Topic, Subject } from '../types/curriculum';
import { CHEAT_SHEETS } from '../data/cheatSheetsData';
import {
  exportTopicCheatSheetPdf,
  DEFAULT_PDF_OPTIONS,
  PdfExportOptions,
} from '../utils/exportTopicCheatSheetPdf';
import {
  Download,
  Printer,
  FileText,
  Check,
  Copy,
  X,
  Sparkles,
  Code2,
  Workflow,
  Briefcase,
  Award,
  Lightbulb,
  CheckSquare,
  Square,
  Eye,
  BookOpen,
} from 'lucide-react';

interface TopicCheatSheetModalProps {
  topic: Topic;
  subject: Subject;
  onClose: () => void;
}

export function TopicCheatSheetModal({
  topic,
  subject,
  onClose,
}: TopicCheatSheetModalProps) {
  const [options, setOptions] = useState<PdfExportOptions>(DEFAULT_PDF_OPTIONS);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Find corresponding cheat sheets from master repository
  const matchingCheats = useMemo(() => {
    return CHEAT_SHEETS.filter(
      (c) =>
        c.subjectId === topic.subjectId ||
        c.category.toLowerCase().includes(topic.category.toLowerCase()) ||
        topic.title.toLowerCase().includes(c.category.toLowerCase())
    );
  }, [topic]);

  const toggleOption = (key: keyof PdfExportOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadPdf = () => {
    setIsExporting(true);
    try {
      exportTopicCheatSheetPdf(topic, subject, options);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = `# ${topic.title} — Cheat Sheet\n`;
    md += `**Subject**: ${subject.title} | **Module**: ${topic.category} | **Difficulty**: ${topic.difficulty}\n\n`;
    md += `## 1. Overview\n${topic.summary}\n\n`;

    if (options.includeConcepts && topic.keyConcepts?.length) {
      md += `## 2. Core Concepts\n`;
      topic.keyConcepts.forEach((c) => (md += `- ${c}\n`));
      md += `\n`;
    }

    if (options.includeFormulas && topic.formulas?.length) {
      md += `## 3. Mathematical Formulations\n`;
      topic.formulas.forEach((f) => {
        md += `### ${f.name}\n\`\`\`latex\n${f.latex}\n\`\`\`\n${f.explanation}\n`;
        if (f.variables?.length) {
          f.variables.forEach((v) => (md += `- **${v.symbol}**: ${v.meaning}\n`));
        }
        md += `\n`;
      });
    }

    if (options.includeRules && matchingCheats.length) {
      md += `## 4. Decision Rules & Diagnostic Guidelines\n`;
      matchingCheats.forEach((c) => {
        md += `### ${c.title} (${c.category})\n${c.description}\n`;
        if (c.ruleOfThumb) md += `> **Rule of Thumb**: ${c.ruleOfThumb}\n\n`;
      });
    }

    if (options.includeCode && topic.pythonSnippet) {
      md += `## 5. Python Implementation Recipe\n\`\`\`python\n${topic.pythonSnippet.code}\n\`\`\`\n${topic.pythonSnippet.explanation}\n\n`;
    }

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* MODAL HEADER */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase text-indigo-400">
                  {subject.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {topic.difficulty}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Export Topic Cheat Sheet
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              title="Copy markdown text summary"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              title="Print via browser or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Print / Browser PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION TOGGLE TOOLBAR */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs text-slate-300 no-print">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 uppercase tracking-wider">
            Include in PDF:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => toggleOption('includeConcepts')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeConcepts
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeConcepts ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Concepts</span>
            </button>

            <button
              onClick={() => toggleOption('includeFormulas')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeFormulas
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeFormulas ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Formulas</span>
            </button>

            <button
              onClick={() => toggleOption('includeRules')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeRules
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeRules ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Diagnostic Rules</span>
            </button>

            <button
              onClick={() => toggleOption('includeFlowchart')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeFlowchart
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeFlowchart ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Flowchart Stages</span>
            </button>

            <button
              onClick={() => toggleOption('includeCode')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeCode
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeCode ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Python Code</span>
            </button>

            <button
              onClick={() => toggleOption('includeCaseStudy')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeCaseStudy
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeCaseStudy ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Case Study</span>
            </button>

            <button
              onClick={() => toggleOption('includeQuiz')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition ${
                options.includeQuiz
                  ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {options.includeQuiz ? <CheckSquare className="w-3 h-3 text-indigo-400" /> : <Square className="w-3 h-3" />}
              <span>Self-Assessment Quiz</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE PREVIEW CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/40">
          <div className="max-w-4xl mx-auto mb-2 text-center text-xs text-slate-400 no-print flex items-center justify-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Document Preview — Structured A4 Sheet for Offline Exam Revision</span>
          </div>

          {/* A4 PAPER CANVAS */}
          <div
            id="printable-topic-cheatsheet"
            className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-2xl border border-slate-200 font-sans leading-relaxed"
          >
            {/* Sheet Header Banner */}
            <div className="bg-slate-900 text-white p-6 rounded-xl mb-6 border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-indigo-600 text-white uppercase">
                    OFFLINE REVISION GUIDE
                  </span>
                  <span className="text-xs text-indigo-200 font-medium">
                    {subject.title} • Module: {topic.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Difficulty: {topic.difficulty}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {topic.title}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Curriculum Core Competencies &amp; Examination Quick Reference Guide
              </p>
            </div>

            {/* 1. Overview */}
            {options.includeOverview && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    1. Executive Overview &amp; Theoretical Framework
                  </h2>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  {topic.summary}
                </p>
              </div>
            )}

            {/* 2. Core Concepts */}
            {options.includeConcepts && topic.keyConcepts?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    2. Syllabus Core Concepts Matrix ({topic.keyConcepts.length} Competencies)
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topic.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Formulas & Math */}
            {options.includeFormulas && topic.formulas && topic.formulas.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    3. Mathematical Formulations &amp; Notation
                  </h2>
                </div>
                <div className="space-y-3">
                  {topic.formulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{idx + 1}. {formula.name}</span>
                        <span className="text-[10px] text-indigo-600 font-mono">Formula</span>
                      </div>
                      <div className="p-2 bg-indigo-50/70 border border-indigo-200 rounded font-mono text-xs text-indigo-900 overflow-x-auto">
                        {formula.latex}
                      </div>
                      <p className="text-slate-600 text-[11px]">{formula.explanation}</p>
                      {formula.variables && formula.variables.length > 0 && (
                        <div className="pt-1 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                          {formula.variables.map((v, vIdx) => (
                            <div key={vIdx} className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-indigo-700">{v.symbol}:</span>
                              <span className="text-slate-600">{v.meaning}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Diagnostic Rules & Expert Guidelines */}
            {options.includeRules && matchingCheats.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-amber-500 mb-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    4. Diagnostic Decision Rules &amp; Rules of Thumb
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {matchingCheats.map((cheat) => (
                    <div
                      key={cheat.id}
                      className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs space-y-1.5"
                    >
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <span>⚡ Rule: {cheat.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-800 font-mono">
                          {cheat.category}
                        </span>
                      </div>
                      <div className="text-slate-700 text-[11px] whitespace-pre-line leading-relaxed">
                        {cheat.description}
                      </div>
                      {cheat.ruleOfThumb && (
                        <div className="p-2 bg-amber-100/70 rounded border border-amber-300/60 text-[11px] text-amber-900 font-medium">
                          <span className="font-bold">Key Takeaway: </span>
                          {cheat.ruleOfThumb}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Algorithmic Flowchart */}
            {options.includeFlowchart && topic.flowchart && topic.flowchart.steps.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Workflow className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    5. Algorithmic Workflow &amp; Execution Pipeline
                  </h2>
                </div>
                <div className="space-y-2">
                  {topic.flowchart.steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{step.title}</span>
                          <span className="text-[10px] uppercase font-mono text-indigo-600 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                            {step.category}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{step.description}</p>
                        {step.details && (
                          <p className="text-slate-500 text-[10px] italic">{step.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Python Snippet */}
            {options.includeCode && topic.pythonSnippet?.code && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    6. Defensive Python Implementation Recipe ({topic.pythonSnippet.title})
                  </h2>
                </div>
                <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{topic.pythonSnippet.code}</code>
                </pre>
                {topic.pythonSnippet.explanation && (
                  <p className="text-slate-600 text-[11px] mt-1.5 italic">
                    {topic.pythonSnippet.explanation}
                  </p>
                )}
              </div>
            )}

            {/* 7. Case Study */}
            {options.includeCaseStudy && topic.caseStudy && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    7. Production Case Study ({topic.caseStudy.companyExample})
                  </h2>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900">
                    {topic.caseStudy.title} • {topic.caseStudy.industry}
                  </div>
                  <p className="text-slate-700 text-[11px]">
                    <strong className="text-slate-900">Problem: </strong>
                    {topic.caseStudy.problem}
                  </p>
                  <p className="text-slate-700 text-[11px]">
                    <strong className="text-slate-900">Outcome: </strong>
                    {topic.caseStudy.outcome}
                  </p>
                  <div className="p-2 bg-indigo-50 border border-indigo-200 rounded text-[11px] text-indigo-900 font-semibold">
                    Takeaway: {topic.caseStudy.keyTakeaway}
                  </div>
                </div>
              </div>
            )}

            {/* 8. Self-Assessment Quiz */}
            {options.includeQuiz && topic.quiz && topic.quiz.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-indigo-600 mb-2.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    8. Self-Assessment Practice Questions &amp; Answer Key
                  </h2>
                </div>
                <div className="space-y-3">
                  {topic.quiz.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="font-bold text-slate-900">
                        Q{idx + 1}. {q.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 pl-2">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx}>
                            <span className="font-bold text-slate-700 mr-1">
                              {String.fromCharCode(65 + oIdx)})
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-900">
                        <span className="font-bold">Correct Answer: </span>
                        Option {String.fromCharCode(65 + q.correctIndex)} — {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sheet Footer */}
            <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span>M.Tech Data Analytics Curriculum • {topic.title}</span>
              <span>Offline Revision Cheat Sheet • Generated {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
