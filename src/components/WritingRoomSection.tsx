import React, { useState } from 'react';
import {
  PenTool,
  Copy,
  Check,
  Target,
  Sparkles,
  Users
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { WritingSample } from '../types/portfolio';
import { InlineEditableText } from './InlineEditableText';
import { BackToTopButton } from './BackToTopButton';

export const WritingRoomSection: React.FC = () => {
  const { data, updateSettings, updateWritingSample, addToast } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<WritingSample['category']>('Social & Digital Copy');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: WritingSample['category'][] = [
    'Social & Digital Copy',
    'PR & Corporate Writing',
    'Stakeholder & Community',
    'Insights & Recommendations'
  ];

  const currentSamples = data.writingSamples.filter(s => s.category === activeCategory);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    addToast('Writing sample copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="writing" className="py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching heading tab category */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
            <PenTool className="w-3.5 h-3.5 shrink-0" />
            <InlineEditableText
              value={data.settings.writingCategory || 'The Writing Room · The Craft'}
              onSave={(val) => updateSettings({ writingCategory: val })}
              as="span"
              tooltip="Click to edit category tag"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
            <InlineEditableText
              value={data.settings.writingTitle || 'The Writing Room — The Craft of Written Communication'}
              onSave={(val) => updateSettings({ writingTitle: val })}
              as="span"
              tooltip="Click to edit heading"
            />
          </h2>
          <div className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            <InlineEditableText
              value={data.settings.writingSubtitle || 'Every sample below is framed with three essential strategic anchors: the intended audience, the business objective, and my direct editorial contribution.'}
              onSave={(val) => updateSettings({ writingSubtitle: val })}
              multiline
              as="p"
              tooltip="Click to edit section description"
            />
          </div>
        </div>

        {/* Category Tabs - All headings sit together with NO scrolling */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-zinc-800/70">
          {categories.map(cat => {
            const count = data.writingSamples.filter(s => s.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md shadow-amber-500/10'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Samples List with Click-to-Edit */}
        <div className="space-y-6">
          {currentSamples.map((sample) => (
            <article
              key={sample.id}
              className="rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-300 space-y-6"
            >
              {/* Header metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800/60 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <InlineEditableText
                      value={sample.platformOrChannel}
                      onSave={(val) => updateWritingSample({ ...sample, platformOrChannel: val })}
                      className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold"
                      tooltip="Click to edit platform"
                    />
                    <span className="text-zinc-600">•</span>
                    <InlineEditableText
                      value={sample.dateOrEra}
                      onSave={(val) => updateWritingSample({ ...sample, dateOrEra: val })}
                      className="text-xs font-mono text-zinc-400"
                      tooltip="Click to edit date"
                    />
                  </div>
                  <InlineEditableText
                    value={sample.title}
                    onSave={(val) => updateWritingSample({ ...sample, title: val })}
                    as="h3"
                    className="font-serif text-xl sm:text-2xl text-zinc-100 font-normal"
                    tooltip="Click to edit title"
                  />
                </div>

                <button
                  onClick={() => handleCopy(sample.content, sample.id)}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-medium text-zinc-300 transition cursor-pointer"
                >
                  {copiedId === sample.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Full Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* The 3 Critical Strategic Anchors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Target Audience</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <InlineEditableText
                      value={sample.targetAudience}
                      onSave={(val) => updateWritingSample({ ...sample, targetAudience: val })}
                      multiline
                      tooltip="Click to edit target audience"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    <span>Business Objective</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <InlineEditableText
                      value={sample.objective}
                      onSave={(val) => updateWritingSample({ ...sample, objective: val })}
                      multiline
                      tooltip="Click to edit business objective"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>My Editorial Contribution</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <InlineEditableText
                      value={sample.contribution}
                      onSave={(val) => updateWritingSample({ ...sample, contribution: val })}
                      multiline
                      tooltip="Click to edit editorial contribution"
                    />
                  </div>
                </div>
              </div>

              {/* The Sample Content */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Copy Body (Click to edit text)
                </span>
                <div className="text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed whitespace-pre-line italic">
                  <InlineEditableText
                    value={sample.content}
                    onSave={(val) => updateWritingSample({ ...sample, content: val })}
                    multiline
                    tooltip="Click to edit sample body copy"
                  />
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>
    </section>
  );
};
