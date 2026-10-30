import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export interface InlineEditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div' | 'li';
  multiline?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onSave,
  as: Component = 'span',
  multiline = false,
  className = '',
  inputClassName = '',
  placeholder = 'Click to edit...',
  tooltip = 'Click to edit text directly',
  disabled = false,
  children
}) => {
  const { isClickToEditEnabled, addToast } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with prop changes when not actively editing
  useEffect(() => {
    if (!isEditing) {
      setCurrentValue(value);
    }
  }, [value, isEditing]);

  // Focus and select input on open
  useEffect(() => {
    if (isEditing) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        // Adjust height
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
      } else if (!multiline && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  // Handle click outside to auto-save
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, currentValue, value]);

  const handleStartEdit = (e: React.MouseEvent) => {
    if (disabled || !isClickToEditEnabled) return;
    e.stopPropagation();
    setIsEditing(true);
    setCurrentValue(value);
  };

  const handleSave = () => {
    const trimmed = currentValue.trim();
    if (trimmed !== value) {
      onSave(trimmed);
      addToast('Text updated and saved.', 'success');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    } else if (e.key === 'Enter') {
      if (!multiline) {
        e.preventDefault();
        handleSave();
      } else if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        handleSave();
      }
    }
  };

  // If editing mode is active for this element
  if (isEditing) {
    return (
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative inline-block w-full my-1 z-30"
      >
        <div className="rounded-xl border-2 border-amber-400 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-md">
          {multiline ? (
            <textarea
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => {
                setCurrentValue(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={3}
              className={`w-full bg-zinc-900/90 text-zinc-100 rounded-lg p-2.5 text-sm sm:text-base border border-zinc-700 focus:outline-none focus:border-amber-400 font-sans resize-y leading-relaxed ${inputClassName}`}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full bg-zinc-900/90 text-zinc-100 rounded-lg px-3 py-2 text-sm sm:text-base border border-zinc-700 focus:outline-none focus:border-amber-400 font-sans ${inputClassName}`}
            />
          )}

          {/* Quick Action controls */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="text-zinc-500 hidden sm:inline">
              {multiline ? 'Press Cmd/Ctrl+Enter or click Save' : 'Press Enter or click Save'}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition cursor-pointer text-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 shadow-sm transition cursor-pointer text-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Text</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not editing view:
  if (!isClickToEditEnabled || disabled) {
    return <Component className={className}>{children || value}</Component>;
  }

  return (
    <Component
      onClick={handleStartEdit}
      title={tooltip}
      className={`relative group/editable cursor-pointer transition-all duration-200 rounded px-1 -mx-1 hover:bg-amber-400/10 hover:outline hover:outline-1 hover:outline-dashed hover:outline-amber-400/70 inline-block ${className}`}
    >
      <span>{children || value}</span>
      <span className="inline-flex items-center ml-1.5 opacity-0 group-hover/editable:opacity-100 text-amber-400 transition-opacity duration-150 align-baseline pointer-events-none">
        <Edit2 className="w-3 h-3" />
      </span>
    </Component>
  );
};
