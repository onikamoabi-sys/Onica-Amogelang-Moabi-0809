import React, { useState, useRef } from 'react';
import {
  Layers,
  Image as ImageIcon,
  Plus,
  Upload,
  X,
  Eye,
  Trash2,
  Camera,
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArchiveItem } from '../types/portfolio';
import { InlineEditableText } from './InlineEditableText';
import { compressImageFile } from '../utils/imageCompressor';
import { BackToTopButton } from './BackToTopButton';

export const ArchiveSection: React.FC = () => {
  const { data, updateSettings, addArchiveItem, updateArchiveItem, deleteArchiveItem, addToast } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<ArchiveItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding a new work image
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Newsletters');
  const [newOrganization, setNewOrganization] = useState('');
  const [newPeriod, setNewPeriod] = useState(new Date().getFullYear().toString());
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImagePreview, setNewImagePreview] = useState('');

  // Hidden file inputs for uploading directly to an existing item
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadItemId, setActiveUploadItemId] = useState<string | null>(null);

  // Distinct category filter options
  const filterOptions = [
    'All',
    'Newsletters',
    'Magazine Articles',
    'Flyers & Design',
    'Community Management',
    'Internal Comms',
    'Events'
  ];

  const filteredItems =
    activeFilter === 'All'
      ? data.archiveItems
      : data.archiveItems.filter(item => item.category === activeFilter);

  // Handle uploading image for a specific item in the grid
  const handleItemFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadItemId) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WebP).', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1200, quality: 0.8 });
      const itemToUpdate = data.archiveItems.find(a => a.id === activeUploadItemId);
      if (itemToUpdate) {
        updateArchiveItem({ ...itemToUpdate, imageUrl: compressed });
        if (selectedLightboxItem?.id === activeUploadItemId) {
          setSelectedLightboxItem({ ...itemToUpdate, imageUrl: compressed });
        }
        addToast('Work image optimized & updated!', 'success');
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const itemToUpdate = data.archiveItems.find(a => a.id === activeUploadItemId);
          if (itemToUpdate) {
            updateArchiveItem({ ...itemToUpdate, imageUrl: result });
            if (selectedLightboxItem?.id === activeUploadItemId) {
              setSelectedLightboxItem({ ...itemToUpdate, imageUrl: result });
            }
            addToast('Work image updated!', 'success');
          }
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset file input
    e.target.value = '';
    setActiveUploadItemId(null);
  };

  // Handle file upload inside the Add Work Image modal
  const handleModalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file.', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1200, quality: 0.8 });
      setNewImagePreview(compressed);
      setNewImageUrl(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setNewImagePreview(result);
          setNewImageUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit adding a new work image
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast('Please enter a title for the work piece.', 'warning');
      return;
    }

    const imageToUse =
      newImagePreview ||
      newImageUrl.trim() ||
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';

    const newItem: ArchiveItem = {
      id: `arc-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      organization: newOrganization.trim() || 'Creative Deliverable',
      period: newPeriod.trim() || new Date().getFullYear().toString(),
      imageUrl: imageToUse,
      badge: newCategory
    };

    addArchiveItem(newItem);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewOrganization('');
    setNewImageUrl('');
    setNewImagePreview('');
    addToast('New work image added to archive!', 'success');
  };

  const triggerUploadForItem = (itemId: string) => {
    setActiveUploadItemId(itemId);
    fileInputRef.current?.click();
  };

  return (
    <section id="archive" className="py-20 border-b border-zinc-800/80 bg-[#09090b] relative">
      {/* Hidden file input for card updates */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleItemFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching category tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <InlineEditableText
                value={data.settings.archiveCategory || 'The Archive · Work Showcase'}
                onSave={(val) => updateSettings({ archiveCategory: val })}
                as="span"
                tooltip="Click to edit category tag"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
              <InlineEditableText
                value={data.settings.archiveTitle || 'Work Showcase / Visual Archive'}
                onSave={(val) => updateSettings({ archiveTitle: val })}
                as="span"
                tooltip="Click to edit heading"
              />
            </h2>
            <div className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              <InlineEditableText
                value={data.settings.archiveSubtitle || 'A visual archive of works, published layouts, and campaign deliverables. Click any image to view full-size or change the image directly.'}
                onSave={(val) => updateSettings({ archiveSubtitle: val })}
                multiline
                as="p"
                tooltip="Click to edit section description"
              />
            </div>
          </div>

          {/* Action buttons & Filter tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer shadow-lg shadow-amber-400/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work Image</span>
            </button>

            <div className="flex items-center gap-1.5 flex-wrap">
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setActiveFilter(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    activeFilter === opt
                      ? 'bg-amber-400 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Visual Grid of Work Images (No heavy wording, no verified dossier block) */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-950/60 p-8">
            <ImageIcon className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-400 mb-4 font-mono">No work images found in "{activeFilter}".</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 text-xs font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload first work image</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map(item => {
              const displayImage =
                item.imageUrl ||
                'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80';

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-zinc-800/90 bg-[#121216] overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Work Image Container */}
                  <div className="relative aspect-[16/11] bg-zinc-950 overflow-hidden cursor-pointer">
                    <img
                      src={displayImage}
                      alt={item.title}
                      onClick={() => setSelectedLightboxItem(item)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div
                      onClick={() => setSelectedLightboxItem(item)}
                      className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
                    />

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/60 text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                        {item.category || 'Work'}
                      </span>
                    </div>

                    {/* Action buttons on image hover */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      {/* View full-size */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLightboxItem(item);
                        }}
                        className="p-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 backdrop-blur-md transition cursor-pointer shadow-md"
                        title="View Full Size"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Change image */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerUploadForItem(item.id);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 backdrop-blur-md text-xs font-medium transition cursor-pointer shadow-md"
                        title="Change work image"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400 group-hover:text-zinc-950" />
                        <span className="text-[11px]">Change Image</span>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Remove "${item.title}" from archive?`)) {
                            deleteArchiveItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-950/85 hover:bg-rose-500 text-zinc-400 hover:text-white border border-zinc-700 backdrop-blur-md transition cursor-pointer"
                        title="Delete work"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom overlay prompt to view */}
                    <div
                      onClick={() => setSelectedLightboxItem(item)}
                      className="absolute bottom-2.5 right-3 text-[11px] font-mono text-zinc-300/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span>Click to enlarge</span>
                    </div>
                  </div>

                  {/* Clean Caption & Meta (No heavy wording, no verified dossier block) */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Work Title with Click-to-Edit */}
                      <div className="font-serif text-lg text-zinc-100 font-normal leading-snug group-hover:text-amber-200 transition-colors">
                        <InlineEditableText
                          value={item.title}
                          onSave={(val) => updateArchiveItem({ ...item, title: val })}
                          as="h3"
                          tooltip="Click to edit title"
                        />
                      </div>
                    </div>

                    {/* Meta Footer with Organization & Period */}
                    <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-1.5 truncate max-w-[70%]">
                        <span className="text-amber-400 font-bold">•</span>
                        <InlineEditableText
                          value={item.organization || 'Independent Deliverable'}
                          onSave={(val) => updateArchiveItem({ ...item, organization: val })}
                          className="truncate text-zinc-300 font-medium"
                          tooltip="Click to edit organization/client"
                        />
                      </div>
                      <InlineEditableText
                        value={item.period || '2024'}
                        onSave={(val) => updateArchiveItem({ ...item, period: val })}
                        className="text-[11px] text-zinc-400 shrink-0"
                        tooltip="Click to edit period"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>

      {/* Lightbox Modal for Full-Size Work Inspection */}
      {selectedLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121216] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-950/80">
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  {selectedLightboxItem.category} · {selectedLightboxItem.organization}
                </span>
                <h3 className="font-serif text-lg text-zinc-100 font-light">
                  {selectedLightboxItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerUploadForItem(selectedLightboxItem.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 text-xs font-medium transition cursor-pointer"
                  title="Upload a new image for this work"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Replace Image</span>
                </button>
                <button
                  onClick={() => setSelectedLightboxItem(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="relative flex-1 min-h-[350px] max-h-[70vh] bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-auto">
              <img
                src={selectedLightboxItem.imageUrl || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedLightboxItem.title}
                className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <span>Period: {selectedLightboxItem.period || 'Recent'}</span>
              </div>
              <button
                onClick={() => setSelectedLightboxItem(null)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs cursor-pointer font-sans"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Work Image */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#121216] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-xl text-zinc-100">Add Work Image to Archive</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Work Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. SA Aluminium Magazine Layout Vol. 2"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm focus:border-amber-400 outline-none"
                />
              </div>

              {/* Category & Organization */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs focus:border-amber-400 outline-none"
                  >
                    <option value="Newsletters">Newsletters</option>
                    <option value="Magazine Articles">Magazine Articles</option>
                    <option value="Flyers & Design">Flyers & Design</option>
                    <option value="Community Management">Community Management</option>
                    <option value="Internal Comms">Internal Comms</option>
                    <option value="Events">Events</option>
                    <option value="Editorial Layout">Editorial Layout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Client / Org
                  </label>
                  <input
                    type="text"
                    value={newOrganization}
                    onChange={(e) => setNewOrganization(e.target.value)}
                    placeholder="e.g. Sasol, AFSA"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Year / Period
                </label>
                <input
                  type="text"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:border-amber-400 outline-none"
                />
              </div>

              {/* Work Image Upload or URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Work Image (Upload or Web URL) *
                </label>

                {/* File picker */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image from Computer</span>
                  </button>
                  <input
                    type="file"
                    ref={modalFileInputRef}
                    onChange={handleModalFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Or URL input */}
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => {
                    setNewImageUrl(e.target.value);
                    setNewImagePreview(e.target.value);
                  }}
                  placeholder="Or paste an image URL (https://...)"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs focus:border-amber-400 outline-none"
                />

                {/* Image preview */}
                {newImagePreview && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-zinc-700 aspect-video bg-zinc-950">
                    <img
                      src={newImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setNewImagePreview('');
                        setNewImageUrl('');
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-white hover:bg-rose-600 transition"
                      title="Clear image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs tracking-wider transition shadow-md cursor-pointer"
                >
                  Add to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
