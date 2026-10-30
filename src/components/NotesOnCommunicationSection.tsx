import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Quote,
  X,
  Share2,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CommunicationNote } from '../types/portfolio';
import { InlineEditableText } from './InlineEditableText';
import { BackToTopButton } from './BackToTopButton';

export const NotesOnCommunicationSection: React.FC = () => {
  const { data, updateSettings, updateNote, addToast } = usePortfolio();
  const [selectedNote, setSelectedNote] = useState<CommunicationNote | null>(null);

  const handleShareArticle = (note: CommunicationNote) => {
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: note.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${note.title} — By Onica Moabi: ${window.location.href}`);
      addToast('Article link copied to clipboard', 'success');
    }
  };

  return (
    <section id="notes" className="py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching category tag */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <InlineEditableText
              value={data.settings.notesCategory || 'The Edit · Point of View'}
              onSave={(val) => updateSettings({ notesCategory: val })}
              as="span"
              tooltip="Click to edit category tag"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
            <InlineEditableText
              value={data.settings.notesTitle || 'The Edit — Notes on Communication'}
              onSave={(val) => updateSettings({ notesTitle: val })}
              as="span"
              tooltip="Click to edit heading"
            />
          </h2>
          <div className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            <InlineEditableText
              value={data.settings.notesSubtitle || 'Short, critical essays demonstrating strategic judgement, brand reputation awareness, and what it takes to make communication genuinely human.'}
              onSave={(val) => updateSettings({ notesSubtitle: val })}
              multiline
              as="p"
              tooltip="Click to edit section description"
            />
          </div>
        </div>

        {/* Articles Grid with Click-to-Edit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.notes.map((note) => (
            <div
              key={note.id}
              className="group rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 sm:p-7 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-zinc-800/60">
                  <InlineEditableText
                    value={note.category}
                    onSave={(val) => updateNote({ ...note, category: val as CommunicationNote['category'] })}
                    className="text-amber-400 uppercase tracking-wider font-semibold"
                    tooltip="Click to edit category"
                  />
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <InlineEditableText
                      value={note.readTime}
                      onSave={(val) => updateNote({ ...note, readTime: val })}
                      tooltip="Click to edit read time"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2">
                  <InlineEditableText
                    value={note.title}
                    onSave={(val) => updateNote({ ...note, title: val })}
                    as="h3"
                    className="font-serif text-xl sm:text-2xl text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug font-normal"
                    tooltip="Click to edit essay title"
                  />
                </div>

                {/* Subtitle */}
                <div className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  <InlineEditableText
                    value={note.subtitle}
                    onSave={(val) => updateNote({ ...note, subtitle: val })}
                    as="p"
                    tooltip="Click to edit subtitle"
                  />
                </div>

                {/* Pull Quote Box */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 mb-5 relative">
                  <Quote className="w-4 h-4 text-amber-500/40 mb-1" />
                  <div className="text-xs text-zinc-300 italic font-serif leading-relaxed">
                    <InlineEditableText
                      value={note.highlightQuote}
                      onSave={(val) => updateNote({ ...note, highlightQuote: val })}
                      multiline
                      tooltip="Click to edit highlight quote"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                  <InlineEditableText
                    value={note.summary}
                    onSave={(val) => updateNote({ ...note, summary: val })}
                    multiline
                    tooltip="Click to edit summary"
                  />
                </div>
              </div>

              {/* Action trigger */}
              <div className="pt-4 border-t border-zinc-800/70 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">
                  {note.date}
                </span>

                <button
                  onClick={() => setSelectedNote(note)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition group-hover:translate-x-1 cursor-pointer"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>

      {/* Full Article Reader Modal with Click-to-Edit */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-10 shadow-2xl space-y-8 my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-wider font-medium">
                    {selectedNote.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedNote.readTime}
                  </span>
                </div>

                <InlineEditableText
                  value={selectedNote.title}
                  onSave={(val) => {
                    const updated = { ...selectedNote, title: val };
                    updateNote(updated);
                    setSelectedNote(updated);
                  }}
                  as="h2"
                  className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-light leading-snug"
                  tooltip="Click to edit title"
                />

                <InlineEditableText
                  value={selectedNote.subtitle}
                  onSave={(val) => {
                    const updated = { ...selectedNote, subtitle: val };
                    updateNote(updated);
                    setSelectedNote(updated);
                  }}
                  as="p"
                  className="text-sm text-zinc-400 font-sans leading-relaxed"
                  tooltip="Click to edit subtitle"
                />
              </div>

              <button
                onClick={() => setSelectedNote(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Pull Quote */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center">
              <Quote className="w-6 h-6 text-amber-400 mx-auto mb-2 opacity-60" />
              <div className="text-base sm:text-lg font-serif italic text-zinc-200 leading-relaxed max-w-xl mx-auto">
                <InlineEditableText
                  value={selectedNote.highlightQuote}
                  onSave={(val) => {
                    const updated = { ...selectedNote, highlightQuote: val };
                    updateNote(updated);
                    setSelectedNote(updated);
                  }}
                  multiline
                  tooltip="Click to edit highlight quote"
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400/80 mt-3">
                — Onica Amogelang Moabi
              </p>
            </div>

            {/* Essay Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              {selectedNote.content.map((para, i) => (
                <div key={i} className="leading-relaxed">
                  <InlineEditableText
                    value={para}
                    onSave={(val) => {
                      const newContent = [...selectedNote.content];
                      newContent[i] = val;
                      const updated = { ...selectedNote, content: newContent };
                      updateNote(updated);
                      setSelectedNote(updated);
                    }}
                    multiline
                    tooltip="Click to edit paragraph"
                  />
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <BookmarkCheck className="w-4 h-4" />
                <span>Executive Summary & Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {selectedNote.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <InlineEditableText
                      value={item}
                      onSave={(val) => {
                        const nextTakeaways = [...selectedNote.keyTakeaways];
                        nextTakeaways[idx] = val;
                        const updated = { ...selectedNote, keyTakeaways: nextTakeaways };
                        updateNote(updated);
                        setSelectedNote(updated);
                      }}
                      multiline
                      tooltip="Click to edit takeaway point"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
              <button
                onClick={() => handleShareArticle(selectedNote)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </button>

              <button
                onClick={() => setSelectedNote(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
