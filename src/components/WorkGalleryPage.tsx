import React, { useState, useRef } from 'react';
import {
  Layers,
  Search,
  Plus,
  Filter,
  Image as ImageIcon,
  ExternalLink,
  Upload,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  Tag,
  Calendar,
  Building,
  Edit2,
  Trash2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GalleryItem } from '../types/portfolio';
import { InlineEditableText } from './InlineEditableText';
import { compressImageFile } from '../utils/imageCompressor';
import { BackToTopButton } from './BackToTopButton';

interface WorkGalleryPageProps {
  onSelectCaseStudy?: (studyId: string) => void;
}

export const WorkGalleryPage: React.FC<WorkGalleryPageProps> = ({ onSelectCaseStudy }) => {
  const { data, updateSettings, addGalleryItem, updateGalleryItem, deleteGalleryItem, addToast } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemModal, setActiveItemModal] = useState<GalleryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Form state for adding new item
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryItem['category']>('Corporate Storytelling');
  const [newOrg, setNewOrg] = useState('Sasol');
  const [newYear, setNewYear] = useState('2025');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('Corporate Comms, Digital');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editImageFileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Corporate Storytelling',
    'Editorial & Publications',
    'Social & Digital',
    'Brand & Graphic Design',
    'Events & Activations'
  ];

  const filteredItems = (data.galleryItems || []).filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'add' | 'edit') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file.', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1200, quality: 0.8 });
      if (target === 'add') {
        setNewImage(compressed);
        addToast('Image uploaded and optimized for new work item', 'success');
      } else if (target === 'edit' && activeItemModal) {
        const updated = { ...activeItemModal, imageUrl: compressed };
        updateGalleryItem(updated);
        setActiveItemModal(updated);
        addToast(`Image updated for "${activeItemModal.title}"`, 'success');
      }
    } catch {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result as string;
        if (target === 'add') {
          setNewImage(result);
          addToast('Image uploaded for new work item', 'success');
        } else if (target === 'edit' && activeItemModal) {
          const updated = { ...activeItemModal, imageUrl: result };
          updateGalleryItem(updated);
          setActiveItemModal(updated);
          addToast(`Image updated for "${activeItemModal.title}"`, 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImageChange = () => {
    if (!activeItemModal || !newImageUrl.trim()) return;
    const updated = { ...activeItemModal, imageUrl: newImageUrl.trim() };
    updateGalleryItem(updated);
    setActiveItemModal(updated);
    setIsEditingImage(false);
    setNewImageUrl('');
    addToast('Image URL updated!', 'success');
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast('Please enter a work title.', 'warning');
      return;
    }

    const newItem: GalleryItem = {
      id: 'gal-' + Date.now(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      category: newCategory,
      organization: newOrg.trim() || 'Independent',
      year: newYear.trim() || '2025',
      imageUrl:
        newImage.trim() ||
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      description: newDesc.trim() || 'Portfolio work piece by Onica Moabi.',
      tags: newTags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    };

    addGalleryItem(newItem);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewImage('');
    setNewDesc('');
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <InlineEditableText
                value={data.settings.galleryCategory || 'Work Gallery · Visual Portfolio'}
                onSave={(val) => updateSettings({ galleryCategory: val })}
                as="span"
                tooltip="Click to edit category tag"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
              <InlineEditableText
                value={data.settings.galleryTitle || 'Work Gallery — Featured Deliverables & Campaigns'}
                onSave={(val) => updateSettings({ galleryTitle: val })}
                as="span"
                tooltip="Click to edit heading"
              />
            </h2>
            <div className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              <InlineEditableText
                value={data.settings.gallerySubtitle || 'Explore corporate digital releases, publications, community campaigns, and brand collateral across Sasol, AFSA, Instinctif Partners, and independent projects.'}
                onSave={(val) => updateSettings({ gallerySubtitle: val })}
                multiline
                as="p"
                tooltip="Click to edit section description"
              />
            </div>
          </div>

          {/* Action CTAs: Add item + Search */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search works..."
                className="w-44 sm:w-56 bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-amber-500/60"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work Piece</span>
            </button>
          </div>
        </div>

        {/* Categories Tab Strip - All headings sit together with NO scrolling */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-zinc-800/60">
          {categories.map(cat => {
            const count =
              cat === 'All'
                ? (data.galleryItems || []).length
                : (data.galleryItems || []).filter(item => item.category === cat).length;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItemModal(item)}
              className="group cursor-pointer rounded-2xl border border-zinc-800/90 bg-[#121216] overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-700/60 text-xs font-mono text-amber-400 font-semibold uppercase">
                      {item.organization}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-[10px] text-zinc-300">
                      {item.year}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-[11px] font-sans text-zinc-200">
                      {item.category}
                    </span>
                    <span className="p-1 rounded-lg bg-amber-400 text-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div onClick={(e) => e.stopPropagation()}>
                    <InlineEditableText
                      value={item.title}
                      onSave={(val) => updateGalleryItem({ ...item, title: val })}
                      as="h3"
                      className="font-serif text-lg sm:text-xl text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug font-normal"
                      tooltip="Click to edit title"
                    />
                  </div>

                  {item.subtitle && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <InlineEditableText
                        value={item.subtitle}
                        onSave={(val) => updateGalleryItem({ ...item, subtitle: val })}
                        as="p"
                        className="text-xs text-zinc-400 font-sans line-clamp-1 italic"
                        tooltip="Click to edit subtitle"
                      />
                    </div>
                  )}

                  <div onClick={(e) => e.stopPropagation()}>
                    <InlineEditableText
                      value={item.description}
                      onSave={(val) => updateGalleryItem({ ...item, description: val })}
                      multiline
                      className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed pt-1"
                      tooltip="Click to edit description"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Action */}
              <div className="px-5 pb-5 pt-2 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-zinc-800 text-zinc-400 text-sm space-y-3">
              <p>No works found in this category.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-medium text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Item</span>
              </button>
            </div>
          )}
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>

      {/* Lightbox / Detail Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                    {activeItemModal.organization}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {activeItemModal.year}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {activeItemModal.category}
                  </span>
                </div>
                <InlineEditableText
                  value={activeItemModal.title}
                  onSave={(val) => {
                    const updated = { ...activeItemModal, title: val };
                    updateGalleryItem(updated);
                    setActiveItemModal(updated);
                  }}
                  as="h3"
                  className="text-2xl font-serif text-zinc-100 font-light"
                  tooltip="Click to edit title"
                />
                {activeItemModal.subtitle && (
                  <InlineEditableText
                    value={activeItemModal.subtitle}
                    onSave={(val) => {
                      const updated = { ...activeItemModal, subtitle: val };
                      updateGalleryItem(updated);
                      setActiveItemModal(updated);
                    }}
                    as="p"
                    className="text-xs text-zinc-400 font-sans mt-0.5"
                    tooltip="Click to edit subtitle"
                  />
                )}
              </div>

              <button
                onClick={() => {
                  setActiveItemModal(null);
                  setIsEditingImage(false);
                }}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Frame with Direct "Change Image" button */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
              <img
                src={activeItemModal.imageUrl}
                alt={activeItemModal.title}
                className="w-full max-h-[460px] object-cover"
              />

              {/* Hover "Change Image" overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setIsEditingImage(!isEditingImage)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 backdrop-blur-md text-xs font-medium transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Change Image</span>
                </button>

                <button
                  onClick={() => editImageFileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 backdrop-blur-md text-xs font-medium transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Computer</span>
                </button>
                <input
                  type="file"
                  ref={editImageFileInputRef}
                  onChange={e => handleFileUpload(e, 'edit')}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Image URL editor bar if toggled */}
            {isEditingImage && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 space-y-2">
                <label className="text-xs font-mono uppercase text-amber-400">
                  Paste New Image URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleSaveImageChange}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-medium cursor-pointer"
                  >
                    Save URL
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Work Summary & Strategic Scope
              </span>
              <div className="text-sm text-zinc-200 leading-relaxed font-sans bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                <InlineEditableText
                  value={activeItemModal.description}
                  onSave={(val) => {
                    const updated = { ...activeItemModal, description: val };
                    updateGalleryItem(updated);
                    setActiveItemModal(updated);
                  }}
                  multiline
                  tooltip="Click to edit work summary"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Disciplines & Formats
              </span>
              <div className="flex flex-wrap gap-2">
                {activeItemModal.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${activeItemModal.title}" from gallery?`)) {
                    deleteGalleryItem(activeItemModal.id);
                    setActiveItemModal(null);
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-900/40 text-xs transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Item</span>
              </button>

              <div className="flex items-center gap-2">
                {activeItemModal.linkOrCaseStudyId && onSelectCaseStudy && (
                  <button
                    onClick={() => {
                      const id = activeItemModal.linkOrCaseStudyId!;
                      setActiveItemModal(null);
                      onSelectCaseStudy(id);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 text-xs font-medium transition cursor-pointer"
                  >
                    <span>Read Associated Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveItemModal(null);
                    setIsEditingImage(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add New Gallery Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-[#0e0e12] p-6 sm:p-8 shadow-2xl space-y-5 my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-serif text-zinc-100 font-light">
                  Add Work Piece to Gallery
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono uppercase text-zinc-400">Work Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Sasol Decarbonisation Release"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono uppercase text-zinc-400">Subtitle / Pitch</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  placeholder="e.g. External communications copy across LinkedIn"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono uppercase text-zinc-400">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none"
                  >
                    <option value="Corporate Storytelling">Corporate Storytelling</option>
                    <option value="Editorial & Publications">Editorial & Publications</option>
                    <option value="Social & Digital">Social & Digital</option>
                    <option value="Brand & Graphic Design">Brand & Graphic Design</option>
                    <option value="Events & Activations">Events & Activations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono uppercase text-zinc-400">Organization / Client</label>
                  <input
                    type="text"
                    value={newOrg}
                    onChange={e => setNewOrg(e.target.value)}
                    placeholder="e.g. Sasol, AFSA, Instinctif"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Image Input (URL or Upload from Computer) */}
              <div className="space-y-2 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <label className="font-mono uppercase text-amber-400 block">Work Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newImage}
                    onChange={e => setNewImage(e.target.value)}
                    placeholder="Paste image URL (or upload below)..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-zinc-100 outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload File</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => handleFileUpload(e, 'add')}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {newImage && (
                  <div className="relative aspect-[16/9] w-32 rounded-lg overflow-hidden border border-zinc-700 mt-2">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-mono uppercase text-zinc-400">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Explain the background, strategic purpose, and your role..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono uppercase text-zinc-400">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="Corporate, Copywriting, Sasol"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium cursor-pointer"
                >
                  Add to Gallery
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
};
