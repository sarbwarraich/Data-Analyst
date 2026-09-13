import { useState } from 'react';
import { BarChart, Flame, Activity, Box, Info } from 'lucide-react';

type ChartMode = 'hist' | 'heatmap' | 'scatter' | 'boxplot';

export function EDAVisualizer() {
  const [chartMode, setChartMode] = useState<ChartMode>('hist');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Visual Analytics Suite
            </span>
            <span className="text-xs text-slate-400">Distribution, Correlation & Outlier Anatomy</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">Exploratory Data Analysis (EDA) Interactive Workbench</h4>
        </div>

        {/* Chart Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setChartMode('hist')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
              chartMode === 'hist' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart className="w-3.5 h-3.5" /> Histogram + KDE
          </button>
          <button
            onClick={() => setChartMode('heatmap')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
              chartMode === 'heatmap' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Corr Heatmap
          </button>
          <button
            onClick={() => setChartMode('scatter')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
              chartMode === 'scatter' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Scatter + OLS
          </button>
          <button
            onClick={() => setChartMode('boxplot')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
              chartMode === 'boxplot' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Boxplot (IQR)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Canvas View */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center min-h-[260px]">
          {chartMode === 'hist' && (
            <svg viewBox="0 0 460 220" className="w-full max-w-[460px] select-none">
              <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="180" stroke="#334155" strokeWidth="1.5" />

              {/* Histogram Bins */}
              {[
                { x: 50, h: 25 }, { x: 85, h: 55 }, { x: 120, h: 90 }, { x: 155, h: 125 },
                { x: 190, h: 135 }, { x: 225, h: 110 }, { x: 260, h: 80 }, { x: 295, h: 45 },
                { x: 330, h: 25 }, { x: 365, h: 12 }, { x: 400, h: 5 }
              ].map((b, i) => (
                <rect key={i} x={b.x} y={180 - b.h} width="32" height={b.h} fill="#38bdf8" opacity="0.6" rx="2" stroke="#0284c7" />
              ))}

              {/* KDE Smooth Curve Overlay */}
              <path
                d="M 50 165 C 100 130, 150 50, 195 45 C 240 50, 290 120, 360 165 C 390 172, 410 178, 430 179"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />

              <text x="230" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">Customer Age (Years)</text>
              <text x="15" y="105" fill="#94a3b8" fontSize="9" transform="rotate(-90 15 105)" textAnchor="middle">Density / Frequency</text>
            </svg>
          )}

          {chartMode === 'heatmap' && (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
                <div className="p-2 text-slate-400 font-bold">Feature</div>
                <div className="p-2 text-slate-400 text-center font-bold">Age</div>
                <div className="p-2 text-slate-400 text-center font-bold">Income</div>
                <div className="p-2 text-slate-400 text-center font-bold">Spend</div>

                <div className="p-2 text-slate-400 font-bold">Age</div>
                <div className="p-2 rounded bg-sky-600/80 text-white font-bold text-center">1.00</div>
                <div className="p-2 rounded bg-sky-800/60 text-sky-200 text-center">0.68</div>
                <div className="p-2 rounded bg-rose-900/40 text-rose-300 text-center">-0.32</div>

                <div className="p-2 text-slate-400 font-bold">Income</div>
                <div className="p-2 rounded bg-sky-800/60 text-sky-200 text-center">0.68</div>
                <div className="p-2 rounded bg-sky-600/80 text-white font-bold text-center">1.00</div>
                <div className="p-2 rounded bg-sky-700/50 text-sky-200 text-center">0.45</div>

                <div className="p-2 text-slate-400 font-bold">Spend</div>
                <div className="p-2 rounded bg-rose-900/40 text-rose-300 text-center">-0.32</div>
                <div className="p-2 rounded bg-sky-700/50 text-sky-200 text-center">0.45</div>
                <div className="p-2 rounded bg-sky-600/80 text-white font-bold text-center">1.00</div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono mt-2">Diverging Pearson Correlation Matrix r ∈ [-1, +1]</span>
            </div>
          )}

          {chartMode === 'scatter' && (
            <svg viewBox="0 0 460 220" className="w-full max-w-[460px] select-none">
              <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="180" stroke="#334155" strokeWidth="1.5" />

              {/* OLS Linear Regression Trendline */}
              <line x1="50" y1="160" x2="400" y2="50" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Scatter Points with Random Jitter around trendline */}
              {[
                { x: 70, y: 155 }, { x: 90, y: 140 }, { x: 110, y: 148 }, { x: 130, y: 130 },
                { x: 150, y: 120 }, { x: 170, y: 135 }, { x: 190, y: 110 }, { x: 210, y: 95 },
                { x: 230, y: 105 }, { x: 250, y: 90 }, { x: 270, y: 80 }, { x: 290, y: 95 },
                { x: 310, y: 70 }, { x: 340, y: 65 }, { x: 360, y: 55 }, { x: 380, y: 60 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.2" />
              ))}

              <text x="230" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">Marketing Spend ($k)</text>
              <text x="15" y="105" fill="#94a3b8" fontSize="9" transform="rotate(-90 15 105)" textAnchor="middle">Quarterly Revenue ($k)</text>
            </svg>
          )}

          {chartMode === 'boxplot' && (
            <svg viewBox="0 0 460 220" className="w-full max-w-[460px] select-none">
              <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="1.5" />

              {/* Left Whisker (Min non-outlier: Q1 - 1.5 IQR) */}
              <line x1="80" y1="110" x2="140" y2="110" stroke="#94a3b8" strokeWidth="2" />
              <line x1="80" y1="85" x2="80" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <text x="80" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle font-mono">Q1 - 1.5×IQR</text>

              {/* Interquartile Range Box [Q1, Q3] */}
              <rect x="140" y="70" width="160" height="80" rx="4" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />

              {/* Median Line Q2 */}
              <line x1="210" y1="70" x2="210" y2="150" stroke="#f59e0b" strokeWidth="3" />
              <text x="210" y="60" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Median Q2</text>

              {/* Right Whisker (Q3 + 1.5 IQR) */}
              <line x1="300" y1="110" x2="360" y2="110" stroke="#94a3b8" strokeWidth="2" />
              <line x1="360" y1="85" x2="360" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <text x="360" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle font-mono">Q3 + 1.5×IQR</text>

              {/* Outlier Points */}
              <circle cx="410" cy="110" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
              <text x="410" y="95" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Outlier</text>

              <text x="230" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">Tukey Box-and-Whisker 5-Number Summary</text>
            </svg>
          )}
        </div>

        {/* Insight Commentary */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
              {chartMode === 'hist' && 'Univariate Distribution'}
              {chartMode === 'heatmap' && 'Multivariate Correlation'}
              {chartMode === 'scatter' && 'Bivariate Linear Association'}
              {chartMode === 'boxplot' && 'Outlier Anatomy & Fences'}
            </span>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {chartMode === 'hist' &&
                'Histograms group continuous data into equal-width bins. Overlaying a Kernel Density Estimate (KDE) reveals multi-modal peaks and skewness that standard means hide.'}
              {chartMode === 'heatmap' &&
                'Correlation heatmaps highlight multicollinearity before modeling. Two features with r > 0.8 should rarely be fed into linear models simultaneously.'}
              {chartMode === 'scatter' &&
                'Scatter plots reveal non-linear curvatures, heteroscedastic fan-shaped variance, and influential leverage points.'}
              {chartMode === 'boxplot' &&
                'The Tukey Boxplot visually displays the 5-number summary: Min, Q1 (25th), Median (50th), Q3 (75th), and Max fence. Data points beyond the 1.5×IQR whiskers are explicitly flagged as outliers.'}
            </p>
          </div>

          <div className="bg-sky-950/20 border border-sky-800/40 rounded-lg p-3 text-xs text-sky-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-sky-300 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" /> Visual Encoding Rule
            </div>
            Always match chart selection to variable cardinality. Never use pie charts for more than 3 slices, and always anchor bar chart baselines at zero.
          </div>
        </div>
      </div>
    </div>
  );
}
