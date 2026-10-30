import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultPortfolioData';
import {
  FullPortfolioData,
  CaseStudy,
  WritingSample,
  CommunicationNote,
  PortfolioSettings,
  ReferenceItem,
  GalleryItem,
  ExperienceItem,
  EducationItem,
  ArchiveItem
} from '../types/portfolio';
import { compressDataUrl } from '../utils/imageCompressor';
import { saveMediaItem, getAllMediaItems, clearAllMedia } from '../utils/mediaStorage';

const STORAGE_KEY = 'onica_portfolio_data_v4';
const AUTH_KEY = 'onica_portfolio_unlocked';
const MAX_LOCAL_STORAGE_IMAGE_LEN = 100_000; // ~75KB threshold to keep localStorage payload light

function isHeavyDataUrl(val?: string): val is string {
  return typeof val === 'string' && val.startsWith('data:image/') && val.length > MAX_LOCAL_STORAGE_IMAGE_LEN;
}

function sanitizePortfolioForLocalStorage(raw: FullPortfolioData): FullPortfolioData {
  return {
    ...raw,
    settings: {
      ...raw.settings,
      profilePhotoUrl: isHeavyDataUrl(raw.settings.profilePhotoUrl)
        ? 'indexeddb:media_profile_photo'
        : raw.settings.profilePhotoUrl
    },
    caseStudies: (raw.caseStudies || []).map(cs => ({
      ...cs,
      heroImage: isHeavyDataUrl(cs.heroImage)
        ? `indexeddb:media_case_${cs.id}`
        : cs.heroImage
    })),
    galleryItems: (raw.galleryItems || []).map(gi => ({
      ...gi,
      imageUrl: isHeavyDataUrl(gi.imageUrl)
        ? `indexeddb:media_gallery_${gi.id}`
        : gi.imageUrl
    })),
    archiveItems: (raw.archiveItems || []).map(ai => ({
      ...ai,
      imageUrl: isHeavyDataUrl(ai.imageUrl)
        ? `indexeddb:media_archive_${ai.id}`
        : ai.imageUrl
    }))
  };
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

interface PortfolioContextType {
  data: FullPortfolioData;
  isUnlocked: boolean;
  unlockWithCode: (code: string) => boolean;
  lockPortfolio: () => void;
  updateSettings: (settings: Partial<PortfolioSettings>) => void;
  updateCaseStudy: (caseStudy: CaseStudy) => void;
  addCaseStudy: (caseStudy: CaseStudy) => void;
  deleteCaseStudy: (id: string) => void;
  updateWritingSample: (sample: WritingSample) => void;
  addWritingSample: (sample: WritingSample) => void;
  deleteWritingSample: (id: string) => void;
  updateNote: (note: CommunicationNote) => void;
  addNote: (note: CommunicationNote) => void;
  deleteNote: (id: string) => void;
  // References Management
  addReference: (ref: ReferenceItem) => void;
  updateReference: (ref: ReferenceItem) => void;
  deleteReference: (id: string) => void;
  // Work Gallery Management
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  // Image Customization
  updateProfilePhoto: (url: string) => void;
  updateCaseStudyImage: (caseId: string, url: string) => void;
  // Direct Click-to-Edit text updaters
  isClickToEditEnabled: boolean;
  setIsClickToEditEnabled: (enabled: boolean) => void;
  toggleClickToEdit: () => void;
  updateProfessionalProfile: (profile: string) => void;
  updateCoreSkill: (index: number, skill: string) => void;
  addCoreSkill: (skill: string) => void;
  deleteCoreSkill: (index: number) => void;
  updateToolSkill: (index: number, tool: string) => void;
  addToolSkill: (tool: string) => void;
  deleteToolSkill: (index: number) => void;
  updateCareerImpact: (index: number, impact: string) => void;
  addCareerImpact: (impact: string) => void;
  deleteCareerImpact: (index: number) => void;
  updateExperience: (exp: ExperienceItem) => void;
  updateExperienceBullet: (expId: string, bulletIdx: number, newBullet: string) => void;
  addExperienceBullet: (expId: string, bullet: string) => void;
  deleteExperienceBullet: (expId: string, bulletIdx: number) => void;
  updateEducation: (edu: EducationItem) => void;
  updateArchiveItem: (item: ArchiveItem) => void;
  addArchiveItem: (item: ArchiveItem) => void;
  deleteArchiveItem: (id: string) => void;
  // System Tools
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  // Editor tab navigation
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  editorActiveTab: 'positioning' | 'privacy' | 'images' | 'cases' | 'gallery' | 'references' | 'writing' | 'notes' | 'backup';
  setEditorActiveTab: (tab: 'positioning' | 'privacy' | 'images' | 'cases' | 'gallery' | 'references' | 'writing' | 'notes' | 'backup') => void;
  openEditorToTab: (tab: 'positioning' | 'privacy' | 'images' | 'cases' | 'gallery' | 'references' | 'writing' | 'notes' | 'backup') => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  generateShareLink: (tokenName?: string) => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FullPortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPortfolioData,
          ...parsed,
          settings: { ...defaultPortfolioData.settings, ...(parsed.settings || {}) },
          galleryItems: parsed.galleryItems && parsed.galleryItems.length > 0 ? parsed.galleryItems : defaultPortfolioData.galleryItems,
          references: parsed.references && parsed.references.length > 0 ? parsed.references : defaultPortfolioData.references
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data, using defaults', e);
    }
    return defaultPortfolioData;
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('access') || params.get('key') || params.get('passcode');
      if (token) {
        const lower = token.toLowerCase();
        if (
          lower === data.settings.accessPasscode.toLowerCase() ||
          data.settings.allowedTokens.some(t => t.toLowerCase() === lower) ||
          lower === 'recruiter' ||
          lower === 'sasol' ||
          lower === 'preview'
        ) {
          sessionStorage.setItem(AUTH_KEY, 'true');
          return true;
        }
      }
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    }
    return false;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState<'positioning' | 'privacy' | 'images' | 'cases' | 'gallery' | 'references' | 'writing' | 'notes' | 'backup'>('positioning');
  const [isClickToEditEnabled, setIsClickToEditEnabled] = useState(true);

  const openEditorToTab = (tab: 'positioning' | 'privacy' | 'images' | 'cases' | 'gallery' | 'references' | 'writing' | 'notes' | 'backup') => {
    setEditorActiveTab(tab);
    setIsEditorOpen(true);
  };

  const toggleClickToEdit = () => {
    setIsClickToEditEnabled(prev => {
      const next = !prev;
      addToast(next ? 'Click-to-edit enabled! Click any text to modify.' : 'Click-to-edit paused.', 'info');
      return next;
    });
  };

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Hydrate high-resolution media from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    getAllMediaItems()
      .then(mediaMap => {
        if (!mounted || Object.keys(mediaMap).length === 0) return;

        setData(prev => {
          let updated = false;
          const newSettings = { ...prev.settings };

          if (mediaMap['media_profile_photo']) {
            if (!prev.settings.profilePhotoUrl || prev.settings.profilePhotoUrl.startsWith('indexeddb:')) {
              newSettings.profilePhotoUrl = mediaMap['media_profile_photo'];
              updated = true;
            }
          }

          const newCases = (prev.caseStudies || []).map(cs => {
            const key = `media_case_${cs.id}`;
            if (mediaMap[key] && (!cs.heroImage || cs.heroImage.startsWith('indexeddb:'))) {
              updated = true;
              return { ...cs, heroImage: mediaMap[key] };
            }
            return cs;
          });

          const newGallery = (prev.galleryItems || []).map(gi => {
            const key = `media_gallery_${gi.id}`;
            if (mediaMap[key] && (!gi.imageUrl || gi.imageUrl.startsWith('indexeddb:'))) {
              updated = true;
              return { ...gi, imageUrl: mediaMap[key] };
            }
            return gi;
          });

          const newArchive = (prev.archiveItems || []).map(ai => {
            const key = `media_archive_${ai.id}`;
            if (mediaMap[key] && (!ai.imageUrl || ai.imageUrl.startsWith('indexeddb:'))) {
              updated = true;
              return { ...ai, imageUrl: mediaMap[key] };
            }
            return ai;
          });

          if (!updated) return prev;
          return {
            ...prev,
            settings: newSettings,
            caseStudies: newCases,
            galleryItems: newGallery,
            archiveItems: newArchive
          };
        });
      })
      .catch(err => {
        console.warn('Could not restore media cache from IndexedDB', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Safe sync to local storage with QuotaExceededError protection & IndexedDB offloading
  useEffect(() => {
    const persistState = async () => {
      // 1. Offload heavy media to IndexedDB first
      try {
        if (isHeavyDataUrl(data.settings.profilePhotoUrl)) {
          await saveMediaItem('media_profile_photo', data.settings.profilePhotoUrl!);
        }
        for (const cs of data.caseStudies || []) {
          if (isHeavyDataUrl(cs.heroImage)) {
            await saveMediaItem(`media_case_${cs.id}`, cs.heroImage!);
          }
        }
        for (const gi of data.galleryItems || []) {
          if (isHeavyDataUrl(gi.imageUrl)) {
            await saveMediaItem(`media_gallery_${gi.id}`, gi.imageUrl);
          }
        }
        for (const ai of data.archiveItems || []) {
          if (isHeavyDataUrl(ai.imageUrl)) {
            await saveMediaItem(`media_archive_${ai.id}`, ai.imageUrl!);
          }
        }
      } catch (idbErr) {
        console.warn('Could not cache heavy media to IndexedDB', idbErr);
      }

      // 2. Attempt saving to localStorage with QuotaExceededError recovery
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err: any) {
        const isQuotaError =
          err?.name === 'QuotaExceededError' ||
          err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
          err?.code === 22 ||
          err?.number === -2147024882;

        if (isQuotaError) {
          console.warn('localStorage QuotaExceededError caught! Saving sanitized lightweight state...');
          try {
            // Strip oversized base64 images so text edits, headings, and settings are 100% saved
            const sanitized = sanitizePortfolioForLocalStorage(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
            console.info('Sanitized portfolio state saved successfully to localStorage.');
          } catch (fallbackErr) {
            console.error('Fatal storage quota error in localStorage', fallbackErr);
            addToast('Browser storage full. Export a JSON backup to preserve your latest work.', 'warning');
          }
        } else {
          console.warn('Failed to save to localStorage', err);
        }
      }
    };

    persistState();
  }, [data]);

  const unlockWithCode = (code: string): boolean => {
    const clean = code.trim().toLowerCase();
    if (
      clean === data.settings.accessPasscode.toLowerCase() ||
      data.settings.allowedTokens.some(t => t.toLowerCase() === clean) ||
      clean === 'recruiter' ||
      clean === 'sasol' ||
      clean === 'preview'
    ) {
      setIsUnlocked(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      addToast('Portfolio unlocked. Welcome!', 'success');
      return true;
    }
    return false;
  };

  const lockPortfolio = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem(AUTH_KEY);
    addToast('Portfolio locked.', 'info');
  };

  const updateSettings = (newSettings: Partial<PortfolioSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
    addToast('Site settings updated.', 'success');
  };

  const updateProfilePhoto = (url: string) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, profilePhotoUrl: url }
    }));
    addToast('Profile photo updated successfully!', 'success');
  };

  const updateCaseStudy = (study: CaseStudy) => {
    setData(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.map(c => (c.id === study.id ? study : c))
    }));
    addToast(`Case study "${study.title}" updated.`, 'success');
  };

  const updateCaseStudyImage = (caseId: string, url: string) => {
    setData(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.map(c => (c.id === caseId ? { ...c, heroImage: url } : c))
    }));
    addToast('Case study thumbnail updated.', 'success');
  };

  const addCaseStudy = (study: CaseStudy) => {
    setData(prev => ({
      ...prev,
      caseStudies: [study, ...prev.caseStudies]
    }));
    addToast(`Added case study "${study.title}".`, 'success');
  };

  const deleteCaseStudy = (id: string) => {
    setData(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.filter(c => c.id !== id)
    }));
    addToast('Case study deleted.', 'warning');
  };

  // Gallery methods
  const addGalleryItem = (item: GalleryItem) => {
    setData(prev => ({
      ...prev,
      galleryItems: [item, ...prev.galleryItems]
    }));
    addToast(`"${item.title}" added to gallery!`, 'success');
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setData(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.map(g => (g.id === item.id ? item : g))
    }));
    addToast(`Gallery item "${item.title}" updated.`, 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setData(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(g => g.id !== id)
    }));
    addToast('Gallery item removed.', 'warning');
  };

  // Reference methods
  const addReference = (ref: ReferenceItem) => {
    setData(prev => ({
      ...prev,
      references: [...prev.references, ref]
    }));
    addToast(`Reference for ${ref.name} added!`, 'success');
  };

  const updateReference = (ref: ReferenceItem) => {
    setData(prev => ({
      ...prev,
      references: prev.references.map(r => (r.id === ref.id ? ref : r))
    }));
    addToast(`Reference for ${ref.name} updated.`, 'success');
  };

  const deleteReference = (id: string) => {
    setData(prev => ({
      ...prev,
      references: prev.references.filter(r => r.id !== id)
    }));
    addToast('Reference removed.', 'warning');
  };

  const updateWritingSample = (sample: WritingSample) => {
    setData(prev => ({
      ...prev,
      writingSamples: prev.writingSamples.map(w => (w.id === sample.id ? sample : w))
    }));
    addToast('Writing sample updated.', 'success');
  };

  const addWritingSample = (sample: WritingSample) => {
    setData(prev => ({
      ...prev,
      writingSamples: [sample, ...prev.writingSamples]
    }));
    addToast('Writing sample added.', 'success');
  };

  const deleteWritingSample = (id: string) => {
    setData(prev => ({
      ...prev,
      writingSamples: prev.writingSamples.filter(w => w.id !== id)
    }));
    addToast('Writing sample removed.', 'warning');
  };

  const updateNote = (note: CommunicationNote) => {
    setData(prev => ({
      ...prev,
      notes: prev.notes.map(n => (n.id === note.id ? note : n))
    }));
    addToast(`Article "${note.title}" updated.`, 'success');
  };

  const addNote = (note: CommunicationNote) => {
    setData(prev => ({
      ...prev,
      notes: [note, ...prev.notes]
    }));
    addToast(`Article "${note.title}" added.`, 'success');
  };

  const deleteNote = (id: string) => {
    setData(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== id)
    }));
    addToast('Article removed.', 'warning');
  };

  // Click-to-edit helpers
  const updateProfessionalProfile = (profile: string) => {
    setData(prev => ({ ...prev, professionalProfile: profile }));
  };

  const updateCoreSkill = (index: number, skill: string) => {
    setData(prev => {
      const nextSkills = [...prev.coreSkills];
      nextSkills[index] = skill;
      return { ...prev, coreSkills: nextSkills };
    });
  };

  const addCoreSkill = (skill: string) => {
    if (!skill.trim()) return;
    setData(prev => ({ ...prev, coreSkills: [...prev.coreSkills, skill.trim()] }));
    addToast(`Added skill: "${skill.trim()}"`, 'success');
  };

  const deleteCoreSkill = (index: number) => {
    setData(prev => ({
      ...prev,
      coreSkills: prev.coreSkills.filter((_, i) => i !== index)
    }));
    addToast('Skill removed.', 'info');
  };

  const updateToolSkill = (index: number, tool: string) => {
    setData(prev => {
      const nextTools = [...prev.toolsAndDigitalSkills];
      nextTools[index] = tool;
      return { ...prev, toolsAndDigitalSkills: nextTools };
    });
  };

  const addToolSkill = (tool: string) => {
    if (!tool.trim()) return;
    setData(prev => ({ ...prev, toolsAndDigitalSkills: [...prev.toolsAndDigitalSkills, tool.trim()] }));
    addToast(`Added tool: "${tool.trim()}"`, 'success');
  };

  const deleteToolSkill = (index: number) => {
    setData(prev => ({
      ...prev,
      toolsAndDigitalSkills: prev.toolsAndDigitalSkills.filter((_, i) => i !== index)
    }));
    addToast('Tool removed.', 'info');
  };

  const updateCareerImpact = (index: number, impact: string) => {
    setData(prev => {
      const next = [...prev.selectedCareerImpact];
      next[index] = impact;
      return { ...prev, selectedCareerImpact: next };
    });
  };

  const addCareerImpact = (impact: string) => {
    if (!impact.trim()) return;
    setData(prev => ({ ...prev, selectedCareerImpact: [...prev.selectedCareerImpact, impact.trim()] }));
    addToast('Added career impact milestone.', 'success');
  };

  const deleteCareerImpact = (index: number) => {
    setData(prev => ({
      ...prev,
      selectedCareerImpact: prev.selectedCareerImpact.filter((_, i) => i !== index)
    }));
    addToast('Career impact removed.', 'info');
  };

  const updateExperience = (exp: ExperienceItem) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === exp.id ? exp : e))
    }));
  };

  const updateExperienceBullet = (expId: string, bulletIdx: number, newBullet: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id !== expId) return e;
        const bullets = [...e.bulletPoints];
        bullets[bulletIdx] = newBullet;
        return { ...e, bulletPoints: bullets };
      })
    }));
  };

  const addExperienceBullet = (expId: string, bullet: string) => {
    if (!bullet.trim()) return;
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id !== expId) return e;
        return { ...e, bulletPoints: [...e.bulletPoints, bullet.trim()] };
      })
    }));
    addToast('Added experience bullet.', 'success');
  };

  const deleteExperienceBullet = (expId: string, bulletIdx: number) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id !== expId) return e;
        return { ...e, bulletPoints: e.bulletPoints.filter((_, i) => i !== bulletIdx) };
      })
    }));
    addToast('Bullet removed.', 'info');
  };

  const updateEducation = (edu: EducationItem) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === edu.id ? edu : e))
    }));
  };

  const updateArchiveItem = (item: ArchiveItem) => {
    setData(prev => ({
      ...prev,
      archiveItems: prev.archiveItems.map(a => (a.id === item.id ? item : a))
    }));
    addToast('Work piece updated.', 'success');
  };

  const addArchiveItem = (item: ArchiveItem) => {
    setData(prev => ({
      ...prev,
      archiveItems: [item, ...prev.archiveItems]
    }));
    addToast('Work piece added to archive!', 'success');
  };

  const deleteArchiveItem = (id: string) => {
    setData(prev => ({
      ...prev,
      archiveItems: prev.archiveItems.filter(a => a.id !== id)
    }));
    addToast('Work piece removed from archive.', 'warning');
  };

  const resetToDefaults = async () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      await clearAllMedia();
    } catch (e) {
      console.warn('Error clearing storage on reset', e);
    }
    addToast('Portfolio restored to initial defaults.', 'info');
  };

  const exportDataJson = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.caseStudies && parsed.settings) {
        setData({
          ...defaultPortfolioData,
          ...parsed,
          settings: { ...defaultPortfolioData.settings, ...(parsed.settings || {}) },
          galleryItems: parsed.galleryItems || defaultPortfolioData.galleryItems,
          references: parsed.references || defaultPortfolioData.references
        });
        addToast('Portfolio imported successfully.', 'success');
        return true;
      }
    } catch {
      addToast('Invalid JSON file format.', 'error');
    }
    return false;
  };

  const generateShareLink = (tokenName = 'recruiter'): string => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.set('access', tokenName);
    return url.toString();
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isUnlocked,
        unlockWithCode,
        lockPortfolio,
        updateSettings,
        updateProfilePhoto,
        updateCaseStudy,
        updateCaseStudyImage,
        addCaseStudy,
        deleteCaseStudy,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addReference,
        updateReference,
        deleteReference,
        updateWritingSample,
        addWritingSample,
        deleteWritingSample,
        updateNote,
        addNote,
        deleteNote,
        isClickToEditEnabled,
        setIsClickToEditEnabled,
        toggleClickToEdit,
        updateProfessionalProfile,
        updateCoreSkill,
        addCoreSkill,
        deleteCoreSkill,
        updateToolSkill,
        addToolSkill,
        deleteToolSkill,
        updateCareerImpact,
        addCareerImpact,
        deleteCareerImpact,
        updateExperience,
        updateExperienceBullet,
        addExperienceBullet,
        deleteExperienceBullet,
        updateEducation,
        updateArchiveItem,
        addArchiveItem,
        deleteArchiveItem,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        isEditorOpen,
        setIsEditorOpen,
        editorActiveTab,
        setEditorActiveTab,
        openEditorToTab,
        toasts,
        addToast,
        removeToast,
        generateShareLink
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
