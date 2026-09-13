import { useState, useMemo } from 'react';
import { CURRICULUM } from './data/curriculumData';
import { Subject, Topic } from './types/curriculum';
import { TopicDetailView } from './components/TopicDetailView';
import { CheatSheetsView } from './components/CheatSheetsView';
import { FlashcardsView } from './components/FlashcardsView';
import { CourseOrientationView } from './components/CourseOrientationView';
import { PipelineVisualizer } from './components/visualizers/PipelineVisualizer';
import { KMeansVisualizer } from './components/visualizers/KMeansVisualizer';
import { ConfusionMatrixVisualizer } from './components/visualizers/ConfusionMatrixVisualizer';
import { DistributionsVisualizer } from './components/visualizers/DistributionsVisualizer';
import { QueuingVisualizer } from './components/visualizers/QueuingVisualizer';
import { TimeSeriesVisualizer } from './components/visualizers/TimeSeriesVisualizer';
import { LSTMVisualizer } from './components/visualizers/LSTMVisualizer';
import { DecisionTreeVisualizer } from './components/visualizers/DecisionTreeVisualizer';
import { EDAVisualizer } from './components/visualizers/EDAVisualizer';
import { DataTypesVisualizer } from './components/visualizers/DataTypesVisualizer';
import { useTheme } from './context/ThemeContext';
import { useProgress } from './context/ProgressContext';
import {
  GraduationCap,
  BookOpen,
  Cpu,
  FileText,
  RotateCw,
  Search,
  ChevronRight,
  CheckCircle,
  CheckCircle2,
  Circle,
  Check,
  Sun,
  Moon,
  Sparkles,
  BarChart3,
  Layers,
  Database,
  LineChart,
  Brain,
  Binary,
  ArrowRight,
  Compass,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft,
  Maximize2,
  Target,
} from 'lucide-react';

type MainView = 'course-start' | 'curriculum' | 'lab' | 'cheatsheet' | 'flashcards';

export default function App() {
  const [currentView, setCurrentView] = useState<MainView>('course-start');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(CURRICULUM[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(CURRICULUM[0].topics[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeLabSimulator, setActiveLabSimulator] = useState<string>('pipeline');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Theme & Progress contexts
  const { theme, toggleTheme } = useTheme();
  const {
    completedTopicIds,
    toggleTopicCompleted,
    isTopicCompleted,
    completedCount,
    totalTopics,
    overallPercentage,
    getSubjectStats,
    resetProgress,
  } = useProgress();

  // Currently selected subject & topic
  const currentSubject = CURRICULUM.find((s) => s.id === selectedSubjectId) || CURRICULUM[0];
  const currentTopic =
    currentSubject.topics.find((t) => t.id === selectedTopicId) || currentSubject.topics[0];

  // Flat list of all topics across all subjects for previous/next stepping
  const allFlatTopics = useMemo(() => {
    const list: { topic: Topic; subjectId: string }[] = [];
    CURRICULUM.forEach((sub) => {
      sub.topics.forEach((top) => {
        list.push({ topic: top, subjectId: sub.id });
      });
    });
    return list;
  }, []);

  const currentIndex = allFlatTopics.findIndex((item) => item.topic.id === selectedTopicId);
  const prevTopicInfo = currentIndex > 0 ? allFlatTopics[currentIndex - 1] : undefined;
  const nextTopicInfo =
    currentIndex < allFlatTopics.length - 1 ? allFlatTopics[currentIndex + 1] : undefined;

  // Subject Icons mapper
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-sky-400" />;
      case 'Binary':
        return <Binary className="w-4 h-4 text-indigo-400" />;
      case 'Brain':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'LineChart':
        return <LineChart className="w-4 h-4 text-rose-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  // Search filter across curriculum topics
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: { subject: Subject; topic: Topic }[] = [];

    CURRICULUM.forEach((s) => {
      s.topics.forEach((t) => {
        if (
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.keyConcepts.some((c) => c.toLowerCase().includes(q))
        ) {
          results.push({ subject: s, topic: t });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const handleSelectTopic = (subjectId: string, topicId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(topicId);
    setCurrentView('curriculum');
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  return (
    <div
      id="app-root"
      className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 ${
        theme === 'light' ? 'theme-light bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Navigation Bar - Apple Translucent Frosted Glass */}
      <header className="sticky top-0 z-40 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/80 backdrop-blur-xl border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Apple-style sidebar toggle for curriculum view */}
            {currentView === 'curriculum' && (
              <button
                id="sidebar-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition cursor-pointer"
                title={sidebarOpen ? 'Collapse sidebar for more screen space' : 'Show syllabus sidebar'}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              </button>
            )}

            <div
              onClick={() => {
                setCurrentView('curriculum');
                setSelectedSubjectId(CURRICULUM[0].id);
                setSelectedTopicId(CURRICULUM[0].topics[0].id);
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                    Data Analyst Hub
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                    M.Tech
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono hidden sm:block">
                  Visual Curriculum • Interactive Simulators • Flowcharts
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar (Apple minimalist input) */}
          <div className="relative flex-1 max-w-sm hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, algorithms, flowcharts..."
              className="w-full bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />

            {/* Dropdown Live Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-10 bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50 p-2 space-y-1">
                {searchResults.map(({ subject, topic }) => (
                  <button
                    key={topic.id}
                    onClick={() => handleSelectTopic(subject.id, topic.id)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-white dark:text-white light:text-slate-900">
                        {topic.title}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                        {subject.title}
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs (Apple HIG segmented styling) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-1 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <button
              onClick={() => setCurrentView('course-start')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'course-start'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" /> Start of Course (CO 1–5)
            </button>
            <button
              onClick={() => setCurrentView('curriculum')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'curriculum'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Syllabus Curriculum
            </button>
            <button
              onClick={() => setCurrentView('lab')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'lab'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Interactive Lab
            </button>
            <button
              onClick={() => setCurrentView('cheatsheet')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'cheatsheet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Cheat Sheets
            </button>
            <button
              onClick={() => setCurrentView('flashcards')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                currentView === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" /> Flashcards
            </button>
          </nav>

          {/* Header Action Controls: Theme Switcher + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center gap-2 text-xs font-semibold transition shadow-sm cursor-pointer"
              title={
                theme === 'dark'
                  ? 'Switch to daytime high-contrast light mode'
                  : 'Switch to slate-950 night study mode'
              }
              aria-label="Toggle study theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 dark:bg-slate-900 light:bg-white border-b border-slate-800 dark:border-slate-800 light:border-slate-200 px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setCurrentView('course-start');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                currentView === 'course-start' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-400" /> Start of Course (CO 1–5)
            </button>
            <button
              onClick={() => {
                setCurrentView('curriculum');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                currentView === 'curriculum' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Syllabus Curriculum
            </button>
            <button
              onClick={() => {
                setCurrentView('lab');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                currentView === 'lab' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" /> Interactive Lab
            </button>
            <button
              onClick={() => {
                setCurrentView('cheatsheet');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                currentView === 'cheatsheet' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" /> Cheat Sheets
            </button>
            <button
              onClick={() => {
                setCurrentView('flashcards');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                currentView === 'flashcards' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
              }`}
            >
              <RotateCw className="w-4 h-4" /> Flashcards
            </button>

            {/* Mobile Theme Switcher */}
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/80 dark:border-slate-700 light:border-slate-200 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
                <span>
                  Theme: {theme === 'dark' ? 'Slate-950 Dark (Night)' : 'High-Contrast Light (Day)'}
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Toggle</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Viewport Container - Expanded to max-w-[1600px] for high-space view */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-8 py-5">
        {/* VIEW 0: START OF COURSE - WHAT IS DATA ANALYTICS & COURSE OUTCOMES */}
        {currentView === 'course-start' && (
          <CourseOrientationView
            onStartCurriculum={() => setCurrentView('curriculum')}
            onExploreLab={() => setCurrentView('lab')}
            onSelectTopic={(subjectId, topicId) => {
              setSelectedSubjectId(subjectId);
              setSelectedTopicId(topicId);
              setCurrentView('curriculum');
            }}
          />
        )}

        {/* VIEW 1: CURRICULUM SUBJECTS & TOPICS */}
        {currentView === 'curriculum' && (
          <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
            {/* Left Sidebar Curriculum Navigation & Progress Bar */}
            {sidebarOpen && (
              <aside className="w-full lg:w-80 lg:shrink-0 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-4 md:p-5 space-y-4 shadow-xl light:shadow-sm transition-all">
                {/* Header Title with Collapse Button */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700">
                      Curriculum Map
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                      5 M.Tech Subjects
                    </span>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="hidden lg:block p-1 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      title="Collapse sidebar to expand reading area"
                    >
                      <PanelLeftClose className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* OVERALL CURRICULUM PROGRESS BAR CARD */}
                <div className="bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800">
                        Curriculum Progress
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      {overallPercentage}%
                    </span>
                  </div>

                  {/* Animated Progress Bar Track */}
                  <div className="w-full h-2.5 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded-full overflow-hidden border border-slate-700/40 relative">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${overallPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600">
                    <span>
                      <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800">
                        {completedCount}
                      </strong>{' '}
                      of {totalTopics} Topics Completed
                    </span>
                    {completedCount > 0 && (
                      <button
                        onClick={resetProgress}
                        className="text-[10px] text-slate-500 hover:text-rose-400 underline transition cursor-pointer"
                        title="Reset topic completion checklist"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Subjects Accordion / List */}
                <div className="space-y-2.5">
                  {CURRICULUM.map((subject) => {
                    const isSubjectSelected = subject.id === selectedSubjectId;
                    const subjectStats = getSubjectStats(subject.id);
                    const isAllDone =
                      subjectStats.completed === subjectStats.total && subjectStats.total > 0;

                    return (
                      <div
                        key={subject.id}
                        className="rounded-xl border border-slate-800/80 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 transition-all"
                      >
                        {/* Subject Button */}
                        <button
                          onClick={() => {
                            setSelectedSubjectId(subject.id);
                            setSelectedTopicId(subject.topics[0].id);
                          }}
                          className={`w-full text-left p-3 flex items-center justify-between transition cursor-pointer ${
                            isSubjectSelected
                              ? 'bg-indigo-950/40 dark:bg-indigo-950/40 light:bg-indigo-50 text-white dark:text-white light:text-slate-900 font-bold'
                              : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-900/60 dark:hover:bg-slate-900/60 light:hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {getSubjectIcon(subject.iconName)}
                            <span className="text-xs truncate">{subject.title}</span>
                          </div>

                          {/* Subject Progress Status Badge */}
                          <div className="flex items-center gap-2 shrink-0">
                            {isAllDone ? (
                              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-400" />
                                Done
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 px-1.5 py-0.5 rounded bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                                {subjectStats.completed}/{subjectStats.total}
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Topic Sublist (when subject is selected) */}
                        {isSubjectSelected && (
                          <div className="p-2 space-y-1 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border-t border-slate-800/80 dark:border-slate-800 light:border-slate-200">
                            {subject.topics.map((topic) => {
                              const isTopicSelected = topic.id === selectedTopicId;
                              const isCompleted = isTopicCompleted(topic.id);

                              return (
                                <div
                                  key={topic.id}
                                  className={`w-full rounded-lg text-xs transition flex items-center justify-between group ${
                                    isTopicSelected
                                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-slate-100'
                                  }`}
                                >
                                  <button
                                    onClick={() => setSelectedTopicId(topic.id)}
                                    className="flex-1 text-left px-2.5 py-2 flex items-center gap-2 truncate cursor-pointer"
                                  >
                                    {/* Clickable Completion Checkbox */}
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTopicCompleted(topic.id);
                                      }}
                                      className={`p-0.5 rounded hover:scale-110 transition cursor-pointer shrink-0 ${
                                        isCompleted
                                          ? 'text-emerald-400'
                                          : isTopicSelected
                                          ? 'text-indigo-200 hover:text-white'
                                          : 'text-slate-500 hover:text-slate-300'
                                      }`}
                                      title={
                                        isCompleted
                                          ? 'Completed! Click to unmark'
                                          : 'Click to mark as complete'
                                      }
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-400" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5" />
                                      )}
                                    </span>

                                    <span
                                      className={`truncate ${
                                        isCompleted && !isTopicSelected
                                          ? 'text-slate-300 dark:text-slate-300 light:text-slate-800'
                                          : ''
                                      }`}
                                    >
                                      {topic.title}
                                    </span>
                                  </button>

                                  {topic.interactiveType && (
                                    <Cpu
                                      className={`w-3 h-3 shrink-0 mr-2.5 ${
                                        isTopicSelected ? 'text-indigo-200' : 'text-indigo-400'
                                      }`}
                                      title="Includes Interactive Visualizer"
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </aside>
            )}

            {/* Right Topic Detail Content Area */}
            <div className="flex-1 min-w-0 w-full">
              {/* If sidebar is collapsed, show quick banner button to re-open */}
              {!sidebarOpen && (
                <div className="mb-4 flex items-center justify-between bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/80 dark:border-slate-800 light:border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center gap-2 text-xs font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 hover:text-indigo-300 transition cursor-pointer"
                  >
                    <PanelLeft className="w-4 h-4" />
                    <span>Show Syllabus Sidebar</span>
                  </button>
                  <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                    Spacious Reading & Simulator Canvas Enabled
                  </span>
                </div>
              )}

              <TopicDetailView
                topic={currentTopic}
                subject={currentSubject}
                onNavigateTopic={handleSelectTopic}
                isCompleted={isTopicCompleted(currentTopic.id)}
                onToggleComplete={toggleTopicCompleted}
                nextTopic={nextTopicInfo}
                prevTopic={prevTopicInfo}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE LAB (All visualizers in one workbench) */}
        {currentView === 'lab' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 md:p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 dark:text-indigo-300 light:text-indigo-600 border border-indigo-500/30">
                    Interactive Visualizations Workbench
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                    9 Mathematical & Algorithmic Simulators
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-1">
                  Interactive Simulation Lab
                </h2>
                <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
                  Direct hands-on experimentation with parameters, mathematical limits, and visual algorithms.
                </p>
              </div>

              {/* Simulator Selector (Apple segmented control) */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
                {[
                  { id: 'data_types', label: 'Data Types' },
                  { id: 'pipeline', label: 'Data Pipeline' },
                  { id: 'kmeans', label: 'K-Means' },
                  { id: 'confusion', label: 'ROC / Matrix' },
                  { id: 'distributions', label: 'Distributions' },
                  { id: 'queuing', label: 'M/M/1 Queuing' },
                  { id: 'timeseries', label: 'Time Series' },
                  { id: 'lstm', label: 'LSTM Cell' },
                  { id: 'decision_tree', label: 'Decision Tree' },
                  { id: 'eda', label: 'EDA Suite' },
                ].map((sim) => (
                  <button
                    key={sim.id}
                    onClick={() => setActiveLabSimulator(sim.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activeLabSimulator === sim.id
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                    }`}
                  >
                    {sim.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Visualizer Render */}
            <div>
              {activeLabSimulator === 'data_types' && <DataTypesVisualizer />}
              {activeLabSimulator === 'pipeline' && <PipelineVisualizer />}
              {activeLabSimulator === 'kmeans' && <KMeansVisualizer />}
              {activeLabSimulator === 'confusion' && <ConfusionMatrixVisualizer />}
              {activeLabSimulator === 'distributions' && <DistributionsVisualizer />}
              {activeLabSimulator === 'queuing' && <QueuingVisualizer />}
              {activeLabSimulator === 'timeseries' && <TimeSeriesVisualizer />}
              {activeLabSimulator === 'lstm' && <LSTMVisualizer />}
              {activeLabSimulator === 'decision_tree' && <DecisionTreeVisualizer />}
              {activeLabSimulator === 'eda' && <EDAVisualizer />}
            </div>
          </div>
        )}

        {/* VIEW 3: CHEAT SHEETS */}
        {currentView === 'cheatsheet' && <CheatSheetsView />}

        {/* VIEW 4: FLASHCARDS */}
        {currentView === 'flashcards' && <FlashcardsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white py-6 text-center text-xs text-slate-500 dark:text-slate-500 light:text-slate-600">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Data Analyst M.Tech Self-Study Hub • Comprehensive Electives & Core Syllabus</span>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
            Apple Design Standards • Interactive Visualizations • Algorithmic Flowcharts
          </span>
        </div>
      </footer>
    </div>
  );
}
