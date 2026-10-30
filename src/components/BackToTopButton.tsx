import React from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  label?: string;
  className?: string;
  variant?: 'button' | 'compact' | 'bar';
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  label = 'Back to top',
  className = '',
  variant = 'button'
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (variant === 'bar') {
    return (
      <div className={`mt-12 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span className="text-zinc-400">Onica A. Moabi · Portfolio</span>
        </div>
        <button
          type="button"
          onClick={handleScrollToTop}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-zinc-800 hover:border-amber-400/50 transition-all cursor-pointer group shadow-sm text-xs"
          title="Return to the top of the page"
          aria-label="Scroll back to top of page"
        >
          <span>{label}</span>
          <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-zinc-800 hover:border-amber-400/50 transition-all cursor-pointer group shadow-sm text-xs font-mono tracking-wide ${className}`}
      title="Return to the top of the page"
      aria-label="Scroll back to top of page"
    >
      <span>{label}</span>
      <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
