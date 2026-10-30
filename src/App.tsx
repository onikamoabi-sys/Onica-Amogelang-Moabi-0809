import React, { useState, useEffect } from 'react';
import {
  PortfolioProvider,
  usePortfolio
} from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkGalleryPage } from './components/WorkGalleryPage';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { WritingRoomSection } from './components/WritingRoomSection';
import { NotesOnCommunicationSection } from './components/NotesOnCommunicationSection';
import { ArchiveSection } from './components/ArchiveSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';
import { PrivateGateModal } from './components/PrivateGateModal';
import { SpirographMotif } from './components/SpirographMotif';
import { InlineEditableText } from './components/InlineEditableText';
import {
  Sliders,
  Share2,
  X,
  Mail,
  Linkedin,
  ArrowUp,
  ShieldCheck,
  Image as ImageIcon,
  Edit3
} from 'lucide-react';

const PortfolioContent: React.FC = () => {
  const {
    data,
    updateSettings,
    isUnlocked,
    setIsEditorOpen,
    openEditorToTab,
    toasts,
    removeToast,
    generateShareLink,
    addToast,
    isClickToEditEnabled,
    toggleClickToEdit
  } = usePortfolio();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStudyIdForModal, setSelectedStudyIdForModal] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Active scroll listener to keep heading tabs in sync with the section currently in view and toggle to-top button
  useEffect(() => {
    const sectionIds = ['home', 'gallery', 'work', 'writing', 'notes', 'archive', 'about'];
    let timeoutId: number | null = null;

    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        timeoutId = null;
        setShowBackToTop(window.scrollY > 250);
        const scrollPosition = window.scrollY + 160;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveTab(id);
            break;
          }
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareLink = () => {
    const link = generateShareLink('recruiter');
    navigator.clipboard.writeText(link);
    addToast('Recruiter link copied! Anyone with this link can view the portfolio.', 'success');
  };

  const handleSelectCaseStudyFromGallery = (studyId: string) => {
    setSelectedStudyIdForModal(studyId);
    setActiveTab('work');
    const el = document.getElementById('work');
    if (el) {
      const navOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleNavigateFromHero = (tabId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) {
      const navOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (!isUnlocked) {
    return <PrivateGateModal />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-amber-500/25 selection:text-amber-200 relative overflow-x-hidden">
      
      {/* Top Header with heading tabs matching each section category */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Rendered across all matching sections */}
      <main>
        {/* Section 1: Home · Professional Positioning */}
        <Hero onNavigate={handleNavigateFromHero} />

        {/* Section 2: Work Gallery · Visual Portfolio */}
        <WorkGalleryPage onSelectCaseStudy={handleSelectCaseStudyFromGallery} />

        {/* Section 3: Selected Work · Proof of Impact */}
        <CaseStudiesSection
          selectedStudyId={selectedStudyIdForModal}
          onClearSelectedStudy={() => setSelectedStudyIdForModal(null)}
        />

        {/* Section 4: The Writing Room · The Craft */}
        <WritingRoomSection />

        {/* Section 5: The Edit · Point of View */}
        <NotesOnCommunicationSection />

        {/* Section 6: The Archive · Foundational Media */}
        <ArchiveSection />

        {/* Section 7: About / Credentials · Background */}
        <AboutSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-16 relative overflow-hidden">
        {/* Subtle decorative spirograph in footer */}
        <div className="absolute left-1/2 -bottom-36 -translate-x-1/2 opacity-25 pointer-events-none">
          <SpirographMotif size={600} color="gold" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-800/70">
            <div className="space-y-2 text-center md:text-left">
              <div className="font-serif text-2xl text-zinc-100 font-light tracking-wide">
                <InlineEditableText
                  value={data.settings.brandName || 'ONICA A. MOABI'}
                  onSave={(val) => updateSettings({ brandName: val })}
                  as="span"
                  tooltip="Click to edit name"
                />
              </div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                <InlineEditableText
                  value={data.settings.brandTitle || 'Communications Practitioner · Corporate Communications · Digital & PR'}
                  onSave={(val) => updateSettings({ brandTitle: val })}
                  as="p"
                  tooltip="Click to edit title"
                />
              </div>
              <div className="text-xs text-zinc-400 max-w-md font-sans">
                <InlineEditableText
                  value={data.settings.footerTagline || 'Good communication doesn’t just tell a story. It makes the story matter.'}
                  onSave={(val) => updateSettings({ footerTagline: val })}
                  multiline
                  as="p"
                  tooltip="Click to edit footer thesis"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openEditorToTab('images')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                title="Change portfolio images"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Images</span>
              </button>

              <button
                onClick={handleShareLink}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Recruiter Pass</span>
              </button>

              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <InlineEditableText
                value={data.settings.footerNotice || 'Private Portfolio Edition · Built for Recruiter Review'}
                onSave={(val) => updateSettings({ footerNotice: val })}
                as="span"
                tooltip="Click to edit edition notice"
              />
            </div>

            <div className="flex items-center gap-6">
              <a
                href={data.settings.contactLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${data.settings.contactEmail}`}
                className="hover:text-amber-300 transition flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Onica</span>
              </a>
              <button
                onClick={() => setIsEditorOpen(true)}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Edit Studio
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ring-1 ring-amber-300 animate-in fade-in"
            title="Scroll back to top of page"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">To Top</span>
          </button>
        )}
        <button
          onClick={toggleClickToEdit}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border text-xs font-medium shadow-2xl transition hover:scale-105 cursor-pointer backdrop-blur-md ${
            isClickToEditEnabled
              ? 'bg-amber-400 text-zinc-950 font-semibold border-amber-300 shadow-amber-500/20'
              : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:text-white'
          }`}
          title="Click any text on the page to edit it directly"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Click-to-Edit:</span>
          <span>{isClickToEditEnabled ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium text-xs tracking-wider shadow-2xl transition hover:scale-105 cursor-pointer"
          title="Edit and customize portfolio details"
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Edit Studio</span>
        </button>
      </div>

      {/* Portfolio Editor Studio Modal */}
      <PortfolioEditorModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl border text-xs font-medium shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-700/60 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-700/60 text-rose-200'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-700/60 text-amber-200'
                : 'bg-zinc-900/90 border-zinc-700/60 text-zinc-200'
            }`}
          >
            <span>{toast.text}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-100 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
