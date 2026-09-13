import { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  Database,
  BarChart3,
  Binary,
  Brain,
  LineChart,
  Lightbulb,
  Workflow,
  Layers,
  Compass,
  Cpu,
  FileCode2,
  BookOpen,
  HelpCircle,
  Clock,
  Terminal,
} from 'lucide-react';
import { ConceptDetailModal } from './ConceptDetailModal';
import { LectureSlidesSection } from './LectureSlidesSection';

interface CourseOrientationViewProps {
  onStartCurriculum: () => void;
  onExploreLab: () => void;
  onSelectTopic: (subjectId: string, topicId: string) => void;
}

export const COURSE_OUTCOMES = [
  {
    id: 1,
    title: 'Foundational Analytics & Statistical Rigor',
    description:
      'Understand the foundational concepts of data analytics, including data types, preprocessing, and statistical analysis.',
    tags: ['Data Types', 'Structured Data', 'Semi-Structured Data', 'Unstructured Data', 'Data Preprocessing', 'ANOVA & Chi-Square'],
    targetTopic: { subjectId: 'data-analytics', topicId: 'data-types-fundamentals', label: 'Data Types (Structured, Semi, Unstructured)' },
    icon: Database,
    color: 'emerald',
  },
  {
    id: 2,
    title: 'Extracting Insights from Structured & Unstructured Data',
    description:
      'Apply analytical techniques to extract insights from structured and unstructured data.',
    tags: ['EDA & Visual Analytics', 'Text & Sentiment', 'Social Media Analytics', 'SQL & Tabular Stores'],
    targetTopic: { subjectId: 'data-visualization', topicId: 'eda-storytelling', label: 'EDA & Visual Storytelling' },
    icon: BarChart3,
    color: 'sky',
  },
  {
    id: 3,
    title: 'Real-World Machine Learning & Visualization',
    description:
      'Analyze real-world datasets using machine learning and visualization tools.',
    tags: ['K-Means Clustering', 'Decision Trees', 'Random Forests', 'D3 & Matplotlib Visuals'],
    targetTopic: { subjectId: 'data-analytics', topicId: 'clustering-kmeans', label: 'K-Means & ML Models' },
    icon: Brain,
    color: 'purple',
  },
  {
    id: 4,
    title: 'Model Evaluation & Decision-Making',
    description:
      'Evaluate the performance of data models and interpret results for decision-making.',
    tags: ['ROC-AUC', 'Confusion Matrix', 'Precision-Recall', 'Executive Stakeholder ROI'],
    targetTopic: { subjectId: 'machine-learning', topicId: 'classification-metrics', label: 'Model Evaluation (ROC/AUC)' },
    icon: Target,
    color: 'amber',
  },
  {
    id: 5,
    title: 'End-to-End Analytics Pipelines',
    description:
      'Create end-to-end data analytics pipelines using modern tools and frameworks.',
    tags: ['Scikit-Learn Pipelines', 'ColumnTransformers', 'Leakage-Free Validation', 'Time Series & Forecasting'],
    targetTopic: { subjectId: 'time-series', topicId: 'stationarity-arima', label: 'Time Series Pipelines' },
    icon: Workflow,
    color: 'rose',
  },
];

export function CourseOrientationView({
  onStartCurriculum,
  onExploreLab,
  onSelectTopic,
}: CourseOrientationViewProps) {
  const [activeTab, setActiveTab] = useState<'lecture-slides' | 'overview' | 'outcomes' | 'roadmap'>('lecture-slides');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner - Apple HIG Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 dark:from-slate-900 dark:via-indigo-950/80 dark:to-slate-900 light:from-white light:via-indigo-50/50 light:to-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-6 sm:p-8 lg:p-10 shadow-2xl light:shadow-md transition-all">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-indigo-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>M.Tech Advanced Data Analytics Curriculum</span>
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            <span className="font-mono text-[11px]">Course Launchpad</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight">
            Start of Course: Master Data Analytics from Core Theory to Production Pipelines
          </h1>

          <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed max-w-3xl">
            Welcome to the comprehensive M.Tech Data Analytics syllabus. This interactive learning hub combines
            mathematical rigor, step-by-step algorithmic flowcharts, runnable Python code, and interactive visual
            simulators mapped directly to the official course outcomes.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartCurriculum}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <span>Explore Curriculum Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreLab}
              className="px-5 py-2.5 rounded-xl bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-700/80 dark:border-slate-700 light:border-slate-300 transition cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Launch Interactive Lab (9 Simulators)</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          <div className="p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200">
            <div className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900 font-mono">5</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Core Course Outcomes</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">5</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">M.Tech Subjects</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200">
            <div className="text-2xl font-extrabold text-sky-400 font-mono">15</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">In-Depth Modules</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200">
            <div className="text-2xl font-extrabold text-purple-400 font-mono">9</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Interactive Simulators</div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs (Apple HIG Segmented Control) */}
      <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4">
        <div className="flex items-center gap-1.5 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 p-1.5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('lecture-slides')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'lecture-slides'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>1. Lecture Slides: Data Types & Daily Life Examples</span>
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>2. What is Data Analytics?</span>
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'outcomes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>3. Course Outcomes (CO 1 – 5)</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>4. Curriculum Architecture & Tech Stack</span>
          </button>
        </div>
      </div>

      {/* SECTION 0: LECTURE SLIDES MASTERCLASS & DAILY LIFE EXAMPLES */}
      {activeTab === 'lecture-slides' && (
        <LectureSlidesSection
          onExploreLab={onExploreLab}
          onSelectTopic={onSelectTopic}
        />
      )}

      {/* SECTION 1: WHAT IS DATA ANALYTICS? */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core Definition Card */}
            <div className="lg:col-span-2 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
                <Database className="w-5 h-5" />
                <h2 className="text-xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                  Understanding Data Analytics
                </h2>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  <strong>Data Analytics</strong> is the scientific discipline of analyzing raw data to extract meaningful
                  patterns, test hypotheses, draw statistical inferences, and drive quantifiable business and engineering
                  decisions. Rather than merely recording past transactions, data analytics converts latent signals into
                  predictive foresight and automated operational intelligence.
                </p>
                <p>
                  In high-performance engineering contexts (such as fintech risk scoring, algorithmic dispatch, and
                  telemetry monitoring), analytics encompasses the entire lifecycle:
                </p>
              </div>

              {/* Four Pillars of Analytics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold font-mono">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Descriptive Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-normal">
                    <em>&quot;What happened?&quot;</em> — Summarizing historical distributions through mean, variance, IQR,
                    histograms, and box plots.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Diagnostic Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-normal">
                    <em>&quot;Why did it happen?&quot;</em> — Root cause identification via hypothesis testing (ANOVA,
                    Chi-Square, t-tests) and correlation matrices.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold font-mono">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Predictive Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-normal">
                    <em>&quot;What will happen next?&quot;</em> — Supervised machine learning, Random Forests, ARIMA time
                    series, and LSTM forecasting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Prescriptive Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-normal">
                    <em>&quot;What action should we take?&quot;</em> — Queuing theory optimization (M/M/1), sensitivity
                    simulations, and decision-tree cost trade-offs.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary / Key Philosophy Card */}
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 shadow-xl light:shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                    The Modern Data Analyst Mindset
                  </h3>
                </div>

                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  Data analysis is no longer just running spreadsheet formulas. A top-tier Data Analyst must think like:
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white dark:text-white light:text-slate-900">A Statistician:</strong> Discerning
                      signal from noise and avoiding p-hacking.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white dark:text-white light:text-slate-900">A Software Engineer:</strong> Writing
                      modular Scikit-Learn transformers and avoiding target leakage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white dark:text-white light:text-slate-900">A Visual Storyteller:</strong> Crafting
                      accessible graphs adhering to Tufte data-ink principles.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white dark:text-white light:text-slate-900">A Strategic Decision Maker:</strong>{' '}
                      Translating ROC curves into bottom-line operational ROI.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/40 dark:bg-indigo-950/40 light:bg-indigo-50 border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200">
                <span className="text-[11px] font-mono text-indigo-300 dark:text-indigo-300 light:text-indigo-700 block mb-1">
                  Ready to start studying?
                </span>
                <button
                  onClick={() => setActiveTab('outcomes')}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Review All 5 Course Outcomes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* START OF COURSE: DATA TYPES FOUNDATION (Directly from Lecture Slide) */}
            <div className="lg:col-span-3 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 border border-emerald-500/30">
                      Core Lecture Module
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                      Start of Course Foundation
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    Data Types (Structured, Semi-Structured, Unstructured)
                  </h3>
                </div>

                <button
                  onClick={() => onSelectTopic('data-analytics', 'data-types-fundamentals')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
                >
                  <span>Study Topic & Open Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slide Definition */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                <strong className="text-white dark:text-white light:text-slate-900">Definition:</strong> Data types classify raw data based on its underlying structural format, schema enforcement, and storage organization.
              </div>

              {/* 3 Pillars from the Slide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                {/* Structured */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 hover:border-emerald-500/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono">1. Structured Data</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                      RDBMS / Tables
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    High-level organized data that adheres to a <strong>rigid, predefined schema</strong> and is stored in relational tables with rows and columns.
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Examples: PostgreSQL, MySQL, Parquet, Snowflake, CSV tables.
                  </div>
                </div>

                {/* Semi-Structured */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 hover:border-indigo-500/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 font-mono">2. Semi-Structured</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                      JSON / XML
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    Data that lacks a strict tabular schema but contains <strong>organizational markers, tags, or keys</strong> to separate data elements.
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Examples: JSON documents, XML payloads, MongoDB, DynamoDB.
                  </div>
                </div>

                {/* Unstructured */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 hover:border-purple-500/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 font-mono">3. Unstructured Data</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      80%+ of Volume
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    Data that has <strong>no predefined structure, schema, or organization</strong>, existing in its native raw binary or textual format.
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Examples: Natural text, audio waves, video, PDFs, vector embeddings.
                  </div>
                </div>
              </div>

              {/* Quick Link to Lecture Slides & Daily Life Examples */}
              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Looking for the lecture slide decks, multi-modal query comparisons, and daily life smartphone/grocery examples?
                </div>
                <button
                  onClick={() => setActiveTab('lecture-slides')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Lecture Slides &amp; Daily Life Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: COURSE OUTCOMES (CO 1 – CO 5) */}
      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 shadow-xl light:shadow-sm">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 border border-emerald-500/30">
                <Target className="w-3.5 h-3.5" />
                <span>Formal Course Syllabus Specifications</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
                Course Outcomes (CO)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                Upon successful completion of this syllabus, students will be able to demonstrate mastery of the following
                five core competencies:
              </p>
            </div>
          </div>

          {/* Outcomes Grid */}
          <div className="space-y-4">
            {COURSE_OUTCOMES.map((co) => {
              const IconComp = co.icon;
              return (
                <div
                  key={co.id}
                  className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-md hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 dark:bg-indigo-950/80 light:bg-indigo-100 border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-indigo-500/30">
                            CO {co.id}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-white dark:text-white light:text-slate-900">
                            {co.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                          <strong>Outcome:</strong> Students will be able to{' '}
                          <span className="text-indigo-300 dark:text-indigo-300 light:text-indigo-600 font-medium">
                            {co.description}
                          </span>
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {co.tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedConcept(tag)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-indigo-500 hover:bg-indigo-950/40 hover:text-indigo-300 transition cursor-pointer flex items-center gap-1.5"
                              title="Click for detailed answer, flowchart & diagram"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              <span>{tag}</span>
                              <span className="text-[10px] text-indigo-400 opacity-60">➔</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Direct Jump Button */}
                    <button
                      onClick={() => onSelectTopic(co.targetTopic.subjectId, co.targetTopic.topicId)}
                      className="shrink-0 px-4 py-2 rounded-xl bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white light:hover:bg-indigo-600 light:hover:text-white text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-700/80 dark:border-slate-700 light:border-slate-300 transition cursor-pointer"
                      title={`Jump to ${co.targetTopic.label}`}
                    >
                      <span>Study {co.targetTopic.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: CURRICULUM ARCHITECTURE & TECH STACK */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="w-5 h-5" />
              <h2 className="text-xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                M.Tech Course Architecture & Tool Ecosystem
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              The curriculum is organized into five structured subjects covering the complete lifecycle from ingestion to
              deep sequence models:
            </p>

            {/* Subject Roadmap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Subject 1: Data Analytics</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-950/50 text-emerald-300 border border-emerald-800/40 font-mono">
                    Core
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Data preprocessing, leakage prevention, ANOVA, Chi-Square, K-Means clustering, and social media text analytics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">Subject 2: Data Visualization</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-950/50 text-sky-300 border border-sky-800/40 font-mono">
                    Visuals
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Anscombe&apos;s Quartet, EDA distributions, box plots, interactive charts, and business intelligence reporting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Subject 3: Probability &amp; Statistics</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-950/50 text-indigo-300 border border-indigo-800/40 font-mono">
                    Theory
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Bayes&apos; Theorem, probability distributions (Normal, Poisson, Binomial), Central Limit Theorem, and M/M/1 queues.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400">Subject 4: Machine Learning</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-950/50 text-purple-300 border border-purple-800/40 font-mono">
                    Algorithms
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Classification models, ROC/AUC matrices, Decision Trees, Random Forests, and PCA dimensionality reduction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400">Subject 5: Time Series</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-950/50 text-rose-300 border border-rose-800/40 font-mono">
                    Forecasting
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Trend/seasonal decomposition, stationarity testing (ADF), ARIMA/SARIMA models, and deep LSTM recurrent cells.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-950/80 dark:from-indigo-950/60 dark:to-slate-950/80 light:from-indigo-100/50 light:to-slate-50 border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-white dark:text-white light:text-slate-900 block mb-1">
                    Ready to begin?
                  </span>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Select a topic to read the theory, inspect flowcharts, try simulators, and run tests.
                  </p>
                </div>
                <button
                  onClick={onStartCurriculum}
                  className="mt-3 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Launch Subject 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* POPUP MODAL ON DETAILED ANSWER WITH FLOWCHART / DIAGRAM */}
      {selectedConcept && (
        <ConceptDetailModal
          concept={selectedConcept}
          topicTitle="Course Outcome Competencies"
          subjectTitle="Data Analytics Syllabus"
          onClose={() => setSelectedConcept(null)}
        />
      )}
    </div>
  );
}
