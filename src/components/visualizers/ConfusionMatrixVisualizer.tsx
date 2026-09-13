import { useState, useMemo } from 'react';
import { Target, Sliders, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function ConfusionMatrixVisualizer() {
  const [threshold, setThreshold] = useState<number>(0.5);

  // Simulated validation test dataset of 200 items (50 actual positives, 150 actual negatives)
  // Each item has actual ground truth label and predicted probability
  const syntheticPredictions = useMemo(() => {
    const data: { id: number; actual: number; proba: number }[] = [];
    // 50 actual positives with probabilities skewed higher ~ Beta(4, 2)
    for (let i = 0; i < 50; i++) {
      const p = Math.min(0.98, Math.max(0.08, 0.35 + 0.6 * Math.sqrt((i + 1) / 50) + (Math.sin(i * 3) * 0.1)));
      data.push({ id: i, actual: 1, proba: parseFloat(p.toFixed(3)) });
    }
    // 150 actual negatives with probabilities skewed lower ~ Beta(2, 5)
    for (let i = 50; i < 200; i++) {
      const p = Math.min(0.92, Math.max(0.02, 0.05 + 0.5 * Math.pow((i - 50) / 150, 2) + (Math.cos(i * 2) * 0.08)));
      data.push({ id: i, actual: 0, proba: parseFloat(p.toFixed(3)) });
    }
    return data;
  }, []);

  // Compute metrics for the active threshold
  const { tp, fp, tn, fn, precision, recall, f1, accuracy, fpr, tpr } = useMemo(() => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    syntheticPredictions.forEach((item) => {
      const predicted = item.proba >= threshold ? 1 : 0;
      if (predicted === 1 && item.actual === 1) tp++;
      else if (predicted === 1 && item.actual === 0) fp++;
      else if (predicted === 0 && item.actual === 0) tn++;
      else if (predicted === 0 && item.actual === 1) fn++;
    });

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    const accuracy = (tp + tn) / syntheticPredictions.length;
    const fpr = fp + tn > 0 ? fp / (fp + tn) : 0;
    const tpr = recall;

    return { tp, fp, tn, fn, precision, recall, f1, accuracy, fpr, tpr };
  }, [syntheticPredictions, threshold]);

  // Pre-generate ROC curve polyline points for thresholds [0..1]
  const rocPoints = useMemo(() => {
    const points: { x: number; y: number; th: number }[] = [];
    for (let t = 0; t <= 1.0; t += 0.05) {
      let curTP = 0, curFP = 0, curTN = 0, curFN = 0;
      syntheticPredictions.forEach((item) => {
        const pred = item.proba >= t ? 1 : 0;
        if (pred === 1 && item.actual === 1) curTP++;
        else if (pred === 1 && item.actual === 0) curFP++;
        else if (pred === 0 && item.actual === 0) curTN++;
        else curFN++;
      });
      const curFPR = curFP / (curFP + curTN);
      const curTPR = curTP / (curTP + curFN);
      points.push({ x: curFPR, y: curTPR, th: t });
    }
    return points.sort((a, b) => a.x - b.x);
  }, [syntheticPredictions]);

  // SVG coordinate transformation
  const svgWidth = 260;
  const svgHeight = 220;
  const padding = 30;

  const toSvgX = (fprVal: number) => padding + fprVal * (svgWidth - padding * 2);
  const toSvgY = (tprVal: number) => svgHeight - padding - tprVal * (svgHeight - padding * 2);

  const rocPathD = rocPoints.reduce((acc, pt, idx) => {
    const sx = toSvgX(pt.x);
    const sy = toSvgY(pt.y);
    return idx === 0 ? `M ${sx} ${sy}` : `${acc} L ${sx} ${sy}`;
  }, '');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Interactive Threshold & ROC Simulator
            </span>
            <span className="text-xs text-slate-400">Classification Tradeoff Engine</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Confusion Matrix & ROC-AUC Dynamics</h4>
        </div>

        {/* Threshold Slider */}
        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800">
          <Sliders className="w-4 h-4 text-amber-400" />
          <div className="flex items-center gap-2">
            <label htmlFor="threshold-slider" className="text-xs text-slate-400 font-medium">Decision Threshold (τ):</label>
            <input
              id="threshold-slider"
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-28 accent-amber-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-amber-300 w-10 text-right">{threshold.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Confusion Matrix (2x2 Grid) */}
        <div className="md:col-span-6 bg-slate-950/80 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Confusion Matrix</span>
            <span className="text-[11px] text-slate-400 font-mono">N=200 Samples (50 Pos / 150 Neg)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            {/* TP */}
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-emerald-400">True Positive (TP)</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{tp}</div>
              <span className="text-[10px] text-emerald-300/80">Correctly Flagged</span>
            </div>

            {/* FP */}
            <div className="bg-rose-950/30 border border-rose-700/50 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-rose-400">False Positive (FP - Type I)</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{fp}</div>
              <span className="text-[10px] text-rose-300/80">False Alarm</span>
            </div>

            {/* FN */}
            <div className="bg-amber-950/30 border border-amber-700/50 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-amber-400">False Negative (FN - Type II)</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{fn}</div>
              <span className="text-[10px] text-amber-300/80">Missed Positive</span>
            </div>

            {/* TN */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-slate-300">True Negative (TN)</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{tn}</div>
              <span className="text-[10px] text-slate-400">Correct Rejection</span>
            </div>
          </div>

          {/* Derived Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-center">
            <div className="bg-slate-900/60 p-2 rounded">
              <div className="text-[10px] text-slate-400">Precision</div>
              <div className="text-sm font-bold font-mono text-emerald-400">{(precision * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded">
              <div className="text-[10px] text-slate-400">Recall</div>
              <div className="text-sm font-bold font-mono text-blue-400">{(recall * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded">
              <div className="text-[10px] text-slate-400">F1-Score</div>
              <div className="text-sm font-bold font-mono text-amber-400">{(f1 * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded">
              <div className="text-[10px] text-slate-400">Accuracy</div>
              <div className="text-sm font-bold font-mono text-slate-200">{(accuracy * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* ROC Curve Graph */}
        <div className="md:col-span-6 bg-slate-950/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">ROC Space & Operating Point</span>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              AUC ≈ 0.88
            </span>
          </div>

          <div className="flex justify-center">
            <svg width={svgWidth} height={svgHeight} className="select-none overflow-visible">
              {/* Axes */}
              <line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={svgHeight - padding}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#475569" strokeWidth="1.5" />

              {/* Diagonal Random Guess Baseline (FPR = TPR) */}
              <line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={padding}
                stroke="#334155"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* ROC Curve Polyline */}
              <path d={rocPathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

              {/* Active Operating Point */}
              <circle
                cx={toSvgX(fpr)}
                cy={toSvgY(tpr)}
                r="6"
                fill="#ffffff"
                stroke="#f59e0b"
                strokeWidth="3"
                className="animate-pulse"
              />

              {/* Coordinate Labels */}
              <text x={svgWidth / 2} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
                FPR (1 - Specificity)
              </text>
              <text
                x={12}
                y={svgHeight / 2}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
                transform={`rotate(-90 12 ${svgHeight / 2})`}
              >
                TPR (Recall)
              </text>

              {/* Current operating point coords */}
              <text x={toSvgX(fpr) + 8} y={toSvgY(tpr) - 8} fill="#fef08a" fontSize="9" fontWeight="bold">
                ({fpr.toFixed(2)}, {tpr.toFixed(2)})
              </text>
            </svg>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2 mt-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Slide <strong className="text-white">Threshold (τ)</strong> to see the operating point travel along the ROC curve.
              Lowering τ catches more positives (higher Recall) but invites more False Alarms (higher FPR).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
