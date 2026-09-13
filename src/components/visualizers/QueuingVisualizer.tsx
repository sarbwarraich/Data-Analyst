import { useState, useMemo } from 'react';
import { Sliders, AlertOctagon, Activity, Users, Clock } from 'lucide-react';

export function QueuingVisualizer() {
  const [lambda, setLambda] = useState<number>(75); // arrivals per unit time
  const [mu, setMu] = useState<number>(90); // service rate per unit time

  const isStable = lambda < mu;
  const rho = mu > 0 ? lambda / mu : 1;

  // Steady-state metrics
  const { L, Lq, W, Wq } = useMemo(() => {
    if (!isStable) {
      return { L: Infinity, Lq: Infinity, W: Infinity, Wq: Infinity };
    }
    const L = rho / (1 - rho);
    const Lq = (rho * rho) / (1 - rho);
    const W = 1 / (mu - lambda);
    const Wq = rho / (mu - lambda);
    return { L, Lq, W, Wq };
  }, [lambda, mu, rho, isStable]);

  // Curve points showing L vs rho from 0.1 to 0.95
  const curvePoints = useMemo(() => {
    const pts: { r: number; val: number }[] = [];
    for (let r = 0.1; r <= 0.96; r += 0.05) {
      const length = r / (1 - r);
      pts.push({ r, val: Math.min(25, length) });
    }
    return pts;
  }, []);

  const svgWidth = 320;
  const svgHeight = 160;
  const padding = 25;

  const toX = (r: number) => padding + ((r - 0.1) / (0.95 - 0.1)) * (svgWidth - padding * 2);
  const toY = (val: number) => svgHeight - padding - (val / 20) * (svgHeight - padding * 2);

  const curvePath = curvePoints.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${toX(pt.r)} ${toY(pt.val)}` : `${acc} L ${toX(pt.r)} ${toY(pt.val)}`),
    ''
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Operations Research Simulator
            </span>
            <span className="text-xs text-slate-400">Little's Law: L = λW</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">M/M/1 Waiting Line & Server Utilization</h4>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isStable ? (
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                rho > 0.85
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                  : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Utilization (ρ): {(rho * 100).toFixed(1)}% {rho > 0.85 ? '(Heavy Load)' : '(Stable)'}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 bg-rose-950/60 text-rose-300 border border-rose-800/50">
              <AlertOctagon className="w-3.5 h-3.5" />
              UNSTABLE (ρ ≥ 1.0)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sliders & Parameters */}
        <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-between gap-4">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" /> Rates Configuration
          </span>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="arrival-rate-slider" className="text-slate-400">Arrival Rate (λ req/s):</label>
              <span className="font-mono text-purple-400 font-bold">{lambda}</span>
            </div>
            <input
              id="arrival-rate-slider"
              type="range"
              min="10"
              max="110"
              step="5"
              value={lambda}
              onChange={(e) => setLambda(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="service-rate-slider" className="text-slate-400">Service Rate (μ req/s):</label>
              <span className="font-mono text-emerald-400 font-bold">{mu}</span>
            </div>
            <input
              id="service-rate-slider"
              type="range"
              min="40"
              max="120"
              step="5"
              value={mu}
              onChange={(e) => setMu(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-900 p-2.5 rounded text-[11px] text-slate-300">
            Rule of stability: Arrivals must be strictly slower than server capacity (<strong className="text-white">λ &lt; μ</strong>).
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-purple-400" /> In System (L)
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {isStable ? L.toFixed(2) : '∞'} <span className="text-xs font-normal text-slate-400">cust</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">L = ρ / (1 - ρ)</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-400" /> In Queue (Lq)
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {isStable ? Lq.toFixed(2) : '∞'} <span className="text-xs font-normal text-slate-400">cust</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Lq = ρ² / (1 - ρ)</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" /> Total Time (W)
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {isStable ? `${(W * 1000).toFixed(0)} ms` : '∞'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">W = 1 / (μ - λ)</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" /> Queue Wait (Wq)
              </div>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {isStable ? `${(Wq * 1000).toFixed(0)} ms` : '∞'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Wq = ρ / (μ - λ)</div>
            </div>
          </div>

          {/* Asymptotic Explosion Curve */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Non-Linear Queue Explosion Curve
            </span>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />
              <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />

              {/* Curve */}
              <path d={curvePath} fill="none" stroke="#a855f7" strokeWidth="2" />

              {/* Current operating point */}
              {isStable && rho >= 0.1 && rho <= 0.95 && (
                <circle cx={toX(rho)} cy={toY(Math.min(20, L))} r="5" fill="#facc15" stroke="#7e22ce" strokeWidth="2" />
              )}

              <text x={svgWidth / 2} y={svgHeight - 4} fill="#94a3b8" fontSize="9" textAnchor="middle">
                Utilization ρ → 1.0 (Asymptote)
              </text>
              <text x={10} y={svgHeight / 2} fill="#94a3b8" fontSize="8" transform={`rotate(-90 10 ${svgHeight / 2})`} textAnchor="middle">
                Avg Queue Length L
              </text>
            </svg>

            <span className="text-[10px] text-amber-300/80 font-mono text-center">
              Notice: Moving from 80% to 90% utilization doubles your queue length!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
