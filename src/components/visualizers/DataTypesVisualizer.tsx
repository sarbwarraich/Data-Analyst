import { useState, useMemo } from 'react';
import {
  Database,
  FileCode,
  FileText,
  Table,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Code2,
  HardDrive,
  Cpu,
  Search,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  Binary,
  Compass,
} from 'lucide-react';

type DataTypeCategory = 'structured' | 'semi-structured' | 'unstructured';
type ActiveTab = 'structured' | 'semi-structured' | 'unstructured' | 'matrix' | 'quiz';

interface TabularRow {
  order_id: number;
  customer_name: string;
  category: string;
  order_amount: number;
  status: 'Completed' | 'Pending' | 'Shipped';
  order_date: string;
}

const SAMPLE_STRUCTURED_ROWS: TabularRow[] = [
  { order_id: 1001, customer_name: 'Alpha Corp', category: 'Hardware', order_amount: 1420.50, status: 'Completed', order_date: '2026-09-01' },
  { order_id: 1002, customer_name: 'Beta Labs', category: 'Cloud API', order_amount: 450.00, status: 'Completed', order_date: '2026-09-02' },
  { order_id: 1003, customer_name: 'Gamma Tech', category: 'Telemetry', order_amount: 890.75, status: 'Pending', order_date: '2026-09-03' },
  { order_id: 1004, customer_name: 'Delta Data', category: 'Security', order_amount: 2150.00, status: 'Shipped', order_date: '2026-09-04' },
  { order_id: 1005, customer_name: 'Epsilon AI', category: 'Compute', order_amount: 3200.25, status: 'Completed', order_date: '2026-09-05' },
];

const SAMPLE_JSON_OBJECT = {
  store_event: "e_commerce_interaction",
  session_id: "sess_98234ab1",
  timestamp: "2026-09-13T08:14:22Z",
  client_metadata: {
    ip_address: "192.0.2.45",
    device: "iPhone 16 Pro",
    os_version: "iOS 20.1",
    geo_location: { latitude: 37.7749, longitude: -122.4194, city: "San Francisco" }
  },
  cart_items: [
    { sku: "GPU-RTX-5090", qty: 1, unit_price: 1999.00, specs: { vram_gb: 32, tdp_watts: 450 } },
    { sku: "HOODIE-MTECH", qty: 2, unit_price: 65.00, apparel_specs: { size: "XL", color: "Navy Blue", fabric: "100% Organic Cotton" } }
  ],
  custom_attributes: {
    referral_campaign: "campus_mtech_analytics",
    loyalty_tier: "Platinum",
    ab_test_variant: "checkout_v3"
  }
};

interface ChallengeItem {
  id: number;
  name: string;
  source: string;
  description: string;
  correct: DataTypeCategory;
  explanation: string;
}

const CHALLENGE_ITEMS: ChallengeItem[] = [
  {
    id: 1,
    name: "Customer Order Table in PostgreSQL",
    source: "Enterprise RDBMS",
    description: "Contains customer_id (INT), transaction_amount (DECIMAL), and timestamp columns strictly enforced at write time.",
    correct: 'structured',
    explanation: "Adheres to a rigid, predefined tabular schema with fixed columns, mathematical types, and relational constraints."
  },
  {
    id: 2,
    name: "MongoDB Product Catalog Document",
    source: "E-Commerce API",
    description: "Contains nested JSON objects with key-value pairs where electronics records have 'vram_gb' and clothing records have 'apparel_sizes'.",
    correct: 'semi-structured',
    explanation: "Lacks a rigid tabular schema but contains organizational markers (keys and curly braces) to separate polymorphic attributes."
  },
  {
    id: 3,
    name: "911 Dispatch Voice Audio Recording (WAV)",
    source: "Emergency Telemetry",
    description: "Continuous raw audio byte stream sampled at 44.1 kHz with varying volume, background sirens, and speech cadence.",
    correct: 'unstructured',
    explanation: "Has zero predefined tabular schema, tags, or keys; exists as native raw binary waveform bytes requiring speech-to-text models."
  },
  {
    id: 4,
    name: "Patient Clinical EHR Scanned PDF & Doctor Notes",
    source: "Hospital Pathology",
    description: "Free-form handwritten text descriptions, unstructured physician impressions, and embedded microscopy scans.",
    correct: 'unstructured',
    explanation: "Natural language text and image pixels without strict key-value tags or schema constraints."
  },
  {
    id: 5,
    name: "Health Insurance Claim XML File",
    source: "EDI Clearinghouse",
    description: "Uses hierarchical XML markup tags like <claim><patient_id>104</patient_id><diagnosis_code>J45.9</diagnosis_code></claim>.",
    correct: 'semi-structured',
    explanation: "Contains explicit structural tags (<tag>...</tag>) organizing elements, but allows flexible nesting without strict RDBMS table rows."
  },
  {
    id: 6,
    name: "Parquet Columnar File in Apache Spark",
    source: "Financial Data Lakehouse",
    description: "Stores trillions of daily stock ticks with strict embedded schema metadata (symbol: String, price: Double, volume: Long).",
    correct: 'structured',
    explanation: "Adheres to a strict tabular schema with typed columns and fixed compression encodings."
  }
];

export function DataTypesVisualizer() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('structured');

  // Structured Tab State
  const [amountFilter, setAmountFilter] = useState<number>(0);
  const [schemaViolationTriggered, setSchemaViolationTriggered] = useState<boolean>(false);
  const [schemaViolationMsg, setSchemaViolationMsg] = useState<string>('');

  // Semi-Structured Tab State
  const [jsonExpanded, setJsonExpanded] = useState<boolean>(true);
  const [selectedKeyPath, setSelectedKeyPath] = useState<string>('cart_items[0].specs');
  const [customKeyInput, setCustomKeyInput] = useState<string>('promotional_discount');
  const [customValInput, setCustomValInput] = useState<string>('15% SUMMER_CODE');
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>({
    customer_notes: "Please leave package with front concierge."
  });

  // Unstructured Tab State
  const [unstructuredModality, setUnstructuredModality] = useState<'text' | 'audio' | 'image'>('text');
  const [embeddingQuery, setEmbeddingQuery] = useState<string>('battery life drained rapidly after update');

  // Quiz Challenge State
  const [challengeAnswers, setChallengeAnswers] = useState<Record<number, DataTypeCategory>>({});
  const [showChallengeResults, setShowChallengeResults] = useState<boolean>(false);

  // Filtered structured rows
  const filteredStructuredRows = useMemo(() => {
    return SAMPLE_STRUCTURED_ROWS.filter((r) => r.order_amount >= amountFilter);
  }, [amountFilter]);

  const handleTestSchemaViolation = () => {
    setSchemaViolationTriggered(true);
    setSchemaViolationMsg(
      "ERROR: PostgreSQL [22P02] invalid input syntax for type numeric: 'INVALID_STRING_PAYLOAD'\n" +
      "LINE 1: INSERT INTO orders(order_id, amount) VALUES (1006, 'INVALID_STRING_PAYLOAD');\n" +
      "STATEMENT REJECTED: Schema-on-Write violation prevents database corruption."
    );
  };

  const handleAddDynamicField = () => {
    if (!customKeyInput.trim()) return;
    setDynamicFields((prev) => ({
      ...prev,
      [customKeyInput.trim()]: customValInput.trim() || 'true',
    }));
    setCustomKeyInput('');
    setCustomValInput('');
  };

  const handleChallengeSelect = (id: number, cat: DataTypeCategory) => {
    setChallengeAnswers((prev) => ({ ...prev, [id]: cat }));
  };

  const challengeScore = useMemo(() => {
    let correctCount = 0;
    CHALLENGE_ITEMS.forEach((item) => {
      if (challengeAnswers[item.id] === item.correct) {
        correctCount += 1;
      }
    });
    return correctCount;
  }, [challengeAnswers]);

  return (
    <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xl light:shadow-sm space-y-6 transition-all">
      {/* Header with Lecture Slide Citations */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-700 border border-emerald-500/30">
              Start of Course • Core Typology
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
              CO 1 Foundation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-emerald-400" />
            Data Types: Structured, Semi-Structured & Unstructured
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-3xl leading-relaxed">
            <strong className="text-emerald-300 dark:text-emerald-400 light:text-emerald-700">Definition:</strong> Data types classify raw data based on its underlying structural format, schema enforcement, and storage organization.
          </p>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('structured')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'structured'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> Structured
          </button>
          <button
            onClick={() => setActiveTab('semi-structured')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'semi-structured'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Semi-Structured
          </button>
          <button
            onClick={() => setActiveTab('unstructured')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'unstructured'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Unstructured
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Comparison Matrix
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Classify Challenge
          </button>
        </div>
      </div>

      {/* TAB 1: STRUCTURED DATA */}
      {activeTab === 'structured' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Lecture Definition Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-emerald-200/90 dark:text-emerald-200/90 light:text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Structured Data Definition
              </span>
              <p className="text-xs sm:text-sm">
                <strong>Structured Data:</strong> High-level organized data that adheres to a rigid, predefined schema and is stored in relational tables with rows and columns.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 text-xs font-mono shrink-0 border border-emerald-700/40">
              Schema-on-Write • ACID • SQL
            </div>
          </div>

          {/* Interactive Controls & Schema Enforcement Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Table Filter & Live Metrics */}
            <div className="lg:col-span-2 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-emerald-400" /> Relational Table: orders_master (PostgreSQL)
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {filteredStructuredRows.length} of {SAMPLE_STRUCTURED_ROWS.length} Records Shown
                </span>
              </div>

              {/* Threshold Slider */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 font-mono shrink-0">Filter Amount &gt;= ${amountFilter}:</span>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="250"
                  value={amountFilter}
                  onChange={(e) => setAmountFilter(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-emerald-300">${amountFilter}</span>
              </div>

              {/* Table Render */}
              <div className="overflow-x-auto border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 dark:bg-slate-900 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 border-b border-slate-800 dark:border-slate-800 light:border-slate-300">
                    <tr>
                      <th className="p-2.5">order_id (INT PK)</th>
                      <th className="p-2.5">customer_name (VARCHAR)</th>
                      <th className="p-2.5">category (VARCHAR)</th>
                      <th className="p-2.5">amount (DECIMAL)</th>
                      <th className="p-2.5">status (ENUM)</th>
                      <th className="p-2.5">order_date (DATE)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 dark:divide-slate-800/60 light:divide-slate-200">
                    {filteredStructuredRows.map((row) => (
                      <tr key={row.order_id} className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-100 transition">
                        <td className="p-2.5 font-bold text-emerald-400">#{row.order_id}</td>
                        <td className="p-2.5 text-slate-200 dark:text-slate-200 light:text-slate-800">{row.customer_name}</td>
                        <td className="p-2.5 text-slate-400">{row.category}</td>
                        <td className="p-2.5 font-bold text-white dark:text-white light:text-slate-900">${row.order_amount.toFixed(2)}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            row.status === 'Completed' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' :
                            row.status === 'Shipped' ? 'bg-sky-950/60 text-sky-300 border border-sky-800/40' :
                            'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-400">{row.order_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schema-on-Write Enforcement Simulator */}
            <div className="bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Schema-on-Write Enforcement
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  In structured databases, the schema is strictly enforced <strong>before writing</strong> to disk. Inserting mismatched types or missing non-null constraints causes immediate transaction rollback.
                </p>

                <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <span className="text-purple-400">CREATE TABLE</span> orders (<br/>
                  &nbsp;&nbsp;order_id <span className="text-sky-400">SERIAL PRIMARY KEY</span>,<br/>
                  &nbsp;&nbsp;order_amount <span className="text-sky-400">DECIMAL(10,2) NOT NULL</span><br/>
                  );
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleTestSchemaViolation}
                  className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" /> Test Type Violation Insertion
                </button>

                {schemaViolationTriggered && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs font-mono space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400">
                      <XCircle className="w-4 h-4" /> Transaction Aborted!
                    </div>
                    <pre className="text-[10px] whitespace-pre-wrap leading-tight text-rose-300/90">{schemaViolationMsg}</pre>
                    <button
                      onClick={() => setSchemaViolationTriggered(false)}
                      className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer mt-1"
                    >
                      Clear Simulation Error
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Characteristics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-emerald-400">Typical Storage</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                PostgreSQL, MySQL, Oracle, Snowflake, BigQuery, AWS Redshift, Apache Parquet.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-emerald-400">Access & Querying</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Standard SQL, Relational Algebra, B-Tree indexes, Hash joins, OLAP aggregation.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-emerald-400">Enterprise Share</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Accounts for ~20% of corporate data, but powers 90%+ of transactional banking and accounting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEMI-STRUCTURED DATA */}
      {activeTab === 'semi-structured' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Lecture Definition Banner */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/30 text-indigo-200/90 dark:text-indigo-200/90 light:text-indigo-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Semi-Structured Data Definition
              </span>
              <p className="text-xs sm:text-sm">
                <strong>Semi-Structured Data:</strong> Data that lacks a strict tabular schema but contains organizational markers, tags, or keys to separate data elements.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-indigo-900/40 text-indigo-300 text-xs font-mono shrink-0 border border-indigo-700/40">
              Schema-on-Read • JSON / XML • Polymorphic
            </div>
          </div>

          {/* Interactive JSON Tree Viewer & Schema-on-Read Playground */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* JSON Code Viewer */}
            <div className="lg:col-span-2 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-indigo-400" /> Polymorphic JSON Payload (API Stream)
                </span>
                <button
                  onClick={() => setJsonExpanded(!jsonExpanded)}
                  className="text-xs text-indigo-400 hover:underline cursor-pointer"
                >
                  {jsonExpanded ? 'Collapse Payload' : 'Expand Payload'}
                </button>
              </div>

              {/* JSON code container */}
              <pre className="bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 text-xs font-mono text-indigo-300 overflow-x-auto max-h-96 leading-relaxed">
                <code>
                  {JSON.stringify(
                    {
                      ...SAMPLE_JSON_OBJECT,
                      dynamic_schema_fields: dynamicFields,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            </div>

            {/* Schema-on-Read: Dynamic Field Injection */}
            <div className="bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Schema-on-Read Flexibility
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  Unlike RDBMS tables where modifying schemas requires heavy <code>ALTER TABLE</code> locks, semi-structured formats allow instantaneous addition of new attributes on each document.
                </p>

                {/* Form to inject arbitrary key */}
                <div className="space-y-2 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">New JSON Key Name:</label>
                    <input
                      type="text"
                      value={customKeyInput}
                      onChange={(e) => setCustomKeyInput(e.target.value)}
                      placeholder="e.g. promotional_discount"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">JSON Value:</label>
                    <input
                      type="text"
                      value={customValInput}
                      onChange={(e) => setCustomValInput(e.target.value)}
                      placeholder="e.g. 15% OFF"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                  <button
                    onClick={handleAddDynamicField}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm mt-1"
                  >
                    <span>Inject Field into Live JSON</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic fields active badge */}
              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
                <span className="font-bold block mb-1">Schema Interpretation:</span>
                Parser extracts keys at query time (Schema-on-Read). Useful for microservice events, clickstreams, and IoT sensors.
              </div>
            </div>
          </div>

          {/* Key Characteristics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-indigo-400">Typical Storage</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                MongoDB, Couchbase, DynamoDB, Cassandra, Elasticsearch, JSONB columns in Postgres.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-indigo-400">Access & Querying</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                JSONPath, XPath, MQL (Mongo Query Language), GraphQL, document inverted indices.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-indigo-400">Enterprise Share</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Accounts for ~10-15% of enterprise data; standard format for web REST APIs and IoT payloads.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UNSTRUCTURED DATA */}
      {activeTab === 'unstructured' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Lecture Definition Banner */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 text-purple-200/90 dark:text-purple-200/90 light:text-purple-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Unstructured Data Definition
              </span>
              <p className="text-xs sm:text-sm">
                <strong>Unstructured Data:</strong> Data that has no predefined structure, schema, or organization, existing in its native raw binary or textual format.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-purple-900/40 text-purple-300 text-xs font-mono shrink-0 border border-purple-700/40">
              No Schema • Multi-Modal • Vector Embeddings
            </div>
          </div>

          {/* Interactive Modality Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Raw Content Viewer */}
            <div className="lg:col-span-2 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase tracking-wider">
                    Raw Multi-Modal Data Ingestion
                  </span>
                </div>

                {/* Modality Toggle */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setUnstructuredModality('text')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                      unstructuredModality === 'text' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Natural Text
                  </button>
                  <button
                    onClick={() => setUnstructuredModality('audio')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                      unstructuredModality === 'audio' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Audio Waveform
                  </button>
                  <button
                    onClick={() => setUnstructuredModality('image')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                      unstructuredModality === 'image' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Image Pixels
                  </button>
                </div>
              </div>

              {/* Dynamic Modality Display */}
              {unstructuredModality === 'text' && (
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
                  <span className="text-[11px] font-mono text-purple-400">Customer Support Ticket Transcription #82914</span>
                  <p className="text-xs text-slate-200 dark:text-slate-200 light:text-slate-800 font-sans leading-relaxed italic">
                    &quot;Hey team, I upgraded my enterprise analytics cluster to firmware 4.2 last night. Ever since the patch, the worker nodes are throwing intermittent segmentation faults during large matrix multiplications. The CPU utilization spikes to 100% and then hangs with no return code. Can someone please inspect the memory allocation logs immediately? Thanks, Sarah.&quot;
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Length: 64 words</span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Encoding: UTF-8</span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Structure: 0% Tabular</span>
                  </div>
                </div>
              )}

              {unstructuredModality === 'audio' && (
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
                  <span className="text-[11px] font-mono text-purple-400">Emergency 911 Audio Waveform (Raw PCM Float32)</span>
                  <div className="h-24 bg-slate-950 rounded-lg border border-slate-800 p-2 flex items-end justify-between gap-1">
                    {[12, 35, 68, 90, 45, 23, 78, 95, 60, 40, 85, 100, 75, 30, 55, 80, 65, 45, 90, 110, 85, 40, 25, 60, 75, 50, 30, 15, 40, 65, 85, 50, 30, 10].map((h, i) => (
                      <div
                        key={i}
                        className="w-full bg-gradient-to-t from-purple-600 to-sky-400 rounded-t-sm transition-all"
                        style={{ height: `${(h / 110) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Sample Rate: 44,100 Hz (16-bit Mono)</span>
                    <span>Format: Raw Byte Stream (.wav)</span>
                  </div>
                </div>
              )}

              {unstructuredModality === 'image' && (
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
                  <span className="text-[11px] font-mono text-purple-400">Pathology MRI Scan (Pixel Density Matrix)</span>
                  <div className="grid grid-cols-8 gap-1 p-2 bg-slate-950 rounded-lg border border-slate-800">
                    {[...Array(32)].map((_, idx) => {
                      const val = Math.floor(Math.sin(idx * 0.4) * 127 + 128);
                      return (
                        <div
                          key={idx}
                          className="h-7 rounded flex items-center justify-center text-[9px] font-mono text-slate-400"
                          style={{ backgroundColor: `rgb(${val * 0.4}, ${val * 0.2}, ${val * 0.6})` }}
                        >
                          {val}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    256 × 256 matrix of 8-bit grayscale pixel tensors: [0..255]
                  </p>
                </div>
              )}
            </div>

            {/* How Unstructured Data is Analyzed: Vectorization */}
            <div className="bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> The Analytics Bridge: Vectorization
                </span>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  How do data analysts perform quantitative math on text, audio, or images? Through <strong>Neural Embedding Vectors</strong>. Deep transformers project unstructured inputs into high-dimensional vector spaces.
                </p>

                {/* Simulated 8-dim vector embedding */}
                <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 block">Dense Vector Representation (d=768):</span>
                  <div className="font-mono text-[10px] text-purple-300 break-all leading-tight bg-slate-950 p-2 rounded">
                    [0.412, -0.871, 0.129, 0.655, -0.320, 0.901, -0.044, 0.288, ...]
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/40 text-xs text-purple-300 space-y-1">
                <span className="font-bold block">Enterprise Reality:</span>
                Over <strong>80% of all newly generated global enterprise data</strong> is unstructured (videos, PDFs, speech, telemetry). Modern analysts use Vector Databases (Pinecone, Chroma) and LLMs to index it.
              </div>
            </div>
          </div>

          {/* Key Characteristics Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-purple-400">Typical Storage</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Amazon S3, Google Cloud Storage, Azure Blob, HDFS, MinIO, Vector DBs (Chroma, Pinecone).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-purple-400">Access & Querying</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Vector Similarity (Cosine, Dot Product, Euclidean L2), Deep Learning Encoders, NLP NER models.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <span className="text-xs font-bold text-purple-400">Enterprise Share</span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Accounts for ~80-90% of all data volume in the modern cloud era.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPREHENSIVE COMPARISON MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider mb-1">
              Architectural & Operational Comparison Matrix
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              Direct comparison across schema enforcement, storage architectures, query engines, and analytics paradigms.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 font-mono">
                <tr>
                  <th className="p-3.5 font-bold">Dimension</th>
                  <th className="p-3.5 font-bold text-emerald-400">Structured Data</th>
                  <th className="p-3.5 font-bold text-indigo-400">Semi-Structured Data</th>
                  <th className="p-3.5 font-bold text-purple-400">Unstructured Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 dark:divide-slate-800/80 light:divide-slate-200">
                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Formal Definition</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    High-level organized data adhering to rigid predefined schema in relational tables with rows and columns.
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    Lacks strict tabular schema but contains organizational markers, tags, or keys to separate elements.
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    No predefined structure, schema, or organization; exists in native raw binary or textual format.
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Schema Paradigm</td>
                  <td className="p-3.5 text-emerald-400 font-mono font-medium">Schema-on-Write (Strict DDL)</td>
                  <td className="p-3.5 text-indigo-400 font-mono font-medium">Schema-on-Read / Self-Describing</td>
                  <td className="p-3.5 text-purple-400 font-mono font-medium">No Schema (Implicit Embedding)</td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Representative Formats</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono text-[11px]">
                    SQL tables, CSV, TSV, Parquet, ORC
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono text-[11px]">
                    JSON, XML, YAML, BSON, EDI
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono text-[11px]">
                    PDF, MP4, MP3, JPEG, Raw Text, Log Blobs
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Primary Storage</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    RDBMS (PostgreSQL, MySQL), Data Warehouses (Snowflake, BigQuery)
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    Document DBs (MongoDB), Key-Value (DynamoDB), Lakehouse tables
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    Cloud Object Stores (Amazon S3, GCS), Vector DBs (Pinecone, Chroma)
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Query & Access Language</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">
                    ANSI SQL, relational joins
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">
                    JSONPath, XPath, MQL, GraphQL
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">
                    Cosine Similarity, Vector ANN, OCR / NLP
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Ingestion Architecture</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    ETL (Extract, Transform, Load into warehouse)
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    ELT (Extract, Load raw JSON, Transform downstream)
                  </td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                    Streaming ingestion + asynchronous vectorization pipeline
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Enterprise Volume %</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">~15% - 20%</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">~5% - 10%</td>
                  <td className="p-3.5 text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">~80% - 90% (Dominant)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: CLASSIFY CHALLENGE */}
      {activeTab === 'quiz' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Data Type Classification Challenge
              </span>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                Test your conceptual mastery: classify real-world enterprise data assets into Structured, Semi-Structured, or Unstructured.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChallengeResults(!showChallengeResults)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                {showChallengeResults ? 'Hide Explanations' : 'Check Answers & Score'}
              </button>
              <button
                onClick={() => {
                  setChallengeAnswers({});
                  setShowChallengeResults(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                title="Reset Answers"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showChallengeResults && (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-200 text-xs flex items-center justify-between">
              <div>
                <strong className="text-sm text-white">Your Score: {challengeScore} / {CHALLENGE_ITEMS.length} Correct</strong>
                <p className="text-indigo-300/80 text-[11px] mt-0.5">
                  {challengeScore === CHALLENGE_ITEMS.length ? 'Perfect score! You have mastered the foundational data typologies.' : 'Review the detailed explanations below to cement your understanding.'}
                </p>
              </div>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {Math.round((challengeScore / CHALLENGE_ITEMS.length) * 100)}%
              </span>
            </div>
          )}

          {/* Challenge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHALLENGE_ITEMS.map((item) => {
              const selected = challengeAnswers[item.id];
              const isCorrect = selected === item.correct;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    showChallengeResults
                      ? isCorrect
                        ? 'bg-emerald-950/20 border-emerald-800/40'
                        : 'bg-rose-950/20 border-rose-800/40'
                      : selected
                      ? 'bg-slate-900 border-indigo-500/50'
                      : 'bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                        {item.source}
                      </span>
                      <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                        {item.name}
                      </h4>
                    </div>
                    {showChallengeResults && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Options Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {(['structured', 'semi-structured', 'unstructured'] as DataTypeCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleChallengeSelect(item.id, cat)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition cursor-pointer capitalize ${
                          selected === cat
                            ? cat === 'structured'
                              ? 'bg-emerald-600 text-white'
                              : cat === 'semi-structured'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-purple-600 text-white'
                            : 'bg-slate-900 dark:bg-slate-900 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {cat === 'semi-structured' ? 'Semi-Struct' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Explanation text when revealed */}
                  {showChallengeResults && (
                    <div className="p-2.5 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-700 space-y-1">
                      <span className="font-bold text-indigo-300 block">
                        Correct Answer: {item.correct.toUpperCase()}
                      </span>
                      <p className="leading-normal">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
