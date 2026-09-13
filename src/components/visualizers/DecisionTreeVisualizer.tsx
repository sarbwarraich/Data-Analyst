import { useState, useMemo } from 'react';
import { Sliders, GitFork, Info } from 'lucide-react';

export function DecisionTreeVisualizer() {
  const [splitThreshold, setSplitThreshold] = useState<number>(50);

  // 20 simulated customer items with Feature X (Income: 10 to 90) and Target Y (1: Approved, 0: Rejected)
  const items = useMemo(() => [
    { x: 15, y: 0 }, { x: 22, y: 0 }, { x: 28, y: 0 }, { x: 32, y: 0 }, { x: 38, y: 0 },
    { x: 42, y: 0 }, { x: 45, y: 1 }, { x: 48, y: 0 }, { x: 52, y: 1 }, { x: 55, y: 1 },
    { x: 58, y: 0 }, { x: 62, y: 1 }, { x: 68, y: 1 }, { x: 72, y: 1 }, { x: 75, y: 1 },
    { x: 79, y: 1 }, { x: 82, y: 1 }, { x: 85, y: 1 }, { x: 88, y: 1 }, { x: 92, y: 1 },
  ], []);

  // Parent Gini
  const totalApproved = items.filter(i => i.y === 1).length;
  const totalRejected = items.filter(i => i.y === 0).length;
  const p1 = totalApproved / items.length;
  const p0 = totalRejected / items.length;
  const parentGini = 1 - (p1 * p1 + p0 * p0);

  // Left Child (X <= splitThreshold)
  const leftItems = items.filter(i => i.x <= splitThreshold);
  const leftApp = leftItems.filter(i => i.y === 1).length;
  const leftRej = leftItems.filter(i => i.y === 0).length;
  const leftGini = leftItems.length > 0 ? 1 - (Math.pow(leftApp / leftItems.length, 2) + Math.pow(leftRej / leftItems.length, 2)) : 0;

  // Right Child (X > splitThreshold)
  const rightItems = items.filter(i => i.x > splitThreshold);
  const rightApp = rightItems.filter(i => i.y === 1).length;
  const rightRej = rightItems.filter(i => i.y === 0).length;
  const rightGini = rightItems.length > 0 ? 1 - (Math.pow(rightApp / rightItems.length, 2) + Math.pow(rightRej / rightItems.length, 2)) : 0;

  // Weighted Gini split
  const weightedGini = (leftItems.length / items.length) * leftGini + (rightItems.length / items.length) * rightGini;
  const giniGain = parentGini - weightedGini;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Interactive Decision Tree Splitting
            </span>
            <span className="text-xs text-slate-400">Gini Impurity = 1 - Σ p_i²</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Recursive Partitioning & Gini Gain</h4>
        </div>

        {/* Split Threshold Slider */}
        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800">
          <Sliders className="w-4 h-4 text-amber-400" />
          <div className="flex items-center gap-2">
            <label htmlFor="split-threshold-slider" className="text-xs text-slate-400 font-medium">Split Threshold (X):</label>
            <input
              id="split-threshold-slider"
              type="range"
              min="20"
              max="85"
              step="5"
              value={splitThreshold}
              onChange={(e) => setSplitThreshold(parseInt(e.target.value))}
              className="w-28 accent-amber-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-amber-300 w-8 text-right">{splitThreshold}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Tree Node Structure */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center">
          <svg viewBox="0 0 460 220" className="w-full max-w-[460px] select-none">
            {/* Root Node */}
            <rect x="160" y="10" width="140" height="55" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.8" />
            <text x="230" y="28" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
              Parent Node (N=20)
            </text>
            <text x="230" y="44" fill="#cbd5e1" fontSize="10" textAnchor="middle font-mono">
              Gini: {parentGini.toFixed(3)} (App: {totalApproved}, Rej: {totalRejected})
            </text>
            <text x="230" y="58" fill="#94a3b8" fontSize="9" textAnchor="middle font-mono">
              Split: Feature X &le; {splitThreshold}
            </text>

            {/* Split Branch Lines */}
            <line x1="200" y1="65" x2="100" y2="120" stroke="#475569" strokeWidth="2" />
            <line x1="260" y1="65" x2="360" y2="120" stroke="#475569" strokeWidth="2" />

            <text x="130" y="90" fill="#38bdf8" fontSize="10" fontWeight="bold">True (Left)</text>
            <text x="310" y="90" fill="#ec4899" fontSize="10" fontWeight="bold">False (Right)</text>

            {/* Left Child Node */}
            <rect x="30" y="120" width="150" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="105" y="138" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Left Node (N={leftItems.length})
            </text>
            <text x="105" y="154" fill="#cbd5e1" fontSize="9" textAnchor="middle">
              Gini: {leftGini.toFixed(3)}
            </text>
            <text x="105" y="168" fill="#94a3b8" fontSize="9" textAnchor="middle">
              App: {leftApp} | Rej: {leftRej}
            </text>

            {/* Right Child Node */}
            <rect x="280" y="120" width="150" height="60" rx="8" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
            <text x="355" y="138" fill="#ec4899" fontSize="10" fontWeight="bold" textAnchor="middle">
              Right Node (N={rightItems.length})
            </text>
            <text x="355" y="154" fill="#cbd5e1" fontSize="9" textAnchor="middle">
              Gini: {rightGini.toFixed(3)}
            </text>
            <text x="355" y="168" fill="#94a3b8" fontSize="9" textAnchor="middle">
              App: {rightApp} | Rej: {rightRej}
            </text>
          </svg>
        </div>

        {/* Impurity Math & Best Split */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impurity Calculation</span>

            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-400">Parent Gini:</span>
              <span className="font-mono font-bold text-white">{parentGini.toFixed(3)}</span>
            </div>

            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-400">Weighted Child Gini:</span>
              <span className="font-mono font-bold text-amber-300">{weightedGini.toFixed(3)}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-xs">
              <span className="text-emerald-400 font-semibold">Gini Impurity Gain (Δ):</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">+{giniGain.toFixed(3)}</span>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" /> Optimal Split Insight
            </div>
            Move the slider to find the threshold that maximizes <strong className="text-white">Gini Impurity Gain</strong> (around X ≈ 50). A decision tree searches over every unique continuous feature value to find this exact maximum.
          </div>
        </div>
      </div>
    </div>
  );
}
