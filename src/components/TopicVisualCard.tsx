import { useState } from 'react';
import { TopicVisual } from '../types/curriculum';
import { Eye, Image as ImageIcon, Maximize2, X, Sparkles, Compass } from 'lucide-react';

interface Props {
  visual: TopicVisual;
  topicTitle: string;
}

export function TopicVisualCard({ visual, topicTitle }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 rounded-2xl p-5 md:p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 shadow-xl light:shadow-sm transition-all overflow-hidden group">
        <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 dark:text-indigo-300 light:text-indigo-600 border border-indigo-500/30">
                  {visual.badge || 'Visual Architecture'}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                  Concept Illustration
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white dark:text-white light:text-slate-900 mt-0.5">
                Visual Framework: {topicTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
            title="Expand image fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enlarge</span>
          </button>
        </div>

        {/* Visual Image Container with Apple-style subtle border & frosted overlay */}
        <div
          onClick={() => setIsFullscreen(true)}
          className="relative rounded-xl overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 cursor-pointer group/img"
        >
          {/* Skeleton placeholder while image loads */}
          {!imageLoaded && (
            <div className="h-64 w-full animate-pulse bg-slate-800/50 flex items-center justify-center text-slate-500 text-xs">
              Loading conceptual diagram...
            </div>
          )}

          <img
            src={visual.imageUrl}
            alt={visual.caption}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-64 md:h-80 object-cover object-center transition-transform duration-500 group-hover/img:scale-[1.03] ${
              imageLoaded ? 'block' : 'hidden'
            }`}
          />

          {/* Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Overlay Tag */}
          <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white dark:text-white light:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 shadow-sm flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Architecture & Blueprint</span>
          </div>

          {/* Hover hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5" /> Click for High-Res View
            </span>
          </div>

          {/* Caption banner along bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed drop-shadow-md">
              {visual.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                  {visual.badge}
                </span>
                <h4 className="text-base font-bold text-white">{topicTitle}</h4>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto bg-slate-950 p-2 flex items-center justify-center">
              <img
                src={visual.imageUrl}
                alt={visual.caption}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300">
              {visual.caption}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
