import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle, Layers, Filter } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  tag: string;
  desc: string;
  sampleData: { id: number; age: string; income: string; fraud: string; notes?: string }[];
  leakageRisk: string;
  bestPractice: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: '1. Raw Ingestion',
    tag: 'Dirty / Incomplete',
    desc: 'Unsanitized production events with missing values (NaN), negative incomes, and string formats.',
    sampleData: [
      { id: 101, age: '29', income: '$65,000', fraud: '0' },
      { id: 102, age: 'NaN', income: '$120,000', fraud: '0', notes: 'Missing Age' },
      { id: 103, age: '45', income: '-$5,000', fraud: '1', notes: 'Anomaly Negative Income' },
      { id: 104, age: 'NaN', income: 'NaN', fraud: '1', notes: 'Double Missing' },
      { id: 105, age: '33', income: '$85,000', fraud: '0' },
    ],
    leakageRisk: 'None yet, but applying whole-table stats here causes immediate target leakage.',
    bestPractice: 'Always validate schema types and split Train/Test BEFORE computing any statistical summary.',
  },
  {
    id: 2,
    name: '2. Train / Test Split',
    tag: 'Leakage Barrier',
    desc: 'Strict partitioning. Imputation statistics and quantile fences will be derived solely from the Train split.',
    sampleData: [
      { id: 101, age: '29 (Train)', income: '$65k', fraud: '0' },
      { id: 102, age: 'NaN (Train)', income: '$120k', fraud: '0' },
      { id: 103, age: '45 (Train)', income: '-$5k', fraud: '1' },
      { id: 104, age: 'NaN (Test)', income: 'NaN', fraud: '1', notes: 'Isolated from stats' },
      { id: 105, age: '33 (Train)', income: '$85k', fraud: '0' },
    ],
    leakageRisk: 'CRITICAL: If you compute mean/median on the full dataset, test records influence training features.',
    bestPractice: 'Freeze imputer: imputer.fit(X_train), then X_train_imp = imputer.transform(X_train); X_test_imp = imputer.transform(X_test).',
  },
  {
    id: 3,
    name: '3. Imputation & Outlier Clamping',
    tag: 'Treated Data',
    desc: 'Median age (35.6) imputed. Incomes clamped using IQR fences [0, $140,000].',
    sampleData: [
      { id: 101, age: '29.0', income: '$65,000', fraud: '0' },
      { id: 102, age: '35.6 (imp)', income: '$120,000', fraud: '0' },
      { id: 103, age: '45.0', income: '$0 (clamped)', fraud: '1' },
      { id: 104, age: '35.6 (imp)', income: '$78,000 (imp)', fraud: '1' },
      { id: 105, age: '33.0', income: '$85,000', fraud: '0' },
    ],
    leakageRisk: 'Low if transformed using the training pipeline artifact.',
    bestPractice: 'Use KNNImputer when features correlate; use Median when data is skewed.',
  },
  {
    id: 4,
    name: '4. Scaling & Normalized Tensor',
    tag: 'Production Ready',
    desc: 'StandardScaler applied: Z = (X - μ_train) / σ_train. Ready for model tensor ingestion.',
    sampleData: [
      { id: 101, age: '-0.82', income: '-0.21', fraud: '0' },
      { id: 102, age: '+0.01', income: '+1.62', fraud: '0' },
      { id: 103, age: '+1.44', income: '-2.38', fraud: '1' },
      { id: 104, age: '+0.01', income: '+0.22', fraud: '1' },
      { id: 105, age: '-0.38', income: '+0.46', fraud: '0' },
    ],
    leakageRisk: 'Zero leakage. Normalized feature distribution with μ=0, σ=1.',
    bestPractice: 'Export the complete ColumnTransformer artifact with joblib or MLflow for inference.',
  },
];

export function PipelineVisualizer() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = STAGES[activeStageIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Interactive Pipeline Simulator
            </span>
            <span className="text-xs text-slate-400">Step-by-Step Data Engineering</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Leak-Free Preprocessing Pipeline</h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : 0))}
            disabled={activeStageIndex === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0))}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition shadow-sm"
          >
            {activeStageIndex === STAGES.length - 1 ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </>
            ) : (
              <>
                Next Stage <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline Stage Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 rounded-lg text-left transition border ${
                isActive
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                  : isPassed
                  ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400">Stage 0{stage.id}</span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isActive && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
              </div>
              <p className="text-xs font-semibold truncate">{stage.name.replace(/^\d+\.\s*/, '')}</p>
              <span className="text-[10px] text-slate-400">{stage.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail & Live Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Data Matrix View at Stage
            </span>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              N=5 Records Sample
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">Age Feature</th>
                  <th className="py-2 px-2">Income Feature</th>
                  <th className="py-2 px-2">Target (Fraud)</th>
                  <th className="py-2 px-2">State</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {currentStage.sampleData.map((row) => (
                    <motion.tr
                      key={`${currentStage.id}-${row.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-slate-800/40 hover:bg-slate-900/50"
                    >
                      <td className="py-2 px-2 font-mono text-slate-400">#{row.id}</td>
                      <td className="py-2 px-2 font-mono text-slate-200">{row.age}</td>
                      <td className="py-2 px-2 font-mono text-slate-200">{row.income}</td>
                      <td className="py-2 px-2 font-mono">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.fraud === '1' ? 'bg-rose-950/70 text-rose-300 border border-rose-800/40' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {row.fraud}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-[11px] text-slate-400">{row.notes || 'Valid'}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Current Action</h5>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">{currentStage.desc}</p>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Target Leakage Risk
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">{currentStage.leakageRisk}</p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-3.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Production Best Practice
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">{currentStage.bestPractice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
