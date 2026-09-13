import { useState, useMemo } from 'react';
import { Sliders, Sparkles, BookOpen } from 'lucide-react';

type DistType = 'normal' | 'poisson' | 'binomial' | 'exponential';

export function DistributionsVisualizer() {
  const [distType, setDistType] = useState<DistType>('normal');

  // Normal params
  const [mu, setMu] = useState<number>(0);
  const [sigma, setSigma] = useState<number>(1);

  // Poisson param
  const [lambda, setLambda] = useState<number>(4);

  // Binomial params
  const [nTrials, setNTrials] = useState<number>(20);
  const [pSuccess, setPSuccess] = useState<number>(0.5);

  // Exponential param
  const [expLambda, setExpLambda] = useState<number>(1.2);

  // SVG dimensions
  const svgWidth = 460;
  const svgHeight = 220;
  const padding = 35;

  // Factorial helper
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  // Normal Distribution PDF path
  const normalPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const minX = -4;
    const maxX = 4;
    for (let x = minX; x <= maxX; x += 0.1) {
      const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
      const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      const svgX = padding + ((x - minX) / (maxX - minX)) * (svgWidth - padding * 2);
      const svgY = svgHeight - padding - (pdf / 0.9) * (svgHeight - padding * 2);
      pts.push({ x: svgX, y: Math.max(padding, svgY) });
    }
    return pts;
  }, [mu, sigma]);

  const normalPath = normalPoints.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  // Poisson bars
  const poissonBars = useMemo(() => {
    const bars: { k: number; prob: number; svgX: number; svgY: number; height: number }[] = [];
    const maxK = 14;
    for (let k = 0; k <= maxK; k++) {
      const prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
      const svgX = padding + (k / maxK) * (svgWidth - padding * 2);
      const barHeight = (prob / 0.4) * (svgHeight - padding * 2);
      const svgY = svgHeight - padding - barHeight;
      bars.push({ k, prob, svgX, svgY, height: Math.max(2, barHeight) });
    }
    return bars;
  }, [lambda]);

  // Binomial bars
  const binomialBars = useMemo(() => {
    const bars: { k: number; prob: number; svgX: number; svgY: number; height: number }[] = [];
    const maxK = nTrials;
    const nChooseK = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));
    for (let k = 0; k <= maxK; k++) {
      const prob = nChooseK(nTrials, k) * Math.pow(pSuccess, k) * Math.pow(1 - pSuccess, nTrials - k);
      const svgX = padding + (k / maxK) * (svgWidth - padding * 2);
      const barHeight = (prob / 0.4) * (svgHeight - padding * 2);
      const svgY = svgHeight - padding - barHeight;
      bars.push({ k, prob, svgX, svgY, height: Math.max(1, barHeight) });
    }
    return bars;
  }, [nTrials, pSuccess]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Interactive Probability Lab
            </span>
            <span className="text-xs text-slate-400">Parametric Density & Mass Functions</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Probability Distribution Visualizer</h4>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(['normal', 'poisson', 'binomial'] as DistType[]).map((type) => (
            <button
              key={type}
              onClick={() => setDistType(type)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                distType === type ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* SVG Curve Canvas */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-slate-400 font-mono">
              {distType === 'normal' && `Gaussian N(μ=${mu}, σ=${sigma})`}
              {distType === 'poisson' && `Poisson Process (λ=${lambda} events/interval)`}
              {distType === 'binomial' && `Binomial B(n=${nTrials}, p=${pSuccess})`}
            </span>
            <span className="text-indigo-400 font-mono font-semibold">
              {distType === 'normal' && `Mean: ${mu} | Var: ${(sigma * sigma).toFixed(2)}`}
              {distType === 'poisson' && `Mean: ${lambda} | Var: ${lambda} (Equidispersion)`}
              {distType === 'binomial' && `Mean: ${(nTrials * pSuccess).toFixed(1)} | Var: ${(nTrials * pSuccess * (1 - pSuccess)).toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-center">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[480px] select-none">
              {/* X and Y axes */}
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#475569" strokeWidth="1.2" />
              <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#475569" strokeWidth="1.2" />

              {/* Normal Distribution */}
              {distType === 'normal' && (
                <>
                  <path d={`${normalPath} L ${svgWidth - padding} ${svgHeight - padding} L ${padding} ${svgHeight - padding} Z`} fill="rgba(99, 102, 241, 0.15)" />
                  <path d={normalPath} fill="none" stroke="#818cf8" strokeWidth="2.5" />
                  {/* Mean vertical line */}
                  <line
                    x1={padding + ((mu - -4) / 8) * (svgWidth - padding * 2)}
                    y1={padding}
                    x2={padding + ((mu - -4) / 8) * (svgWidth - padding * 2)}
                    y2={svgHeight - padding}
                    stroke="#a5b4fc"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </>
              )}

              {/* Poisson Distribution */}
              {distType === 'poisson' && (
                poissonBars.map((b) => (
                  <g key={b.k}>
                    <rect x={b.svgX - 5} y={b.svgY} width="10" height={b.height} rx="2" fill="#818cf8" opacity="0.85" />
                    <text x={b.svgX} y={svgHeight - padding + 12} fill="#94a3b8" fontSize="8" textAnchor="middle">
                      {b.k}
                    </text>
                  </g>
                ))
              )}

              {/* Binomial Distribution */}
              {distType === 'binomial' && (
                binomialBars.map((b) => (
                  <g key={b.k}>
                    <rect x={b.svgX - 3} y={b.svgY} width="6" height={b.height} rx="1" fill="#818cf8" opacity="0.85" />
                  </g>
                ))
              )}

              <text x={svgWidth / 2} y={svgHeight - 6} fill="#94a3b8" fontSize="10" textAnchor="middle">
                Random Variable X (Outcome Value)
              </text>
            </svg>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 font-mono text-center">
            {distType === 'normal' && 'Continuous Bell Curve: Area under total curve integrates to exactly 1.0.'}
            {distType === 'poisson' && 'Discrete Event Counting: Mean equals Variance (λ). When λ > 10, converges to Normal.'}
            {distType === 'binomial' && 'Discrete Successes in n Fixed Independent Trials: When np >= 5, approaches Gaussian.'}
          </div>
        </div>

        {/* Sliders & Parametric Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-4">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Parameter Adjustment
            </span>

            {distType === 'normal' && (
              <>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="mu-slider" className="text-slate-400">Mean (μ):</label>
                    <span className="font-mono text-indigo-400 font-bold">{mu.toFixed(1)}</span>
                  </div>
                  <input
                    id="mu-slider"
                    type="range"
                    min="-2"
                    max="2"
                    step="0.2"
                    value={mu}
                    onChange={(e) => setMu(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="sigma-slider" className="text-slate-400">Std Dev (σ):</label>
                    <span className="font-mono text-indigo-400 font-bold">{sigma.toFixed(1)}</span>
                  </div>
                  <input
                    id="sigma-slider"
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={sigma}
                    onChange={(e) => setSigma(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </>
            )}

            {distType === 'poisson' && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="lambda-slider" className="text-slate-400">Arrival Rate (λ):</label>
                  <span className="font-mono text-indigo-400 font-bold">{lambda.toFixed(1)}</span>
                </div>
                <input
                  id="lambda-slider"
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={lambda}
                  onChange={(e) => setLambda(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            )}

            {distType === 'binomial' && (
              <>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="trials-slider" className="text-slate-400">Number of Trials (n):</label>
                    <span className="font-mono text-indigo-400 font-bold">{nTrials}</span>
                  </div>
                  <input
                    id="trials-slider"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={nTrials}
                    onChange={(e) => setNTrials(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="success-prob-slider" className="text-slate-400">Success Probability (p):</label>
                    <span className="font-mono text-indigo-400 font-bold">{pSuccess.toFixed(2)}</span>
                  </div>
                  <input
                    id="success-prob-slider"
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={pSuccess}
                    onChange={(e) => setPSuccess(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>

          <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-lg p-3 text-xs text-indigo-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> M.Tech Exam Insight
            </div>
            {distType === 'normal' && '68% of probability mass lies within μ ± 1σ, 95% lies within μ ± 2σ, and 99.7% lies within μ ± 3σ.'}
            {distType === 'poisson' && 'Poisson models count data like customer arrivals, website errors, and server requests. Notice how increasing λ shifts and flattens the peak.'}
            {distType === 'binomial' && 'When n is large and p is tiny such that np = λ remains moderate, the Binomial distribution converges cleanly to Poisson.'}
          </div>
        </div>
      </div>
    </div>
  );
}
