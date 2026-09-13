import React, { useState } from 'react';
import {
  Database,
  FileCode,
  FileText,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  ShoppingCart,
  Car,
  Activity,
  HardDrive,
  Cpu,
  Terminal,
  Zap,
  HelpCircle,
  Video,
  Image as ImageIcon,
  Mic,
  Table as TableIcon,
  ChevronRight,
  Sliders,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';

interface LectureSlidesSectionProps {
  onExploreLab?: () => void;
  onSelectTopic?: (subjectId: string, topicId: string) => void;
}

type SlideId = 1 | 2 | 3 | 4 | 5;
type DailyLifeDomain = 'smartphone' | 'supermarket' | 'rideshare' | 'hospital';

export const LectureSlidesSection: React.FC<LectureSlidesSectionProps> = ({
  onExploreLab,
  onSelectTopic,
}) => {
  const [currentSlide, setCurrentSlide] = useState<SlideId>(3); // Default to Slide 3 (Core Data Types)
  const [viewMode, setViewMode] = useState<'deck' | 'grid' | 'daily-life'>('deck');
  const [activeDailyDomain, setActiveDailyDomain] = useState<DailyLifeDomain>('smartphone');
  const [selectedFeatureType, setSelectedFeatureType] = useState<'discrete' | 'continuous' | 'nominal' | 'ordinal'>('discrete');

  // Slide Information metadata based directly on the lecture images
  const SLIDES = [
    {
      id: 1 as SlideId,
      number: 'Slide 1',
      title: 'Querying Techniques, Enterprise Volume & Hospital EMR Case',
      badge: 'Advanced Comparison',
      color: 'from-amber-500/20 via-sky-500/20 to-purple-500/20',
      summary: 'Comparison of query mechanisms (SQL vs JSONPath vs Vector Embeddings), 80-90% enterprise volume dominance, and the Hospital EMR system case study.',
    },
    {
      id: 2 as SlideId,
      number: 'Slide 2',
      title: 'Data Storage & File Formats',
      badge: 'Storage & Serialization',
      color: 'from-orange-500/20 via-emerald-500/20 to-sky-500/20',
      summary: 'Storage formats: Relational RDBMS (PostgreSQL, MySQL, Parquet) vs JSON/XML/YAML vs unstructured text, PDFs, MP4 video, and audio waves.',
    },
    {
      id: 3 as SlideId,
      number: 'Slide 3',
      title: 'Data Types Foundation: Structured, Semi-Structured, Unstructured',
      badge: 'Core Architectural Pillars',
      color: 'from-emerald-500/20 via-indigo-500/20 to-purple-500/20',
      summary: 'The formal definition of data types and the 3 architectural archetypes: Schema-on-Write tables, self-describing key-value payloads, and native binary files.',
    },
    {
      id: 4 as SlideId,
      number: 'Slide 4',
      title: 'Raw Data Nature, Quantitative vs Qualitative & Operational Pillars',
      badge: 'Data Characteristics',
      color: 'from-orange-500/20 via-green-500/20 to-blue-500/20',
      summary: 'Why raw data is noisy and incomplete, distinction between numerical vs categorical data, and the 3 pillars: Signal vs Noise, Scalability, and System Integration.',
    },
    {
      id: 5 as SlideId,
      number: 'Slide 5',
      title: 'Data Analytics Basics, Purpose & The 7-Stage Lifecycle',
      badge: 'Course Launchpad',
      color: 'from-orange-500/20 via-emerald-500/20 to-purple-500/20',
      summary: 'The formal discipline of Data Analytics, operational problem solving, purpose in converting raw signals, and the end-to-end 7-stage data lifecycle.',
    },
  ];

  // Daily Life Scenarios Data
  const DAILY_LIFE_SCENARIOS = {
    smartphone: {
      title: 'Your Daily Smartphone & Morning Routine',
      icon: Smartphone,
      tag: 'Everyday Personal Tech',
      context: 'Think about how you interact with your phone from the moment you wake up. Data is constantly generated in three fundamentally different formats:',
      structured: {
        title: 'Structured: Alarms & Battery Ledger',
        format: 'SQL Table / Numbers / Timestamps',
        examples: [
          'Alarm clock setting: Exactly 07:00 AM (Fixed Time format)',
          'Battery percentage: 84% (Integer bound between 0 and 100)',
          'Contact phonebook list: [Name, Phone_Number, Email]',
          'Bank balance ledger: $248.50 at Coffee Shop at 08:15 AM',
        ],
        why: 'Everything fits neatly into fixed columns and rows with rigid data types (Integers, Decimals, Dates). A calculation like "Average battery drain per hour" can be run with standard SQL in milliseconds.',
      },
      semiStructured: {
        title: 'Semi-Structured: Food Delivery & WhatsApp Chat',
        format: 'JSON Payload / Key-Value Tags',
        examples: [
          'DoorDash order receipt: Order #4829 has 2 burgers with extra cheese, while Order #4830 has 1 salad with no dressing. Each order has key-value tags like { "item": "Burger", "toppings": ["cheese"], "special_note": "ring bell" }.',
          'WhatsApp chat export: { "timestamp": "08:16:02", "sender": "Alex", "message": "On my way!", "reactions": ["👍", "❤️"] }.',
        ],
        why: 'There is no rigid row/column constraint. Every food order has different toppings, sides, and notes. Key-value tags and curly braces organize the data without locking it into an unchangeable database table.',
      },
      unstructured: {
        title: 'Unstructured: Selfies, Voice Notes & TikTok Reels',
        format: 'Raw Binary / Pixels / Audio Waveforms',
        examples: [
          'Selfie photo taken in the morning (JPEG binary pixels, 4032 × 3024 RGB matrix)',
          'A 20-second audio voice note sent to your friend: "Hey, do you want to grab lunch?" (WAV audio waveform)',
          'A 15-second TikTok or Instagram Reel you watch (MP4 video compressed byte stream)',
        ],
        why: 'There are NO tables, NO columns, and NO tags inside the file describing what is in the picture. A computer cannot use SQL to ask "Is the person smiling?"—it requires deep learning computer vision or speech-to-text models.',
      },
    },
    supermarket: {
      title: 'Going to the Supermarket & Grocery Shopping',
      icon: ShoppingCart,
      tag: 'Retail & Commerce',
      context: 'When you step into a grocery store, data flows from checkout registers, packaged boxes, and security cameras:',
      structured: {
        title: 'Structured: Cash Register Receipt',
        format: 'Relational Tabular Receipt',
        examples: [
          'The paper checkout receipt table printed at the cash register:',
          'Column headers: [Item_Barcode, Item_Description, Quantity, Unit_Price, Total_Tax]',
          'Example row: [890123, "Almond Milk 1L", 2, $3.99, $0.64]',
        ],
        why: 'Every item scanned at the register must conform to this exact tabular schema. The store manager can immediately run `SELECT SUM(total_price) FROM sales WHERE date = CURRENT_DATE`.',
      },
      semiStructured: {
        title: 'Semi-Structured: Product Nutrition Facts Label',
        format: 'Tagged Ingredients & Nutrition Keys',
        examples: [
          'The Nutrition Facts panel on food packaging:',
          '{ "brand": "Organic Oats", "servings": 8, "calories": 150, "allergens": ["Gluten"], "vitamins": { "vitamin_d_pct": 10, "calcium_pct": 20 } }',
          'Notice how an apple has simple tags, while cereal has a deeply nested vitamin breakdown.',
        ],
        why: 'Different food products have completely different nutritional fields (meat has protein/fat, vitamins have complex mineral lists). JSON/XML documents accommodate this polymorphism naturally.',
      },
      unstructured: {
        title: 'Unstructured: Store CCTV & Speaking with the Clerk',
        format: 'Video Stream & Acoustic Human Speech',
        examples: [
          'CCTV security camera streaming 24 FPS video of the grocery aisles',
          'A shopper speaking to the deli clerk: "Could you slice half a pound of smoked turkey extra thin?" (human acoustic sound waves)',
          'Handwritten shopping list scribbled on a torn piece of paper in your pocket',
        ],
        why: 'The security video is a raw stream of color pixels. To count shoppers or detect a spilled jar in an aisle, automated computer vision object detection must extract features from the raw visual feed.',
      },
    },
    rideshare: {
      title: 'Ride-Sharing & Daily Commute (Uber / Lyft)',
      icon: Car,
      tag: 'Transportation & Logistics',
      context: 'Booking a ride home from university or work touches transactional databases, real-time GPS telemetry, and multimedia:',
      structured: {
        title: 'Structured: Completed Ride Billing Ledger',
        format: 'PostgreSQL Relational Ledger',
        examples: [
          'Trip Record: [Trip_ID: 98124, Driver_ID: 4421, Distance_Miles: 6.2, Duration_Mins: 18, Base_Fare: $14.50, Tip: $3.00, Total_Paid: $17.50]',
        ],
        why: 'Strict accounting rules require exact numeric decimals for financial compliance. Schema-on-Write prevents corrupt entries like string values in the fare column.',
      },
      semiStructured: {
        title: 'Semi-Structured: Real-Time GPS Telemetry Stream',
        format: 'WebSocket JSON Payload',
        examples: [
          'Every 1000 milliseconds, the car transmits a telematics packet:',
          '{ "driver_id": 4421, "coords": { "lat": 37.7749, "lng": -122.4194, "bearing_deg": 185.4 }, "telemetry": { "speed_mph": 32.5, "battery_pct": 74 } }',
        ],
        why: 'Different vehicles report different telemetry (electric cars report battery %, gas cars report fuel level). The semi-structured JSON packet dynamically adapts without altering database tables.',
      },
      unstructured: {
        title: 'Unstructured: Dashcam Video & Voice Navigation',
        format: 'H.264 Video & Spoken Audio Queries',
        examples: [
          'The driver\'s front dashcam recording high-definition video of road conditions and street signs',
          'The driver giving a voice command: "Hey Siri, navigate to Central Station avoiding tolls" (continuous speech waveform)',
          'Free-text written passenger review: "Great music, smooth ride, but took the bridge detour."',
        ],
        why: 'Natural speech and driving video contain rich information that must be transcribed by NLP (sentiment analysis) or vision models (lane detection) before numerical analysis can occur.',
      },
    },
    hospital: {
      title: 'Hospital & Healthcare Visit (Lecture Slide Case Study)',
      icon: Activity,
      tag: 'Teacher Slide 1 Real-World Case',
      context: 'In modern hospital Electronic Medical Records (EMR), patient health spans three coordinated data pipelines:',
      structured: {
        title: 'Structured: Patient Admission Demographics',
        format: 'Relational Database (SQL Table)',
        examples: [
          'Patient Record: [Patient_MRN: 104928, Age: 38, Gender: "Female", Blood_Type: "O+", Admission_Date: "2026-09-12"]',
        ],
        why: 'Patient identifiers and basic demographic categories must follow strict schema integrity for billing, insurance, and medical records lookup.',
      },
      semiStructured: {
        title: 'Semi-Structured: Diagnostic Lab Blood Panel (API)',
        format: 'JSON / HL7 / FHIR Payload',
        examples: [
          '{ "test_name": "Comprehensive Metabolic Panel", "timestamp": "2026-09-12T14:30:00Z", "results": { "glucose_mg_dl": 92, "creatinine": 0.85, "sodium_mmol_l": 139 }, "flags": ["normal"] }',
        ],
        why: 'Different diagnostic tests measure completely different biomarkers (a lipid panel has cholesterol, a blood gas test has pH and pO2). JSON allows flexible medical telemetry without thousands of empty columns.',
      },
      unstructured: {
        title: 'Unstructured: Chest X-Ray & Doctor Voice Notes',
        format: 'DICOM Binary Images & Audio Dictation',
        examples: [
          'Chest Radiograph X-Ray / CT Scan (DICOM medical image format with high-density grayscale pixels)',
          'Physician voice dictation recorded during rounds: "Patient presents with mild wheezing, lungs clear upon auscultation, follow up in 2 weeks" (audio WAV binary)',
        ],
        why: 'Medical imaging and audio notes comprise the majority of clinical data volume. Deep learning CNNs and Medical LLMs extract diagnostic features from these raw files.',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER: LECTURE MASTERCLASS */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 dark:from-slate-900 dark:via-indigo-950/70 dark:to-slate-900 light:from-white light:via-indigo-50 light:to-white border border-indigo-500/30 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Lecture Slides Masterclass (All 5 Slides)
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                Data Types &amp; Foundations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight flex items-center gap-2.5">
              <Database className="w-7 h-7 text-emerald-400" />
              <span>Data Types &amp; Daily Life Data Analytics</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-4xl leading-relaxed">
              Explore the exact foundational curriculum taught in your lecture: Structured, Semi-Structured, and Unstructured data archetypes, storage formats, querying mechanics, raw data characteristics, and everyday daily life examples.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onExploreLab && (
              <button
                onClick={onExploreLab}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-emerald-300" />
                <span>Open Interactive Simulator</span>
              </button>
            )}
            {onSelectTopic && (
              <button
                onClick={() => onSelectTopic('data-analytics', 'data-types-fundamentals')}
                className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-700 dark:border-slate-700 light:border-slate-300 transition cursor-pointer"
              >
                <span>Study Topic Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* View Mode Switcher Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          <div className="flex items-center gap-1.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <button
              onClick={() => setViewMode('deck')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Step-by-Step Slide Deck (1 to 5)</span>
            </button>
            <button
              onClick={() => setViewMode('daily-life')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'daily-life'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Daily Life Examples Explorer</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 5 Slides Grid View</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
            Source: M.Tech Data Analytics Lecture Series
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: STEP-BY-STEP SLIDE DECK */}
      {viewMode === 'deck' && (
        <div className="space-y-4">
          {/* Slide Deck Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-3 shadow-md">
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(slide.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                    currentSlide === slide.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-200 flex items-center justify-center text-[10px] font-mono">
                    {slide.id}
                  </span>
                  <span className="hidden sm:inline">{slide.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-3">
              <button
                disabled={currentSlide === 1}
                onClick={() => setCurrentSlide((prev) => Math.max(1, prev - 1) as SlideId)}
                className="p-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                title="Previous Slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 px-2">
                {currentSlide} / 5
              </span>
              <button
                disabled={currentSlide === 5}
                onClick={() => setCurrentSlide((prev) => Math.min(5, prev + 1) as SlideId)}
                className="p-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                title="Next Slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACTIVE SLIDE DISPLAY CARD */}
          <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-6">
            {/* Header of Active Slide */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-indigo-500/30">
                    Lecture Slide {currentSlide} of 5
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {SLIDES[currentSlide - 1].badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                  {SLIDES[currentSlide - 1].title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('daily-life')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 dark:bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>See Daily Life Examples</span>
                </button>
              </div>
            </div>

            {/* SLIDE 1 CONTENT */}
            {currentSlide === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Querying Techniques */}
                  <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-sky-400">
                      <Search className="w-4 h-4" />
                      <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                        Querying Techniques by Data Type
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <li className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                        <strong className="text-emerald-400 font-mono">Structured Data:</strong> Queried using standard declarative SQL (SELECT, JOIN, GROUP BY, WHERE). Fast B-tree indexed lookups.
                      </li>
                      <li className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                        <strong className="text-indigo-400 font-mono">Semi-Structured Data:</strong> Queried using path-based accessors (JSONPath, XPath, MongoDB Aggregation Framework `$unwind`).
                      </li>
                      <li className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                        <strong className="text-purple-400 font-mono">Unstructured Data:</strong> Requires Deep Learning neural encoders, NLP transformers, Whisper speech-to-text, or Computer Vision feature extractors generating dense vector embeddings.
                      </li>
                    </ul>
                  </div>

                  {/* Enterprise Volume Ratio & Processing Differences */}
                  <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-purple-400">
                      <PieChartIcon className="w-4 h-4" />
                      <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                        Enterprise Volume Ratio &amp; Processing Pipelines
                      </h4>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                        <span>Unstructured Data Enterprise Ratio</span>
                        <span className="font-mono text-sm">80% – 90%</span>
                      </div>
                      <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600">
                        Over 80% to 90% of newly generated enterprise data is unstructured (customer calls, PDFs, video feeds, telemetry logs). It requires the highest computational effort to parse.
                      </p>
                    </div>

                    <div className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed pt-1">
                      <strong className="text-white dark:text-white light:text-slate-900">Pipeline Differences:</strong> Structured data moves directly to analytics engines, whereas unstructured data requires intermediate feature extraction steps (tokenization, vector embeddings) before statistical modeling.
                    </div>
                  </div>
                </div>

                {/* Real-World Slide Case Study: Hospital EMR System */}
                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-950/50 via-slate-950/70 to-slate-950/80 dark:from-indigo-950/50 dark:via-slate-950/70 dark:to-slate-950/80 light:from-indigo-50 light:to-white border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 font-bold text-sm">
                      <Activity className="w-4 h-4 text-rose-400" />
                      <span>Lecture Slide Case Study: Hospital Electronic Medical Records (EMR)</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                      Multi-Modal Architecture
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    How does a premier hospital manage its data across all three archetypes simultaneously?
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-emerald-400 font-mono">1. Structured Data</span>
                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                        Patient demographic records stored in SQL tables: <code>[Patient_ID, Age, Gender, Admission_Date]</code>.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-indigo-400 font-mono">2. Semi-Structured Data</span>
                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                        Diagnostic lab results transmitted via HL7/FHIR API in <strong>JSON payloads</strong> with polymorphic test panels.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-purple-400 font-mono">3. Unstructured Data</span>
                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                        Chest X-Ray radiographs (DICOM binaries) and physician voice memos dictated during morning rounds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2 CONTENT: STORAGE & FORMATS */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  Different data types dictate specific database engines, file serialization protocols, and compression codecs:
                </p>

                {/* The 3 Slide Cards: Orange, Green, Blue */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Structured Formats - Orange/Amber Card */}
                  <div className="p-5 rounded-2xl bg-amber-950/20 dark:bg-amber-950/20 light:bg-amber-50/60 border border-amber-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 dark:text-amber-400 light:text-amber-600 font-bold text-sm">
                      <Database className="w-4 h-4" />
                      <span>Structured Formats</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Commonly stored in <strong>relational databases</strong> (PostgreSQL, MySQL, Oracle, SQL Server) and <strong>flat tabular columnar files</strong> (CSV, TSV, Apache Parquet).
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-amber-300 dark:text-amber-300 light:text-amber-700">
                      RDBMS • ACID • Parquet • CSV • Schema-on-Write
                    </div>
                  </div>

                  {/* Semi-Structured Formats - Green Card */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/60 border border-emerald-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-bold text-sm">
                      <FileCode className="w-4 h-4" />
                      <span>Semi-Structured Formats</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Typically formatted in <strong>JavaScript Object Notation (JSON)</strong>, <strong>Extensible Markup Language (XML)</strong>, or <strong>YAML</strong> files with hierarchical keys.
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-emerald-300 dark:text-emerald-300 light:text-emerald-700">
                      JSON • XML • YAML • MongoDB • Schema-on-Read
                    </div>
                  </div>

                  {/* Unstructured Formats - Blue Card */}
                  <div className="p-5 rounded-2xl bg-sky-950/20 dark:bg-sky-950/20 light:bg-sky-50/60 border border-sky-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-sky-400 dark:text-sky-400 light:text-sky-600 font-bold text-sm">
                      <HardDrive className="w-4 h-4" />
                      <span>Unstructured Formats</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Includes <strong>plain text documents</strong>, PDFs, digital images (JPEG, PNG), video streams (MP4), audio files (WAV, MP3), and raw binary dumps.
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-sky-300 dark:text-sky-300 light:text-sky-700">
                      Text • PDF • JPEG • MP4 • Audio • Vector DBs
                    </div>
                  </div>
                </div>

                {/* Storage Engine Breakdown */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 mb-2">
                    Industry Storage Systems at a Glance
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                    <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Structured:</strong> Snowflake, Google BigQuery, PostgreSQL, Amazon Redshift.
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Semi-Structured:</strong> MongoDB, Couchbase, DynamoDB, Elasticsearch.
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Unstructured:</strong> Amazon S3, Google Cloud Storage, Pinecone, Milvus, Chroma.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3 CONTENT: CORE DATA TYPES DEFINITIONS */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                {/* Master Slide Definition */}
                <div className="p-4 rounded-xl bg-indigo-950/40 dark:bg-indigo-950/40 light:bg-indigo-50 border border-indigo-800/40 dark:border-indigo-800/40 light:border-indigo-200 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed">
                  <strong className="text-white dark:text-white light:text-slate-900 font-semibold">Lecture Slide Definition:</strong>{' '}
                  Data types classify raw data based on its underlying structural format, schema enforcement, and storage organization.
                </div>

                {/* The 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Structured */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5 hover:border-emerald-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-mono">1. Structured Data</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        Schema-on-Write
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                      High-level organized data that adheres to a <strong>rigid, predefined schema</strong> and is stored in relational tables with rows and columns.
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 pt-1 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Daily Analogy:</strong> A printed bank statement or spreadsheet ledger where every row has the same columns.
                    </div>
                  </div>

                  {/* Semi-Structured */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5 hover:border-indigo-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 font-mono">2. Semi-Structured</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        Schema-on-Read
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                      Data that lacks a strict tabular schema but contains <strong>organizational markers, tags, or keys</strong> to separate data elements.
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 pt-1 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Daily Analogy:</strong> A food delivery receipt or cereal box nutrition label with tagged ingredient keys.
                    </div>
                  </div>

                  {/* Unstructured */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2.5 hover:border-purple-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 font-mono">3. Unstructured Data</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                        80%+ of Volume
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                      Data that has <strong>no predefined structure, schema, or organization</strong>, existing in its native raw binary or textual format.
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 pt-1 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                      <strong>Daily Analogy:</strong> A selfie photo, voice memo, or video reel with raw pixels and acoustic wave frequencies.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4 CONTENT: RAW DATA NATURE, QUANTITATIVE VS QUALITATIVE & OPERATIONAL PILLARS */}
            {currentSlide === 4 && (
              <div className="space-y-5">
                {/* 3 Slide Cards from the Slide 4 image */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Raw Data Nature - Orange */}
                  <div className="p-5 rounded-2xl bg-orange-950/20 dark:bg-orange-950/20 light:bg-orange-50/60 border border-orange-500/40 space-y-2.5">
                    <div className="flex items-center gap-2 text-orange-400 dark:text-orange-400 light:text-orange-600 font-bold text-sm">
                      <HardDrive className="w-4 h-4" />
                      <span>Raw Data Nature</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Raw data in its native form is <strong>noisy, fragmented, incomplete, and distributed</strong> across disparate systems, making direct analysis impossible without structured ingestion and cleaning pipelines.
                    </p>
                  </div>

                  {/* Card 2: Quantitative vs Qualitative - Green */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/60 border border-emerald-500/40 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-bold text-sm">
                      <TableIcon className="w-4 h-4" />
                      <span>Quantitative vs. Qualitative</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Processes <strong>numerical measurements</strong> (metrics, counts, financial amounts) as well as <strong>non-numerical elements</strong> (free-text customer reviews, user tags, categorical statuses).
                    </p>
                  </div>

                  {/* Card 3: Operational Challenges - Blue */}
                  <div className="p-5 rounded-2xl bg-sky-950/20 dark:bg-sky-950/20 light:bg-sky-50/60 border border-sky-500/40 space-y-2.5">
                    <div className="flex items-center gap-2 text-sky-400 dark:text-sky-400 light:text-sky-600 font-bold text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Core Operational Pillars</span>
                    </div>
                    <ul className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 space-y-1.5 list-disc list-inside">
                      <li><strong>Signal vs. Noise Separation:</strong> Discerning real trends from random fluctuations.</li>
                      <li><strong>Scalability Factor:</strong> Processing gigabytes to petabytes efficiently.</li>
                      <li><strong>System Integration:</strong> Linking with live production systems.</li>
                    </ul>
                  </div>
                </div>

                {/* Sub-Feature Classification: Quantitative (Discrete/Continuous) vs Qualitative (Nominal/Ordinal) */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Detailed Feature Classification &amp; Daily Life Examples</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                      Click below to view daily life example
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedFeatureType('discrete')}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        selectedFeatureType === 'discrete'
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-sky-400">Quantitative</div>
                      <div className="text-xs font-bold">Discrete</div>
                    </button>

                    <button
                      onClick={() => setSelectedFeatureType('continuous')}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        selectedFeatureType === 'continuous'
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-sky-400">Quantitative</div>
                      <div className="text-xs font-bold">Continuous</div>
                    </button>

                    <button
                      onClick={() => setSelectedFeatureType('nominal')}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        selectedFeatureType === 'nominal'
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-emerald-400">Qualitative</div>
                      <div className="text-xs font-bold">Nominal</div>
                    </button>

                    <button
                      onClick={() => setSelectedFeatureType('ordinal')}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        selectedFeatureType === 'ordinal'
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900 dark:bg-slate-900 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-emerald-400">Qualitative</div>
                      <div className="text-xs font-bold">Ordinal</div>
                    </button>
                  </div>

                  {/* Feature Detail Callout */}
                  <div className="p-3.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs space-y-1.5">
                    {selectedFeatureType === 'discrete' && (
                      <>
                        <div className="font-bold text-sky-400">Quantitative Discrete: Countable Whole Numbers</div>
                        <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                          Values that can only take specific, separate integer values (cannot have fractions like 2.5).
                        </p>
                        <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                          <strong>Everyday Daily Life Examples:</strong> Number of unread notifications on your phone (14), number of items in your shopping basket (6), number of passengers in the car (3).
                        </div>
                      </>
                    )}

                    {selectedFeatureType === 'continuous' && (
                      <>
                        <div className="font-bold text-sky-400">Quantitative Continuous: Measurable Smooth Continuum</div>
                        <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                          Measurements that can take any mathematical real value within an interval (contains decimals).
                        </p>
                        <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                          <strong>Everyday Daily Life Examples:</strong> Your body temperature (98.6°F), vehicle speed on the highway (64.2 mph), exact weight of a watermelon (3.42 kg).
                        </div>
                      </>
                    )}

                    {selectedFeatureType === 'nominal' && (
                      <>
                        <div className="font-bold text-emerald-400">Qualitative Nominal: Named Categories Without Inherent Order</div>
                        <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                          Labels used to classify items into groups with no mathematical or hierarchical ranking.
                        </p>
                        <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                          <strong>Everyday Daily Life Examples:</strong> Color of your t-shirt (Blue, Black, Red), smartphone brand (Apple, Samsung, Google), blood type (A, B, AB, O).
                        </div>
                      </>
                    )}

                    {selectedFeatureType === 'ordinal' && (
                      <>
                        <div className="font-bold text-emerald-400">Qualitative Ordinal: Ranked Categories With Clear Order</div>
                        <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                          Categorical variables that have an explicit, logical ranking, though the exact numerical gap between ranks is not fixed.
                        </p>
                        <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                          <strong>Everyday Daily Life Examples:</strong> Clothing sizes (S &lt; M &lt; L &lt; XL), customer satisfaction survey (Poor, Fair, Good, Excellent), coffee cup sizes (Tall, Grande, Venti).
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 5 CONTENT: DATA ANALYTICS BASICS & 7-STAGE LIFECYCLE */}
            {currentSlide === 5 && (
              <div className="space-y-5">
                {/* 4 Cards from Slide 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Definition - Orange */}
                  <div className="p-5 rounded-2xl bg-orange-950/20 dark:bg-orange-950/20 light:bg-orange-50/60 border border-orange-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-orange-400 dark:text-orange-400 light:text-orange-600 font-bold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Data Analytics Definition</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Data Analytics is the multi-step discipline of <strong>examining, cleaning, transforming, and modeling raw data</strong> to discover meaningful patterns and conclusions.
                    </p>
                  </div>

                  {/* Card 2: Analytical Focus - Green */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50/60 border border-emerald-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-bold text-sm">
                      <Target className="w-4 h-4" />
                      <span>Operational Focus</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      Focuses on applying analytical workflows to <strong>extract operational insights and solve specific domain problems</strong> across engineering, medicine, and business.
                    </p>
                  </div>

                  {/* Card 3: Purpose - Blue */}
                  <div className="p-5 rounded-2xl bg-sky-950/20 dark:bg-sky-950/20 light:bg-sky-50/60 border border-sky-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 dark:text-sky-400 light:text-sky-600 font-bold text-sm">
                      <Cpu className="w-4 h-4" />
                      <span>Core Purpose</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      It systematically <strong>converts raw, unstructured signals</strong> generated by digital and physical systems into structured information that supports automated systems or human decision-makers.
                    </p>
                  </div>

                  {/* Card 4: Lifecycle - Purple */}
                  <div className="p-5 rounded-2xl bg-purple-950/20 dark:bg-purple-950/20 light:bg-purple-50/60 border border-purple-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 dark:text-purple-400 light:text-purple-600 font-bold text-sm">
                      <Layers className="w-4 h-4" />
                      <span>Complete Data Lifecycle</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      The analytics process spans the entire lifecycle of data: from initial capture and ingestion to final statistical modeling and executive visualization.
                    </p>
                  </div>
                </div>

                {/* Visual 7-Stage Pipeline */}
                <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                    The 7 Stages of the Analytics Lifecycle (From Lecture Slide)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {[
                      { step: 1, name: 'Ingestion', desc: 'Capture from IoT / APIs' },
                      { step: 2, name: 'Storage', desc: 'Lakehouse & Data Warehouses' },
                      { step: 3, name: 'Cleaning', desc: 'Imputation & Noise Filtering' },
                      { step: 4, name: 'Transformation', desc: 'Normalization & Feature Scaling' },
                      { step: 5, name: 'Exploratory Analysis', desc: 'EDA & Descriptive Stats' },
                      { step: 6, name: 'Statistical Modeling', desc: 'Inference & ML Predictions' },
                      { step: 7, name: 'Final Visualization', desc: 'Dashboards & Decisions' },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1"
                      >
                        <div className="flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold font-mono">
                            {st.step}
                          </span>
                          <span className="text-[11px] font-bold text-white dark:text-white light:text-slate-900 truncate">
                            {st.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 leading-tight">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DAILY LIFE EXAMPLES EXPLORER (Addressing User Prompt Explicitly) */}
      {viewMode === 'daily-life' && (
        <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl light:shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Real-World Conceptual Grounding
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                  User Request Special Section
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                Data Types Explained Through Daily Life Examples
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600">
                To truly understand why engineers separate data into Structured, Semi-Structured, and Unstructured formats, examine these 4 everyday scenarios:
              </p>
            </div>

            <button
              onClick={() => setViewMode('deck')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Back to Slide Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily Life Domain Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'smartphone' as DailyLifeDomain, label: '1. Smartphone & Apps', icon: Smartphone, subtitle: 'Morning routine & chats' },
              { id: 'supermarket' as DailyLifeDomain, label: '2. Supermarket Grocery', icon: ShoppingCart, subtitle: 'Receipts & packaging' },
              { id: 'rideshare' as DailyLifeDomain, label: '3. Uber / Lyft Commute', icon: Car, subtitle: 'Trips & GPS stream' },
              { id: 'hospital' as DailyLifeDomain, label: '4. Hospital & Healthcare', icon: Activity, subtitle: 'Slide 1 EMR Case Study' },
            ].map((domain) => {
              const IconComponent = domain.icon;
              const isSelected = activeDailyDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDailyDomain(domain.id)}
                  className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/60 dark:bg-indigo-950/60 light:bg-indigo-50 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold truncate">{domain.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
                    {domain.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Detailed Cards */}
          {(() => {
            const scenario = DAILY_LIFE_SCENARIOS[activeDailyDomain];
            return (
              <div className="space-y-4 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                    <scenario.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      Scenario: {scenario.title}
                    </h4>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                      {scenario.context}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Structured Column */}
                  <div className="p-5 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3 hover:border-emerald-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-mono">Structured Data</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        {scenario.structured.format}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      {scenario.structured.title}
                    </h5>

                    <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                      {scenario.structured.examples.map((ex, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-emerald-300/90 dark:text-emerald-300/90 light:text-emerald-800 leading-relaxed">
                      <strong>Why it&apos;s Structured:</strong> {scenario.structured.why}
                    </div>
                  </div>

                  {/* Semi-Structured Column */}
                  <div className="p-5 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3 hover:border-indigo-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 font-mono">Semi-Structured Data</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        {scenario.semiStructured.format}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      {scenario.semiStructured.title}
                    </h5>

                    <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                      {scenario.semiStructured.examples.map((ex, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-[11px] text-indigo-300/90 dark:text-indigo-300/90 light:text-indigo-800 leading-relaxed">
                      <strong>Why it&apos;s Semi-Structured:</strong> {scenario.semiStructured.why}
                    </div>
                  </div>

                  {/* Unstructured Column */}
                  <div className="p-5 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3 hover:border-purple-500/50 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 font-mono">Unstructured Data</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                        {scenario.unstructured.format}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                      {scenario.unstructured.title}
                    </h5>

                    <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                      {scenario.unstructured.examples.map((ex, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-900/30 text-[11px] text-purple-300/90 dark:text-purple-300/90 light:text-purple-800 leading-relaxed">
                      <strong>Why it&apos;s Unstructured:</strong> {scenario.unstructured.why}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW MODE 3: ALL 5 SLIDES GRID OVERVIEW */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="p-5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-md flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {slide.number}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{slide.badge}</span>
                  </div>
                  <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    {slide.summary}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentSlide(slide.id);
                    setViewMode('deck');
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-indigo-600 hover:text-white text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Open Full Slide Deck View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPREHENSIVE ARCHITECTURAL COMPARISON MATRIX TABLE */}
      <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 shadow-xl light:shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-indigo-400" />
              <span>Full Comparison Matrix: Structured vs. Semi-Structured vs. Unstructured</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
              Direct synthesis of all 5 lecture slides for quick exam revision and conceptual recall
            </p>
          </div>

          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
            Exam Revision Sheet
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono">
                <th className="py-2.5 px-3 font-semibold">Dimension</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-400">Structured Data</th>
                <th className="py-2.5 px-3 font-semibold text-indigo-400">Semi-Structured Data</th>
                <th className="py-2.5 px-3 font-semibold text-purple-400">Unstructured Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 dark:divide-slate-800/60 light:divide-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  Schema Model
                </td>
                <td className="py-2.5 px-3">Schema-on-Write (Rigid tabular DDL)</td>
                <td className="py-2.5 px-3">Schema-on-Read (Hierarchical keys/tags)</td>
                <td className="py-2.5 px-3">No Predefined Schema (Raw bytes)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  File Formats
                </td>
                <td className="py-2.5 px-3">RDBMS, CSV, TSV, Parquet</td>
                <td className="py-2.5 px-3">JSON, XML, YAML, BSON</td>
                <td className="py-2.5 px-3">Plain text, PDF, JPEG, MP4, WAV, Blobs</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  Query Language
                </td>
                <td className="py-2.5 px-3 font-mono text-emerald-400">Standard SQL (SELECT/JOIN)</td>
                <td className="py-2.5 px-3 font-mono text-indigo-400">JSONPath, XPath, MQL</td>
                <td className="py-2.5 px-3 font-mono text-purple-400">Vector Embeddings / NLP / CNNs</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  Enterprise Volume
                </td>
                <td className="py-2.5 px-3 font-mono">~10% to 15%</td>
                <td className="py-2.5 px-3 font-mono">~10% to 15%</td>
                <td className="py-2.5 px-3 font-mono font-bold text-purple-400">80% to 90% (Dominant)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  Storage Systems
                </td>
                <td className="py-2.5 px-3">PostgreSQL, MySQL, Oracle, Snowflake</td>
                <td className="py-2.5 px-3">MongoDB, CouchDB, DynamoDB</td>
                <td className="py-2.5 px-3">AWS S3, GCS, Pinecone, Milvus</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white dark:text-white light:text-slate-900 font-mono">
                  Daily Life Analogy
                </td>
                <td className="py-2.5 px-3">Bank account statement table</td>
                <td className="py-2.5 px-3">Food delivery order ticket with custom tags</td>
                <td className="py-2.5 px-3">Selfie photo or audio voice memo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function Target(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function PieChartIcon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
