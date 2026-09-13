import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, SkipForward, RefreshCw, Info } from 'lucide-react';

interface Point {
  id: number;
  x: number;
  y: number;
  cluster: number; // -1 if unassigned
}

interface Centroid {
  id: number;
  x: number;
  y: number;
  color: string;
}

const CLUSTER_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'];

// Pre-seeded multi-cluster synthetic dataset
const INITIAL_POINTS: Point[] = [
  // Cluster A (top-left)
  { id: 1, x: 70, y: 80, cluster: -1 },
  { id: 2, x: 90, y: 110, cluster: -1 },
  { id: 3, x: 60, y: 120, cluster: -1 },
  { id: 4, x: 110, y: 70, cluster: -1 },
  { id: 5, x: 120, y: 130, cluster: -1 },
  // Cluster B (bottom-left)
  { id: 6, x: 80, y: 260, cluster: -1 },
  { id: 7, x: 110, y: 280, cluster: -1 },
  { id: 8, x: 70, y: 310, cluster: -1 },
  { id: 9, x: 130, y: 250, cluster: -1 },
  { id: 10, x: 100, y: 330, cluster: -1 },
  // Cluster C (right)
  { id: 11, x: 300, y: 160, cluster: -1 },
  { id: 12, x: 330, y: 190, cluster: -1 },
  { id: 13, x: 290, y: 220, cluster: -1 },
  { id: 14, x: 350, y: 150, cluster: -1 },
  { id: 15, x: 340, y: 230, cluster: -1 },
  { id: 16, x: 270, y: 180, cluster: -1 },
];

export function KMeansVisualizer() {
  const [k, setK] = useState<number>(3);
  const [step, setStep] = useState<number>(0);
  const [iteration, setIteration] = useState<number>(1);
  const [points, setPoints] = useState<Point[]>(INITIAL_POINTS);
  const [centroids, setCentroids] = useState<Centroid[]>([
    { id: 0, x: 50, y: 50, color: CLUSTER_COLORS[0] },
    { id: 1, x: 320, y: 300, color: CLUSTER_COLORS[1] },
    { id: 2, x: 200, y: 180, color: CLUSTER_COLORS[2] },
  ]);

  // Reset to initial state
  const handleReset = (newK = k) => {
    setStep(0);
    setIteration(1);
    setPoints(INITIAL_POINTS.map((p) => ({ ...p, cluster: -1 })));

    // Generate spread centroids
    const newCentroids: Centroid[] = [];
    const seeds = [
      { x: 90, y: 90 },
      { x: 320, y: 180 },
      { x: 100, y: 290 },
      { x: 250, y: 270 },
    ];
    for (let i = 0; i < newK; i++) {
      newCentroids.push({
        id: i,
        x: seeds[i]?.x || Math.random() * 300 + 50,
        y: seeds[i]?.y || Math.random() * 300 + 50,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      });
    }
    setCentroids(newCentroids);
  };

  // Step 1: Assign points to nearest centroid
  const assignClusters = () => {
    const updated = points.map((p) => {
      let minDist = Infinity;
      let closestCluster = 0;
      centroids.forEach((c) => {
        const d = Math.hypot(p.x - c.x, p.y - c.y);
        if (d < minDist) {
          minDist = d;
          closestCluster = c.id;
        }
      });
      return { ...p, cluster: closestCluster };
    });
    setPoints(updated);
    setStep(1);
  };

  // Step 2: Recompute centroids
  const recomputeCentroids = () => {
    const updatedCentroids = centroids.map((c) => {
      const assigned = points.filter((p) => p.cluster === c.id);
      if (assigned.length === 0) return c;
      const meanX = assigned.reduce((sum, p) => sum + p.x, 0) / assigned.length;
      const meanY = assigned.reduce((sum, p) => sum + p.y, 0) / assigned.length;
      return { ...c, x: Math.round(meanX), y: Math.round(meanY) };
    });
    setCentroids(updatedCentroids);
    setStep(2);
    setIteration((prev) => prev + 1);
  };

  // Calculate WCSS (Inertia)
  const wcss = useMemo(() => {
    if (step === 0) return 0;
    let sum = 0;
    points.forEach((p) => {
      if (p.cluster !== -1) {
        const c = centroids.find((cen) => cen.id === p.cluster);
        if (c) {
          sum += Math.round(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2));
        }
      }
    });
    return sum;
  }, [points, centroids, step]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Interactive Algorithm Explorer
            </span>
            <span className="text-xs text-slate-400">Voronoi Partitioning & Convergence</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">K-Means Clustering Simulation</h4>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Clusters (k):</span>
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setK(num);
                  handleReset(num);
                }}
                className={`px-2 py-0.5 rounded font-mono font-bold transition ${
                  k === num ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => (step === 1 ? recomputeCentroids() : assignClusters())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition shadow-sm"
          >
            <SkipForward className="w-3.5 h-3.5" />
            {step === 0 || step === 2 ? 'Assign to Centroids' : 'Recompute Means'}
          </button>

          <button
            onClick={() => handleReset()}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 2D Coordinate Canvas */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 420 380" className="w-full max-w-[440px] h-auto select-none">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="420" height="380" fill="url(#grid)" />

            {/* Connection lines from point to assigned centroid */}
            {step >= 1 &&
              points.map((p) => {
                const c = centroids.find((cen) => cen.id === p.cluster);
                if (!c) return null;
                return (
                  <line
                    key={`line-${p.id}`}
                    x1={p.x}
                    y1={p.y}
                    x2={c.x}
                    y2={c.y}
                    stroke={c.color}
                    strokeWidth="0.75"
                    strokeDasharray="2 2"
                    opacity="0.4"
                  />
                );
              })}

            {/* Data Points */}
            {points.map((p) => {
              const assignedCentroid = centroids.find((c) => c.id === p.cluster);
              const pointColor = assignedCentroid ? assignedCentroid.color : '#94a3b8';
              return (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill={pointColor}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
              );
            })}

            {/* Centroids */}
            {centroids.map((c) => (
              <g key={`centroid-${c.id}`} className="transition-all duration-500">
                {/* Pulsing ring */}
                <circle cx={c.x} cy={c.y} r="14" fill={c.color} opacity="0.2" className="animate-pulse" />
                {/* Centroid marker */}
                <circle cx={c.x} cy={c.y} r="8" fill={c.color} stroke="#ffffff" strokeWidth="2.5" />
                <text
                  x={c.x}
                  y={c.y + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  μ{c.id + 1}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute bottom-2 left-3 text-[11px] text-slate-400 font-mono">
            Iteration: <span className="text-white font-bold">{iteration}</span> | State:{' '}
            <span className="text-blue-400 font-bold">
              {step === 0 ? 'Centroid Seeding' : step === 1 ? 'Points Assigned' : 'Centroid Recalculated'}
            </span>
          </div>
        </div>

        {/* Algorithm Metrics & Interpretation */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Objective Function</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-blue-400">{wcss > 0 ? wcss.toLocaleString() : '—'}</span>
              <span className="text-xs text-slate-400">WCSS (Inertia)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Sum of squared Euclidean distances to assigned centroids. Decreases monotonically each iteration.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Centroid Coordinates</span>
            <div className="space-y-1.5">
              {centroids.map((c) => {
                const count = points.filter((p) => p.cluster === c.id).length;
                return (
                  <div key={c.id} className="flex items-center justify-between text-xs font-mono bg-slate-900/60 p-1.5 rounded">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-slate-300 font-bold">Centroid μ{c.id + 1}</span>
                    </div>
                    <span className="text-slate-400">
                      ({c.x}, {c.y}) • <span className="text-white font-semibold">{count} pts</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-800/40 rounded-lg p-3 text-xs text-blue-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-blue-300 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" /> Analyst Takeaway
            </div>
            Click <strong className="text-white">Assign</strong> then <strong className="text-white">Recompute Means</strong> to watch centroids migrate to the center of mass. Convergence occurs when centroids stop moving.
          </div>
        </div>
      </div>
    </div>
  );
}
