import { useState } from 'react';
import { Sparkles, Brain, ArrowRight, Info } from 'lucide-react';

type GateKey = 'forget' | 'input' | 'cell_state' | 'output';

interface GateInfo {
  name: string;
  math: string;
  role: string;
  analogy: string;
}

const GATES: Record<GateKey, GateInfo> = {
  forget: {
    name: 'Forget Gate (f_t)',
    math: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)',
    role: 'Applies a Sigmoid function [0, 1] elementwise to determine how much of the old memory C_{t-1} to erase.',
    analogy: 'Reading a new sentence: when a new grammatical subject appears, the forget gate discards the gender of the previous subject.',
  },
  input: {
    name: 'Input Gate (i_t) & Candidate (C̃_t)',
    math: 'i_t = \\sigma(W_i [h_{t-1}, x_t]),\\quad \\tilde{C}_t = \\tanh(W_c [h_{t-1}, x_t])',
    role: 'Input gate chooses which features to update; candidate creates a new vector of potential values scaled by tanh [-1, 1].',
    analogy: 'Deciding what new adjectives or attributes from the current word are important enough to commit to long-term memory.',
  },
  cell_state: {
    name: 'Cell State Highway (C_t)',
    math: 'C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t',
    role: 'The linear conveyor belt running down the entire chain with minimal non-linear degradation (avoids vanishing gradients).',
    analogy: 'The master hard-drive of the model. Gradients flow directly back through additive operations without repeatedly multiplying by small weight matrices.',
  },
  output: {
    name: 'Output Gate (o_t) & Hidden State (h_t)',
    math: 'o_t = \\sigma(W_o [h_{t-1}, x_t]),\\quad h_t = o_t \\odot \\tanh(C_t)',
    role: 'Filters the current cell state through tanh and scales by the output gate to emit prediction h_t for this time step.',
    analogy: 'Formulating the immediate verbal answer based on your overall knowledge base.',
  },
};

export function LSTMVisualizer() {
  const [selectedGate, setSelectedGate] = useState<GateKey>('forget');
  const gate = GATES[selectedGate];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Deep Learning Architecture
            </span>
            <span className="text-xs text-slate-400">Recurrent Sequential Memory</span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">LSTM Cell Gate Architecture</h4>
        </div>

        {/* Gate Selectors */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(Object.keys(GATES) as GateKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedGate(key)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition ${
                selectedGate === key ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {key.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Schematic Diagram */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center">
          <svg viewBox="0 0 520 260" className="w-full max-w-[500px] select-none">
            {/* Cell Box Outline */}
            <rect x="70" y="30" width="380" height="200" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Cell State Top Line (C_{t-1} to C_t) */}
            <line x1="20" y1="60" x2="500" y2="60" stroke="#f43f5e" strokeWidth="3" />
            <text x="35" y="52" fill="#f43f5e" fontSize="10" fontWeight="bold">C(t-1)</text>
            <text x="470" y="52" fill="#f43f5e" fontSize="10" fontWeight="bold">C(t)</text>

            {/* Pointwise Multiplication node (Forget Gate effect) */}
            <circle
              cx="160"
              cy="60"
              r="14"
              fill={selectedGate === 'forget' || selectedGate === 'cell_state' ? '#e11d48' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="2"
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedGate('forget')}
            />
            <text x="160" y="64" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">×</text>

            {/* Pointwise Addition node (Input Gate effect) */}
            <circle
              cx="290"
              cy="60"
              r="14"
              fill={selectedGate === 'input' || selectedGate === 'cell_state' ? '#e11d48' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="2"
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedGate('input')}
            />
            <text x="290" y="64" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">+</text>

            {/* Forget Gate Box (σ) */}
            <rect
              x="140"
              y="140"
              width="40"
              height="35"
              rx="6"
              fill={selectedGate === 'forget' ? '#f43f5e' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedGate('forget')}
            />
            <text x="160" y="162" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">σ (f)</text>
            <line x1="160" y1="140" x2="160" y2="74" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

            {/* Input Gate Box (σ) & Candidate Box (tanh) */}
            <rect
              x="250"
              y="140"
              width="36"
              height="35"
              rx="6"
              fill={selectedGate === 'input' ? '#f43f5e' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedGate('input')}
            />
            <text x="268" y="162" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">σ (i)</text>

            <rect
              x="300"
              y="140"
              width="45"
              height="35"
              rx="6"
              fill={selectedGate === 'input' ? '#f43f5e' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedGate('input')}
            />
            <text x="322" y="162" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">tanh</text>

            {/* Output Gate Box (σ) */}
            <rect
              x="390"
              y="140"
              width="40"
              height="35"
              rx="6"
              fill={selectedGate === 'output' ? '#f43f5e' : '#1e293b'}
              stroke="#f43f5e"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedGate('output')}
            />
            <text x="410" y="162" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">σ (o)</text>

            {/* Hidden state input and current token input (h_{t-1}, x_t) */}
            <line x1="20" y1="210" x2="410" y2="210" stroke="#38bdf8" strokeWidth="2" />
            <text x="25" y="202" fill="#38bdf8" fontSize="10" fontWeight="bold">h(t-1)</text>

            <line x1="100" y1="250" x2="100" y2="210" stroke="#38bdf8" strokeWidth="2" />
            <text x="90" y="258" fill="#38bdf8" fontSize="10" fontWeight="bold">x(t)</text>

            {/* Hidden state output */}
            <line x1="410" y1="140" x2="410" y2="90" stroke="#38bdf8" strokeWidth="2" />
            <line x1="410" y1="90" x2="500" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="470" y="82" fill="#38bdf8" fontSize="10" fontWeight="bold">h(t)</text>
          </svg>

          <span className="text-[11px] text-slate-400 font-mono mt-2">
            Click on any gate block (σ, tanh, ×, +) to inspect its mathematical role.
          </span>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Gate Inspector</span>
            <h5 className="text-base font-bold text-white mt-0.5">{gate.name}</h5>

            <div className="mt-2.5 p-2 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-rose-300">
              {gate.math}
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">{gate.role}</p>
          </div>

          <div className="bg-rose-950/20 border border-rose-800/40 rounded-lg p-3 text-xs text-rose-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
              <Brain className="w-3.5 h-3.5" /> Intuitive Analogy
            </div>
            {gate.analogy}
          </div>
        </div>
      </div>
    </div>
  );
}
