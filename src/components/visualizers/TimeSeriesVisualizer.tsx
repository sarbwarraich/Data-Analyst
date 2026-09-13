import { useState, useMemo } from 'react';
import { Sliders, ToggleLeft, ToggleRight, Sparkles, TrendingUp } from 'lucide-react';

export function TimeSeriesVisualizer() {
  const [trendSlope, setTrendSlope] = useState<number>(0.6);
  const [seasonalAmp, setSeasonalAmp] = useState<number>(14);
  const [noiseLevel, setNoiseLevel] = useState<number>(5);
  const [applyDifferencing, setApplyDifferencing] = useState<boolean>(false);

  const numPoints = 50;

  // Generate synthetic time series components
  const seriesData = useMemo(() => {
    const raw: number[] = [];
    const trend: number[] = [];
    const seasonal: number[] = [];
    const noise: number[] = [];

    for (let t = 0; t < numPoints; t++) {
      const tr = 20 + trendSlope * t * 2;
      const se = seasonalAmp * Math.sin((2 * Math.PI * t) / 12);
      const no = (Math.sin(t * 7.3) * 0.7 + Math.cos(t * 3.1) * 0.3) * noiseLevel;
      const y = tr + se + no;

      trend.push(tr);
      seasonal.push(se);
      noise.push(no);
      raw.push(y);
    }

    // Differenced series (d = 1): ΔY_t = Y_t - Y_{t-1}
    const diff: number[] = [0];
    for (let t = 1; t < numPoints; t++) {
      diff.push(raw[t] - raw[t - 1]);
    }

    return { raw, trend, seasonal, noise, diff };
  }, [trendSlope, seasonalAmp, noiseLevel]);

  const svgWidth = 460;
  const svgHeight = 110;
  const padding = 25;

  const makePath = (data: number[], minVal: number, maxVal: number) => {
    const range = maxVal - minVal || 1;
    return data.reduce((acc, val, idx) => {
      const x = padding + (idx / (numPoints - 1)) * (svgWidth - padding * 2);
      const y = svgHeight - padding - ((val - minVal) / range) * (svgHeight - padding * 2);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  const displayedSeries = applyDifferencing ? seriesData.diff : seriesData.raw;
  const minDisp = Math.min(...displayedSeries) - 2;
  const maxDisp = Math.max(...displayedSeries) + 2;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Interactive Decomposition Lab
            </span>
            <span className="text-xs text-slate-400">Y(t) = Trend + Seasonality + Noise</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Time Series Decomposition & Differencing</h4>
        </div>

        {/* Differencing Switch */}
        <button
          onClick={() => setApplyDifferencing(!applyDifferencing)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
            applyDifferencing
              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {applyDifferencing ? <ToggleRight className="w-4 h-4 text-rose-400" /> : <ToggleLeft className="w-4 h-4" />}
          First Difference d=1 ({applyDifferencing ? 'Active - Stationary' : 'Raw - Trending'})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Graph & Component Graphs */}
        <div className="lg:col-span-8 space-y-3">
          {/* Primary View */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-300">
                {applyDifferencing ? 'Differenced Stationary Series ΔY_t (d=1)' : 'Observed Combined Series Y(t)'}
              </span>
              <span className="font-mono text-rose-400 text-[11px]">
                {applyDifferencing ? 'ADF p-value < 0.01 (Stationary)' : 'ADF p-value = 0.68 (Unit Root Non-Stationary)'}
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full select-none">
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />
              <path d={makePath(displayedSeries, minDisp, maxDisp)} fill="none" stroke="#f43f5e" strokeWidth="2.2" />
            </svg>
          </div>

          {/* Sub-Components Decomposition */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Trend T(t)</div>
              <svg viewBox="0 0 140 40" className="w-full">
                <line x1="5" y1="35" x2="135" y2="5" stroke="#38bdf8" strokeWidth="1.8" />
              </svg>
              <div className="text-[9px] text-slate-400 font-mono mt-1">Linear drift</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Seasonality S(t)</div>
              <svg viewBox="0 0 140 40" className="w-full">
                <path d="M 5 20 Q 25 5, 45 20 T 85 20 T 125 20" fill="none" stroke="#a855f7" strokeWidth="1.8" />
              </svg>
              <div className="text-[9px] text-slate-400 font-mono mt-1">12-Period cycle</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Residuals ε(t)</div>
              <svg viewBox="0 0 140 40" className="w-full">
                <path d="M 5 20 L 20 12 L 35 25 L 50 10 L 65 22 L 80 15 L 95 28 L 110 18 L 125 22" fill="none" stroke="#34d399" strokeWidth="1.2" />
              </svg>
              <div className="text-[9px] text-slate-400 font-mono mt-1">White noise error</div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-between gap-4">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-rose-400" /> Dynamics Tuning
          </span>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="trend-slope-slider" className="text-slate-400">Trend Slope:</label>
              <span className="font-mono text-sky-400 font-bold">{trendSlope.toFixed(2)}</span>
            </div>
            <input
              id="trend-slope-slider"
              type="range"
              min="0"
              max="1.2"
              step="0.1"
              value={trendSlope}
              onChange={(e) => setTrendSlope(parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="seasonal-amplitude-slider" className="text-slate-400">Seasonal Amplitude:</label>
              <span className="font-mono text-purple-400 font-bold">{seasonalAmp}</span>
            </div>
            <input
              id="seasonal-amplitude-slider"
              type="range"
              min="0"
              max="25"
              step="2"
              value={seasonalAmp}
              onChange={(e) => setSeasonalAmp(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="noise-level-slider" className="text-slate-400">Noise Level:</label>
              <span className="font-mono text-emerald-400 font-bold">{noiseLevel}</span>
            </div>
            <input
              id="noise-level-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="bg-rose-950/20 border border-rose-800/40 p-2.5 rounded text-[11px] text-rose-200/90 leading-relaxed">
            <strong className="text-white">Why differencing matters:</strong> Toggle <span className="underline">First Difference (d=1)</span>. Observe how the upward drift collapses to oscillations around a zero mean, meeting weak stationarity criteria for ARIMA modeling.
          </div>
        </div>
      </div>
    </div>
  );
}
