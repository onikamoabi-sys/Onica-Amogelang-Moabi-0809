import React, { useState } from 'react';
import {
  Grid,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Search,
  ExternalLink,
  Target,
  CheckCircle2,
  X,
  FileCheck,
  TrendingUp,
  LayoutGrid,
  Columns
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CaseStudy } from '../types/portfolio';
import { BackToTopButton } from './BackToTopButton';

interface ProjectGalleryProps {
  onSelectCaseStudy?: (study: CaseStudy) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectCaseStudy }) => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');
  const [quickPreviewStudy, setQuickPreviewStudy] = useState<CaseStudy | null>(null);

  const categories = [
    'All',
    'Corporate Comms',
    'Digital Strategy',
    'Campaign Execution',
    'Community & Reputation',
    'PR & Media',
    'Speculative Concept'
  ];

  const filteredStudies = data.caseStudies.filter(study => {
    const matchesCat = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.clientOrOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.whatThisSells.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getDeliverableBadge = (id: string) => {
    switch (id) {
      case 'sasol-corporate-storytelling':
        return '50+ External Releases';
      case 'sasol-social-listening-insights':
        return 'Talkwalker & Hootsuite';
      case 'sasol-foundation-skills-competition':
        return '3-Stage Live Campaign';
      case 'sasol-community-management-reputation':
        return 'Reputation & Escalation';
      case 'instinctif-corporate-toolkit':
        return 'Capital Markets PR';
      case 'empowerartisan-speculative-concept':
        return '360° Concept Blueprint';
      default:
        return 'Flagship Deliverable';
    }
  };

  return (
    <section id="gallery" className="py-20 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
              <LayoutGrid className="w-3.5 h-3.5" />
              Project Gallery · Visual Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
              Visual Case Study Gallery
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Scan strategic projects at a glance through visual thumbnails, deliverable snapshots, and core recruiter value propositions.
            </p>
          </div>

          {/* Search & Layout View Toggles */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-48 sm:w-60 bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-amber-500/60"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('grid')}
                title="3-Column Visual Grid"
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                title="2-Column Detailed View"
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar - All headings sit together with NO scrolling */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-zinc-800/60">
          {categories.map(cat => {
            const count =
              cat === 'All'
                ? data.caseStudies.length
                : data.caseStudies.filter(c => c.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="group rounded-2xl border border-zinc-800/90 bg-[#121216] overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                  <img
                    src={study.heroImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80'}
                    alt={study.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-700/60 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      {study.clientOrOrg}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-[10px] font-sans text-zinc-300">
                      {study.category}
                    </span>
                  </div>

                  {/* Bottom Thumbnail Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/90 text-zinc-950 text-[11px] font-mono font-medium shadow-md">
                      <Sparkles className="w-3 h-3" />
                      {getDeliverableBadge(study.id)}
                    </span>

                    <button
                      onClick={() => setQuickPreviewStudy(study)}
                      className="p-1.5 rounded-lg bg-zinc-950/80 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 backdrop-blur-md border border-zinc-700 transition cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug font-normal">
                    {study.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                    {study.subtitle}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2 pt-1 border-t border-zinc-800/60">
                    {study.summary}
                  </p>

                  {/* Value Proposition Pills */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {study.whatThisSells.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Trigger Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                <button
                  onClick={() => setQuickPreviewStudy(study)}
                  className="text-xs font-mono text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick View</span>
                </button>

                <button
                  onClick={() => {
                    if (onSelectCaseStudy) {
                      onSelectCaseStudy(study);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition group-hover:translate-x-1 cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredStudies.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-zinc-800 text-zinc-400 text-sm space-y-2">
              <p>No project case studies match your search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-400 underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>

      {/* Quick Preview Slide-Over Modal */}
      {quickPreviewStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                    {quickPreviewStudy.clientOrOrg}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {quickPreviewStudy.category}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-zinc-100 font-light">
                  {quickPreviewStudy.title}
                </h3>
              </div>

              <button
                onClick={() => setQuickPreviewStudy(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Banner */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <img
                src={quickPreviewStudy.heroImage}
                alt={quickPreviewStudy.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-md bg-amber-500 text-zinc-950 text-xs font-mono font-medium">
                  {getDeliverableBadge(quickPreviewStudy.id)}
                </span>
              </div>
            </div>

            {/* Brief & Summary */}
            <div className="space-y-3">
              <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                {quickPreviewStudy.brief}
              </p>
            </div>

            {/* Core Deliverables list */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Key Deliverables Snapshot
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {quickPreviewStudy.keyDeliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What this sells */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                Demonstrated Value for Recruiters:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPreviewStudy.whatThisSells.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setQuickPreviewStudy(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 transition cursor-pointer"
              >
                Close Preview
              </button>

              <button
                onClick={() => {
                  const target = quickPreviewStudy;
                  setQuickPreviewStudy(null);
                  if (onSelectCaseStudy) {
                    onSelectCaseStudy(target);
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
              >
                <span>Open Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
