import React, { useState, useRef } from 'react';
import {
  Sliders,
  X,
  Save,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  FileText,
  Briefcase,
  BookOpen,
  Share2,
  KeyRound,
  Check,
  Users,
  Image as ImageIcon,
  Edit2,
  Layers,
  ArrowRight,
  Quote,
  Mail,
  Building,
  Phone
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { compressImageFile } from '../utils/imageCompressor';
import { CaseStudy, WritingSample, CommunicationNote, ReferenceItem, GalleryItem } from '../types/portfolio';

export const PortfolioEditorModal: React.FC = () => {
  const {
    data,
    isEditorOpen,
    setIsEditorOpen,
    editorActiveTab,
    setEditorActiveTab,
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
    resetToDefaults,
    exportDataJson,
    importDataJson,
    generateShareLink,
    addToast
  } = usePortfolio();

  // Local form state for settings
  const [headline, setHeadline] = useState(data.settings.headline);
  const [subHeadline, setSubHeadline] = useState(data.settings.subHeadline);
  const [introParagraph, setIntroParagraph] = useState(data.settings.introParagraph);
  const [heroPitch, setHeroPitch] = useState(data.settings.heroPitch);
  const [contactEmail, setContactEmail] = useState(data.settings.contactEmail);
  const [contactCell, setContactCell] = useState(data.settings.contactCell);
  const [contactLocation, setContactLocation] = useState(data.settings.contactLocation);
  const [contactLinkedIn, setContactLinkedIn] = useState(data.settings.contactLinkedIn);
  const [accessPasscode, setAccessPasscode] = useState(data.settings.accessPasscode);
  const [isPrivateMode, setIsPrivateMode] = useState(data.settings.isPrivateMode);

  // Profile image controls
  const [profilePhotoUrlInput, setProfilePhotoUrlInput] = useState(data.settings.profilePhotoUrl || '');
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  // Case study image controls
  const [selectedCaseForImage, setSelectedCaseForImage] = useState<string>(data.caseStudies[0]?.id || '');
  const [caseImageUrlInput, setCaseImageUrlInput] = useState('');
  const caseFileInputRef = useRef<HTMLInputElement>(null);

  // References state
  const [isAddRefModalOpen, setIsAddRefModalOpen] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [newRefName, setNewRefName] = useState('');
  const [newRefOrg, setNewRefOrg] = useState('');
  const [newRefRole, setNewRefRole] = useState('');
  const [newRefEmail, setNewRefEmail] = useState('');
  const [newRefPhone, setNewRefPhone] = useState('Available upon request');
  const [newRefRelationship, setNewRefRelationship] = useState('Direct Manager');
  const [newRefQuote, setNewRefQuote] = useState('');

  // JSON import input
  const [importJsonText, setImportJsonText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Editing items
  const [selectedCaseId, setSelectedCaseId] = useState<string>(data.caseStudies[0]?.id || '');
  const [selectedWritingId, setSelectedWritingId] = useState<string>(data.writingSamples[0]?.id || '');
  const [selectedNoteId, setSelectedNoteId] = useState<string>(data.notes[0]?.id || '');

  if (!isEditorOpen) return null;

  const handleSaveSettings = () => {
    updateSettings({
      headline,
      subHeadline,
      introParagraph,
      heroPitch,
      contactEmail,
      contactCell,
      contactLocation,
      contactLinkedIn,
      accessPasscode,
      isPrivateMode
    });
  };

  const handleProfilePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file.', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1000, quality: 0.8 });
      updateProfilePhoto(compressed);
      setProfilePhotoUrlInput(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result as string;
        if (result) {
          updateProfilePhoto(result);
          setProfilePhotoUrlInput(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePhotoUrl = () => {
    if (!profilePhotoUrlInput.trim()) return;
    updateProfilePhoto(profilePhotoUrlInput.trim());
  };

  const handleCaseImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCaseForImage) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file.', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1200, quality: 0.8 });
      updateCaseStudyImage(selectedCaseForImage, compressed);
      setCaseImageUrlInput('');
    } catch {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result as string;
        if (result) {
          updateCaseStudyImage(selectedCaseForImage, result);
          setCaseImageUrlInput('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCaseImageUrl = () => {
    if (!selectedCaseForImage || !caseImageUrlInput.trim()) return;
    updateCaseStudyImage(selectedCaseForImage, caseImageUrlInput.trim());
    setCaseImageUrlInput('');
  };

  const handleCopyShareLink = () => {
    const link = generateShareLink('recruiter');
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    addToast('Recruiter share link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Reference handlers
  const handleAddNewReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRefName.trim() || !newRefOrg.trim() || !newRefEmail.trim()) {
      addToast('Please fill in Name, Organization and Email.', 'warning');
      return;
    }

    const newRef: ReferenceItem = {
      id: 'ref-' + Date.now(),
      name: newRefName.trim(),
      organization: newRefOrg.trim(),
      role: newRefRole.trim() || 'Communications Executive',
      email: newRefEmail.trim(),
      phoneNote: newRefPhone.trim() || 'Available upon recruiter request',
      relationship: newRefRelationship.trim() || undefined,
      quote: newRefQuote.trim() || undefined
    };

    addReference(newRef);
    setIsAddRefModalOpen(false);
    // Reset
    setNewRefName('');
    setNewRefOrg('');
    setNewRefRole('');
    setNewRefEmail('');
    setNewRefPhone('Available upon request');
    setNewRefRelationship('');
    setNewRefQuote('');
  };

  const handleCreateNewCaseStudy = () => {
    const newId = 'case-' + Date.now();
    const newStudy: CaseStudy = {
      id: newId,
      title: 'New Strategic Communications Project',
      subtitle: 'Overview of strategic impact and audience alignment.',
      clientOrOrg: 'Client / Organisation',
      period: '2025',
      category: 'Corporate Comms',
      priority: 99,
      summary: 'Summary of the business challenge and communication intervention.',
      heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      brief: 'Description of the brief and corporate objectives.',
      roleAndContribution: [
        'Formulated key message architecture.',
        'Authored and adapted external communications copy.'
      ],
      audienceAndStrategy: 'Key stakeholders, industry partners, and community members.',
      keyDeliverables: ['Digital copy package', 'Stakeholder memo'],
      sampleCopyOrContent: [
        {
          heading: 'Sample Headline',
          platform: 'LinkedIn',
          context: 'Targeting industry leaders.',
          body: 'Sample drafted communication copy goes here.'
        }
      ],
      outcomesAndImpact: ['Generated measurable stakeholder engagement.'],
      whatThisSells: ['Strategic Communications', 'Copywriting']
    };
    addCaseStudy(newStudy);
    setSelectedCaseId(newId);
  };

  const handleCreateNewWriting = () => {
    const newId = 'ws-' + Date.now();
    const newSample: WritingSample = {
      id: newId,
      title: 'New Writing Deliverable',
      category: 'Social & Digital Copy',
      targetAudience: 'Executive leadership and industry partners',
      objective: 'Drive brand positioning and clarity',
      contribution: 'Authored copy and aligned tone of voice',
      platformOrChannel: 'LinkedIn / Press',
      dateOrEra: '2025',
      content: 'Sample drafted copy content goes here...',
      tags: ['Corporate', 'Digital'],
      takeaway: 'Achieved high audience resonance.'
    };
    addWritingSample(newSample);
    setSelectedWritingId(newId);
  };

  const handleCreateNewNote = () => {
    const newId = 'note-' + Date.now();
    const newNote: CommunicationNote = {
      id: newId,
      title: 'New Note on Communication',
      subtitle: 'A perspective on modern audience dynamics.',
      readTime: '4 min read',
      date: 'Current',
      category: 'Strategic Perspective',
      summary: 'Summary of the essay point of view.',
      highlightQuote: '“Good communication makes the story matter.”',
      content: ['Opening paragraph of the article...', 'Second paragraph exploring the insight...'],
      keyTakeaways: ['Key takeaway point 1', 'Key takeaway point 2']
    };
    addNote(newNote);
    setSelectedNoteId(newId);
  };

  const selectedCase = data.caseStudies.find(c => c.id === selectedCaseId);
  const selectedWriting = data.writingSamples.find(w => w.id === selectedWritingId);
  const selectedNote = data.notes.find(n => n.id === selectedNoteId);
  const currentCaseForImage = data.caseStudies.find(c => c.id === selectedCaseForImage) || data.caseStudies[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-8 shadow-2xl flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-zinc-100 font-light">
                Portfolio Studio & Content Manager
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Change images, add references, edit case studies, manage work gallery, and configure private sharing.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditorOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation - All headings sit together with NO scrolling */}
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-zinc-800">
          {[
            { id: 'images', label: 'Images & Media', icon: ImageIcon },
            { id: 'references', label: 'References & Quotes', icon: Users },
            { id: 'positioning', label: 'Positioning & Bio', icon: Sparkles },
            { id: 'cases', label: 'Case Studies', icon: Briefcase },
            { id: 'writing', label: 'Writing Room', icon: FileText },
            { id: 'notes', label: 'The Edit (Essays)', icon: BookOpen },
            { id: 'privacy', label: 'Privacy & Sharing', icon: Lock },
            { id: 'backup', label: 'Export / Backup', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = editorActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setEditorActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Body */}
        <div className="py-6 flex-1 space-y-6">
          
          {/* TAB: IMAGES & MEDIA */}
          {editorActiveTab === 'images' && (
            <div className="space-y-8">
              
              {/* Profile Photo Manager */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                      Profile Headshot / Hero Portrait
                    </span>
                    <p className="text-xs text-zinc-400">
                      Upload your official photo or enter a link to update the portrait displayed in the hero section.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Live Preview</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Photo Preview */}
                  <div className="md:col-span-4 flex justify-center">
                    <div className="relative w-40 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-zinc-900 group">
                      <img
                        src={data.settings.profilePhotoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"}
                        alt="Current Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-[11px] text-zinc-100 font-medium">
                        Current Portrait
                      </div>
                    </div>
                  </div>

                  {/* Actions & Inputs */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => profileFileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo from Computer</span>
                      </button>
                      <input
                        type="file"
                        ref={profileFileInputRef}
                        onChange={handleProfilePhotoFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <span className="text-xs text-zinc-500">PNG, JPG, or WEBP</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-zinc-400">Or Paste Image URL</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={profilePhotoUrlInput}
                          onChange={e => setProfilePhotoUrlInput(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-500"
                        />
                        <button
                          onClick={handleSaveProfilePhotoUrl}
                          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium cursor-pointer"
                        >
                          Save URL
                        </button>
                      </div>
                    </div>

                    {/* Curated Presets */}
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-zinc-500 block mb-2">Preset Editorial Avatars:</span>
                      <div className="flex gap-2">
                        {[
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1580894732488-874ff095d3a5?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80'
                        ].map((url, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              updateProfilePhoto(url);
                              setProfilePhotoUrlInput(url);
                            }}
                            className="relative w-11 h-11 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-400 transition"
                          >
                            <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Studies Hero Images Manager */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                      Case Study Hero Images & Artwork
                    </span>
                    <p className="text-xs text-zinc-400">
                      Select any project to change its banner image or upload your own deliverable mockups.
                    </p>
                  </div>
                </div>

                {/* Case Study Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">Select Project to Edit Image:</label>
                  <select
                    value={selectedCaseForImage}
                    onChange={e => setSelectedCaseForImage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none"
                  >
                    {data.caseStudies.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.clientOrOrg}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {currentCaseForImage && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                    <div className="md:col-span-5">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                        <img
                          src={currentCaseForImage.heroImage}
                          alt={currentCaseForImage.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-zinc-950/80 text-[10px] font-mono text-amber-400">
                          {currentCaseForImage.clientOrOrg}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => caseFileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs transition cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload from Computer</span>
                        </button>
                        <input
                          type="file"
                          ref={caseFileInputRef}
                          onChange={handleCaseImageFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-zinc-400">Or Paste Image URL</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={caseImageUrlInput}
                            onChange={e => setCaseImageUrlInput(e.target.value)}
                            placeholder="https://..."
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-500"
                          />
                          <button
                            onClick={handleSaveCaseImageUrl}
                            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: REFERENCES & ENDORSEMENTS */}
          {editorActiveTab === 'references' && (
            <div className="space-y-6">
              
              {/* Header bar */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    Professional References & Endorsements
                  </span>
                  <p className="text-xs text-zinc-400">
                    Add corporate supervisors, agency directors, or academic mentors who can speak to your work.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddRefModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Reference</span>
                </button>
              </div>

              {/* Add Reference Modal / Drawer */}
              {isAddRefModalOpen && (
                <div className="p-5 rounded-2xl bg-[#141419] border border-amber-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <h4 className="font-serif text-base text-zinc-100 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add Professional Reference</span>
                    </h4>
                    <button
                      onClick={() => setIsAddRefModalOpen(false)}
                      className="p-1 text-zinc-400 hover:text-zinc-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddNewReference} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newRefName}
                          onChange={e => setNewRefName(e.target.value)}
                          placeholder="e.g. Charlotte Maja"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          value={newRefOrg}
                          onChange={e => setNewRefOrg(e.target.value)}
                          placeholder="e.g. Sasol, Instinctif Partners"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Role / Position *</label>
                        <input
                          type="text"
                          required
                          value={newRefRole}
                          onChange={e => setNewRefRole(e.target.value)}
                          placeholder="e.g. Head of External Communications"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={newRefEmail}
                          onChange={e => setNewRefEmail(e.target.value)}
                          placeholder="e.g. name@company.com"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Professional Relationship</label>
                        <input
                          type="text"
                          value={newRefRelationship}
                          onChange={e => setNewRefRelationship(e.target.value)}
                          placeholder="e.g. Direct Supervisor, Project Lead"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono uppercase text-zinc-400">Phone Availability Note</label>
                        <input
                          type="text"
                          value={newRefPhone}
                          onChange={e => setNewRefPhone(e.target.value)}
                          placeholder="e.g. Available upon recruiter request"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-400">Quote / Endorsement Snippet (Optional)</label>
                      <textarea
                        rows={2}
                        value={newRefQuote}
                        onChange={e => setNewRefQuote(e.target.value)}
                        placeholder="e.g. Onica demonstrated exceptional capability in message architecture and external corporate reporting..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddRefModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium cursor-pointer"
                      >
                        Save Reference
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing References Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.references.map(ref => (
                  <div
                    key={ref.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-base text-zinc-100">{ref.name}</h4>
                          <span className="text-xs font-mono text-amber-400 uppercase tracking-wide">
                            {ref.organization}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete reference for ${ref.name}?`)) {
                              deleteReference(ref.id);
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-900 transition"
                          title="Remove reference"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-zinc-400">{ref.role}</p>

                      {ref.relationship && (
                        <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                          {ref.relationship}
                        </span>
                      )}

                      {ref.quote && (
                        <p className="text-xs text-zinc-300 italic font-serif bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/80">
                          "{ref.quote}"
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{ref.email}</span>
                      </div>
                      {ref.phoneNote && (
                        <p className="text-[11px] text-zinc-500 font-mono pl-5">
                          {ref.phoneNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: POSITIONING & BIO */}
          {editorActiveTab === 'positioning' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">Core Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">Sub-Headline / Core Thesis</label>
                  <textarea
                    rows={2}
                    value={subHeadline}
                    onChange={e => setSubHeadline(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">Supporting Context (Intro Paragraph)</label>
                  <textarea
                    rows={2}
                    value={introParagraph}
                    onChange={e => setIntroParagraph(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Hero Discipline Pill</label>
                  <input
                    type="text"
                    value={heroPitch}
                    onChange={e => setHeroPitch(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Email Address</label>
                  <input
                    type="text"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Cell Phone Number</label>
                  <input
                    type="text"
                    value={contactCell}
                    onChange={e => setContactCell(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Location</label>
                  <input
                    type="text"
                    value={contactLocation}
                    onChange={e => setContactLocation(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={contactLinkedIn}
                    onChange={e => setContactLinkedIn(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Bio & Positioning Changes</span>
              </button>
            </div>
          )}

          {/* TAB: PRIVACY & SHARING */}
          {editorActiveTab === 'privacy' && (
            <div className="space-y-6">
              
              {/* Private Mode Toggle */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                    {isPrivateMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <span>Portfolio Privacy Gate</span>
                  </div>
                  <h4 className="text-sm font-medium text-zinc-100">
                    {isPrivateMode ? 'Private Mode Active (Passcode Required)' : 'Public Mode (Anyone can view)'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    When active, visitors must enter your passcode or use a generated recruiter link to view your portfolio.
                  </p>
                </div>

                <button
                  onClick={() => setIsPrivateMode(!isPrivateMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isPrivateMode
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {isPrivateMode ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Passcode setting */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <KeyRound className="w-4 h-4" />
                  <span>Custom Recruiter Passcode</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={accessPasscode}
                    onChange={e => setAccessPasscode(e.target.value.toUpperCase())}
                    placeholder="e.g. ONICA2025"
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-100 outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleSaveSettings}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-medium cursor-pointer"
                  >
                    Update Passcode
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Current active passcode: <strong className="text-zinc-200">{accessPasscode}</strong>
                </p>
              </div>

              {/* Instant Recruiter Share Link Generator */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-950 to-zinc-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <Share2 className="w-4 h-4" />
                  <span>One-Click Recruiter Direct Access Link</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Send this link to recruiters or hiring managers. It automatically bypasses the passcode lock for their device:
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generateShareLink('recruiter')}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-400 outline-none select-all"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: CASE STUDIES */}
          {editorActiveTab === 'cases' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCaseId}
                    onChange={e => setSelectedCaseId(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none"
                  >
                    {data.caseStudies.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.clientOrOrg}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewCaseStudy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/25 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Project</span>
                  </button>

                  {selectedCase && data.caseStudies.length > 1 && (
                    <button
                      onClick={() => deleteCaseStudy(selectedCase.id)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 cursor-pointer"
                      title="Delete this case study"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {selectedCase && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Title</label>
                      <input
                        type="text"
                        value={selectedCase.title}
                        onChange={e => updateCaseStudy({ ...selectedCase, title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Client / Org</label>
                      <input
                        type="text"
                        value={selectedCase.clientOrOrg}
                        onChange={e => updateCaseStudy({ ...selectedCase, clientOrOrg: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Subtitle / Pitch</label>
                    <input
                      type="text"
                      value={selectedCase.subtitle}
                      onChange={e => updateCaseStudy({ ...selectedCase, subtitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Hero Image URL</label>
                    <input
                      type="text"
                      value={selectedCase.heroImage || ''}
                      onChange={e => updateCaseStudy({ ...selectedCase, heroImage: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">The Brief & Challenge</label>
                    <textarea
                      rows={3}
                      value={selectedCase.brief}
                      onChange={e => updateCaseStudy({ ...selectedCase, brief: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Summary</label>
                    <textarea
                      rows={2}
                      value={selectedCase.summary}
                      onChange={e => updateCaseStudy({ ...selectedCase, summary: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Audience & Strategy</label>
                    <textarea
                      rows={2}
                      value={selectedCase.audienceAndStrategy}
                      onChange={e => updateCaseStudy({ ...selectedCase, audienceAndStrategy: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: WRITING ROOM */}
          {editorActiveTab === 'writing' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <select
                  value={selectedWritingId}
                  onChange={e => setSelectedWritingId(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none"
                >
                  {data.writingSamples.map(w => (
                    <option key={w.id} value={w.id}>
                      [{w.category}] {w.title}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewWriting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/25 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Writing Sample</span>
                  </button>

                  {selectedWriting && data.writingSamples.length > 1 && (
                    <button
                      onClick={() => deleteWritingSample(selectedWriting.id)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 cursor-pointer"
                      title="Delete sample"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {selectedWriting && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Sample Title</label>
                      <input
                        type="text"
                        value={selectedWriting.title}
                        onChange={e => updateWritingSample({ ...selectedWriting, title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Category</label>
                      <select
                        value={selectedWriting.category}
                        onChange={e => updateWritingSample({ ...selectedWriting, category: e.target.value as any })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                      >
                        <option value="Social & Digital Copy">Social & Digital Copy</option>
                        <option value="PR & Corporate Writing">PR & Corporate Writing</option>
                        <option value="Stakeholder & Community">Stakeholder & Community</option>
                        <option value="Insights & Recommendations">Insights & Recommendations</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">1. Target Audience</label>
                      <input
                        type="text"
                        value={selectedWriting.targetAudience}
                        onChange={e => updateWritingSample({ ...selectedWriting, targetAudience: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">2. Strategic Objective</label>
                      <input
                        type="text"
                        value={selectedWriting.objective}
                        onChange={e => updateWritingSample({ ...selectedWriting, objective: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">3. My Contribution</label>
                      <input
                        type="text"
                        value={selectedWriting.contribution}
                        onChange={e => updateWritingSample({ ...selectedWriting, contribution: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Actual Copy / Content</label>
                    <textarea
                      rows={6}
                      value={selectedWriting.content}
                      onChange={e => updateWritingSample({ ...selectedWriting, content: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 font-sans text-xs text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Strategic Takeaway</label>
                    <input
                      type="text"
                      value={selectedWriting.takeaway}
                      onChange={e => updateWritingSample({ ...selectedWriting, takeaway: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: THE EDIT (ESSAYS) */}
          {editorActiveTab === 'notes' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <select
                  value={selectedNoteId}
                  onChange={e => setSelectedNoteId(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none"
                >
                  {data.notes.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.title}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewNote}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/25 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Essay</span>
                  </button>

                  {selectedNote && data.notes.length > 1 && (
                    <button
                      onClick={() => deleteNote(selectedNote.id)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 cursor-pointer"
                      title="Delete essay"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {selectedNote && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Article Title</label>
                      <input
                        type="text"
                        value={selectedNote.title}
                        onChange={e => updateNote({ ...selectedNote, title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-zinc-400">Category & Read Time</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={selectedNote.category}
                          onChange={e => updateNote({ ...selectedNote, category: e.target.value })}
                          className="w-2/3 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                        />
                        <input
                          type="text"
                          value={selectedNote.readTime}
                          onChange={e => updateNote({ ...selectedNote, readTime: e.target.value })}
                          className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Pull Quote</label>
                    <input
                      type="text"
                      value={selectedNote.highlightQuote}
                      onChange={e => updateNote({ ...selectedNote, highlightQuote: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 italic font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Article Excerpt</label>
                    <textarea
                      rows={2}
                      value={selectedNote.summary}
                      onChange={e => updateNote({ ...selectedNote, summary: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: BACKUP & EXPORT */}
          {editorActiveTab === 'backup' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>How Saving & Editing Later Works</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <p>
                    <strong className="text-zinc-100 font-medium">1. Automatic Local Saving:</strong> Every edit you make in this Studio is instantly saved to your browser storage automatically.
                  </p>
                  <p>
                    <strong className="text-zinc-100 font-medium">2. Bookmark This URL:</strong> Bookmark your portfolio link in your browser to reopen and edit anytime.
                  </p>
                  <p>
                    <strong className="text-zinc-100 font-medium">3. Offline Backup File:</strong> Click "Download Backup JSON" below to save a copy of your entire portfolio data to your computer or phone.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Export your entire portfolio content as a single JSON file to keep an offline copy or restore anytime.
                </p>
                <button
                  onClick={() => {
                    const blob = new Blob([exportDataJson()], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `onica_moabi_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    addToast('Portfolio backup file downloaded', 'success');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wide transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup JSON File</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <Upload className="w-4 h-4" />
                  <span>Restore from JSON</span>
                </div>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={e => setImportJsonText(e.target.value)}
                  placeholder="Paste exported portfolio JSON here..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-300 outline-none"
                />
                <button
                  onClick={() => {
                    if (importDataJson(importJsonText)) {
                      setImportJsonText('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs cursor-pointer"
                >
                  Restore Data
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Original Portfolio Defaults</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Reset all case studies, writing samples, and settings back to the initial curated content.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all changes back to initial default portfolio data?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800 text-rose-200 text-xs font-medium cursor-pointer"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">
            Auto-saves locally to your browser storage
          </span>
          <button
            onClick={() => setIsEditorOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
};
