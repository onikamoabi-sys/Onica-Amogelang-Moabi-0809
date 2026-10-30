import React, { useState, useEffect } from 'react';
import {
  Share2,
  Sliders,
  Check,
  Menu,
  X,
  Image as ImageIcon,
  Edit3
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { InlineEditableText } from './InlineEditableText';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const {
    data,
    updateSettings,
    setIsEditorOpen,
    generateShareLink,
    addToast,
    openEditorToTab,
    isClickToEditEnabled,
    toggleClickToEdit
  } = usePortfolio();
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact heading tabs matched dynamically to the section category names
  const navItems = [
    {
      id: 'home',
      label: data.settings.heroCategory?.split('·')[1]?.trim() || 'Professional Positioning',
      shortLabel: 'Positioning',
      categoryText: data.settings.heroCategory || 'Home · Professional Positioning'
    },
    {
      id: 'gallery',
      label: data.settings.galleryCategory?.split('·')[0]?.trim() || 'Work Gallery',
      shortLabel: 'Gallery',
      categoryText: data.settings.galleryCategory || 'Work Gallery · Visual Portfolio'
    },
    {
      id: 'work',
      label: data.settings.workCategory?.split('·')[0]?.trim() || 'Selected Work',
      shortLabel: 'Selected Work',
      categoryText: data.settings.workCategory || 'Selected Work · Proof of Impact'
    },
    {
      id: 'writing',
      label: data.settings.writingCategory?.split('·')[0]?.trim() || 'The Writing Room',
      shortLabel: 'Writing Room',
      categoryText: data.settings.writingCategory || 'The Writing Room · The Craft'
    },
    {
      id: 'notes',
      label: data.settings.notesCategory?.split('·')[0]?.trim() || 'The Edit',
      shortLabel: 'The Edit',
      categoryText: data.settings.notesCategory || 'The Edit · Point of View'
    },
    {
      id: 'archive',
      label: data.settings.archiveCategory?.split('·')[0]?.trim() || 'The Archive',
      shortLabel: 'Archive',
      categoryText: data.settings.archiveCategory || 'The Archive · Foundational Media'
    },
    {
      id: 'about',
      label: data.settings.aboutCategory?.split('·')[0]?.trim() || 'About / Credentials',
      shortLabel: 'Credentials',
      categoryText: data.settings.aboutCategory || 'About / Credentials · Background & References'
    },
  ];

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveTab]);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);

    const element = document.getElementById(tabId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyShareLink = async () => {
    const link = generateShareLink('recruiter');
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      addToast('Recruiter direct access link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      addToast(`Share link: ${link}`, 'info');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="text-left group shrink-0">
          <div className="flex items-center gap-2">
            <span
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <InlineEditableText
                value={data.settings.brandName || 'ONICA A. MOABI'}
                onSave={(val) => updateSettings({ brandName: val })}
                as="span"
                className="font-serif text-lg tracking-wider text-zinc-100 font-normal hover:text-amber-400 transition"
                tooltip="Click to edit name"
              />
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-zinc-400 uppercase">
              Portfolio
            </span>
          </div>
          <div className="text-[10px] tracking-widest font-mono text-amber-400/90 uppercase">
            <InlineEditableText
              value={data.settings.brandTitle || 'Communications Practitioner · Digital & PR'}
              onSave={(val) => updateSettings({ brandTitle: val })}
              as="p"
              tooltip="Click to edit title"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Click to Edit Text Mode Toggle */}
          <button
            onClick={toggleClickToEdit}
            title={isClickToEditEnabled ? 'Click-to-edit is ON: Click any text directly to edit it' : 'Click to enable click-to-edit'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
              isClickToEditEnabled
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 hover:bg-amber-500/25'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700/80 hover:text-zinc-200'
            }`}
          >
            <Edit3 className={`w-3.5 h-3.5 ${isClickToEditEnabled ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">Edit Text</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isClickToEditEnabled ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
              {isClickToEditEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Change Images Quick Button */}
          <button
            onClick={() => openEditorToTab('images')}
            title="Change images across portfolio"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:border-amber-400/60 hover:text-amber-300 transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Images</span>
          </button>

          {/* Share Recruiter Link */}
          <button
            onClick={handleCopyShareLink}
            title="Copy share link for recruiters"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:border-amber-400/60 hover:text-amber-300 transition cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          {/* Edit Portfolio Studio Toggle */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-200 border border-zinc-700 hover:border-amber-400/60 hover:text-amber-300 transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-sans hidden sm:inline">Studio</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Headings Bar - All section headings sit together with NO scrolling item */}
      <div className="border-t border-zinc-800/60 bg-[#09090b]/95 px-4 sm:px-6 lg:px-8 py-2.5">
        <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-start gap-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={item.categoryText}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-500/25 ring-1 ring-amber-400'
                    : 'text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile dropdown menu matching categories */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/98 px-4 pt-3 pb-6 space-y-2">
          <div className="text-[11px] font-mono uppercase text-amber-400/90 tracking-wider px-3 py-1">
            Sections · Categories
          </div>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-[10px] font-mono ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`}>
                  {item.categoryText.split('·')[1]?.trim()}
                </span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                toggleClickToEdit();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Click-to-Edit: {isClickToEditEnabled ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => {
                openEditorToTab('images');
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Images</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
