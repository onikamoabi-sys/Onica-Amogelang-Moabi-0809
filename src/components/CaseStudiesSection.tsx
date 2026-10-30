import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  X,
  Image as ImageIcon,
  Edit2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CaseStudy } from '../types/portfolio';
import { InlineEditableText } from './InlineEditableText';
import { BackToTopButton } from './BackToTopButton';

interface CaseStudiesSectionProps {
  selectedStudyId?: string | null;
  onClearSelectedStudy?: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  selectedStudyId,
  onClearSelectedStudy
}) => {
  const { data, updateSettings, updateCaseStudy, openEditorToTab } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedStudyId) {
      const match = data.caseStudies.find(c => c.id === selectedStudyId);
      if (match) {
        setActiveModalStudy(match);
      }
    }
  }, [selectedStudyId, data.caseStudies]);

  const handleCloseModal = () => {
    setActiveModalStudy(null);
    if (onClearSelectedStudy) {
      onClearSelectedStudy();
    }
  };

  const categories = [
    'All',
    'Corporate Comms',
    'Digital Strategy',
    'Campaign Execution',
    'Community & Reputation',
    'PR & Media',
    'Speculative Concept'
  ];

  const filteredStudies =
    selectedCategory === 'All'
      ? data.caseStudies
      : data.caseStudies.filter(c => c.category === selectedCategory);

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="work" className="py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching category tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <InlineEditableText
                value={data.settings.workCategory || 'Selected Work · Proof of Impact'}
                onSave={(val) => updateSettings({ workCategory: val })}
                as="span"
                tooltip="Click to edit category tag"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
              <InlineEditableText
                value={data.settings.workTitle || 'Selected Work — Strategic Case Studies & Proof'}
                onSave={(val) => updateSettings({ workTitle: val })}
                as="span"
                tooltip="Click to edit heading"
              />
            </h2>
            <div className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              <InlineEditableText
                value={data.settings.workSubtitle || 'In-depth breakdowns demonstrating how strategic thinking, audience listening, and deliberate copywriting convert corporate priorities into measurable resonance.'}
                onSave={(val) => updateSettings({ workSubtitle: val })}
                multiline
                as="p"
                tooltip="Click to edit section description"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => {
            return (
              <div
                key={study.id}
                className="group rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Visual Image Banner with Change Image quick icon */}
                  {study.heroImage && (
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-5 group/img">
                      <img
                        src={study.heroImage}
                        alt={study.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono text-amber-400 uppercase font-semibold">
                        {study.clientOrOrg}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditorToTab('images');
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-950/80 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 opacity-0 group-hover/img:opacity-100 transition-opacity text-xs"
                        title="Change case image"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <InlineEditableText
                      value={study.clientOrOrg}
                      onSave={(val) => updateCaseStudy({ ...study, clientOrOrg: val })}
                      className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider"
                      tooltip="Click to edit organization"
                    />
                    <span className="text-[11px] font-mono text-zinc-400 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                      {study.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mb-2">
                    <InlineEditableText
                      value={study.title}
                      onSave={(val) => updateCaseStudy({ ...study, title: val })}
                      as="h3"
                      className="font-serif text-xl text-zinc-100 group-hover:text-amber-300 transition-colors font-normal leading-snug"
                      tooltip="Click to edit case title"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="text-xs text-zinc-400 mb-4 font-sans leading-relaxed">
                    <InlineEditableText
                      value={study.subtitle}
                      onSave={(val) => updateCaseStudy({ ...study, subtitle: val })}
                      as="p"
                      tooltip="Click to edit subtitle"
                    />
                  </div>

                  {/* Summary */}
                  <div className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6 font-sans">
                    <InlineEditableText
                      value={study.summary}
                      onSave={(val) => updateCaseStudy({ ...study, summary: val })}
                      multiline
                      tooltip="Click to edit summary"
                    />
                  </div>

                  {/* Value Proposition Pills */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      Recruiter Value Angle:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {study.whatThisSells.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                  <div className="text-[11px] font-mono text-zinc-400">
                    <InlineEditableText
                      value={study.period}
                      onSave={(val) => updateCaseStudy({ ...study, period: val })}
                      tooltip="Click to edit dates"
                    />
                  </div>

                  <button
                    onClick={() => setActiveModalStudy(study)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition group-hover:translate-x-1 cursor-pointer"
                  >
                    <span>Read Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>

      {/* Deep-Dive Case Study Modal with Click-to-Edit */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-10 shadow-2xl space-y-8 my-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    {activeModalStudy.clientOrOrg}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {activeModalStudy.period}
                  </span>
                </div>

                <InlineEditableText
                  value={activeModalStudy.title}
                  onSave={(val) => {
                    const updated = { ...activeModalStudy, title: val };
                    updateCaseStudy(updated);
                    setActiveModalStudy(updated);
                  }}
                  as="h2"
                  className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-100 font-light leading-snug"
                  tooltip="Click to edit title"
                />

                <InlineEditableText
                  value={activeModalStudy.subtitle}
                  onSave={(val) => {
                    const updated = { ...activeModalStudy, subtitle: val };
                    updateCaseStudy(updated);
                    setActiveModalStudy(updated);
                  }}
                  as="p"
                  className="text-sm text-zinc-400 font-sans leading-relaxed"
                  tooltip="Click to edit subtitle"
                />
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner image with Change Image CTA in modal */}
            {activeModalStudy.heroImage && (
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
                <img
                  src={activeModalStudy.heroImage}
                  alt={activeModalStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                
                <button
                  onClick={() => {
                    handleCloseModal();
                    openEditorToTab('images');
                  }}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 text-xs font-medium transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Change Project Image</span>
                </button>
              </div>
            )}

            {/* Quick Skills strip */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400 font-mono uppercase tracking-wider">
                Demonstrated Capabilities:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalStudy.whatThisSells.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 1: The Brief & Challenge */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>The Brief & Business Challenge</span>
              </h4>
              <div className="text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                <InlineEditableText
                  value={activeModalStudy.brief}
                  onSave={(val) => {
                    const updated = { ...activeModalStudy, brief: val };
                    updateCaseStudy(updated);
                    setActiveModalStudy(updated);
                  }}
                  multiline
                  tooltip="Click to edit brief"
                />
              </div>
            </div>

            {/* Section 2: Onica's Role & Contribution */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Onica's Contribution & Execution</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                {activeModalStudy.roleAndContribution.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="flex-1 leading-relaxed">
                      <InlineEditableText
                        value={item}
                        onSave={(val) => {
                          const nextRole = [...activeModalStudy.roleAndContribution];
                          nextRole[idx] = val;
                          const updated = { ...activeModalStudy, roleAndContribution: nextRole };
                          updateCaseStudy(updated);
                          setActiveModalStudy(updated);
                        }}
                        multiline
                        tooltip="Click to edit contribution point"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: Audience & Communication Strategy */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Audience Strategy & Framing</span>
              </h4>
              <div className="text-xs text-zinc-300 leading-relaxed font-sans bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                <InlineEditableText
                  value={activeModalStudy.audienceAndStrategy}
                  onSave={(val) => {
                    const updated = { ...activeModalStudy, audienceAndStrategy: val };
                    updateCaseStudy(updated);
                    setActiveModalStudy(updated);
                  }}
                  multiline
                  tooltip="Click to edit audience strategy"
                />
              </div>
            </div>

            {/* Section 4: Real Copy / Content Artifacts */}
            {activeModalStudy.sampleCopyOrContent.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  <span>Communication Deliverables & Copy Samples</span>
                </h4>

                <div className="space-y-3">
                  {activeModalStudy.sampleCopyOrContent.map((sample, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-200 font-semibold">
                            {sample.heading}
                          </span>
                          {sample.platform && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                              {sample.platform}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleCopyText(sample.body, idx)}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition cursor-pointer"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-line bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                        <InlineEditableText
                          value={sample.body}
                          onSave={(val) => {
                            const nextSamples = [...activeModalStudy.sampleCopyOrContent];
                            nextSamples[idx] = { ...nextSamples[idx], body: val };
                            const updated = { ...activeModalStudy, sampleCopyOrContent: nextSamples };
                            updateCaseStudy(updated);
                            setActiveModalStudy(updated);
                          }}
                          multiline
                          tooltip="Click to edit sample copy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Verified portfolio artifact · {activeModalStudy.clientOrOrg}
              </span>

              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
