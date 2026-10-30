import React, { useRef } from 'react';
import { ArrowUpRight, Sparkles, Camera, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SpirographMotif } from './SpirographMotif';
import { InlineEditableText } from './InlineEditableText';
import { compressImageFile } from '../utils/imageCompressor';
import { BackToTopButton } from './BackToTopButton';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { data, updateSettings, updateProfilePhoto, addToast, openEditorToTab } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file.', 'warning');
      return;
    }

    try {
      const compressed = await compressImageFile(file, { maxWidth: 1000, quality: 0.8 });
      updateProfilePhoto(compressed);
      addToast('Profile picture optimized and updated!', 'success');
    } catch {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result as string;
        if (result) updateProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-zinc-800/80">
      {/* Background spirograph motifs echoing Onica's attached portfolio pages */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-40 pointer-events-none">
        <SpirographMotif size={640} color="gold" />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-20 pointer-events-none">
        <SpirographMotif size={550} color="white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Positioning & Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category tag pill matching heading tabs */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <InlineEditableText
                value={data.settings.heroCategory || 'Home · Professional Positioning'}
                onSave={(val) => updateSettings({ heroCategory: val })}
                as="span"
                tooltip="Click to edit category tag"
              />
            </div>

            {/* Headline with click-to-edit */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-zinc-100 tracking-tight leading-[1.12]">
              <InlineEditableText
                value={data.settings.headline || 'Making communication matter.'}
                onSave={(val) => updateSettings({ headline: val })}
                as="span"
                tooltip="Click to edit headline"
              />
            </h1>

            {/* Subtitle / Core Thesis with click-to-edit */}
            <div className="text-lg sm:text-xl text-zinc-300 font-sans font-light leading-relaxed">
              <InlineEditableText
                value={data.settings.subHeadline}
                onSave={(val) => updateSettings({ subHeadline: val })}
                multiline
                as="p"
                tooltip="Click to edit thesis statement"
              />
            </div>

            {/* Supporting Context & Background with click-to-edit */}
            <div className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              <InlineEditableText
                value={data.settings.introParagraph}
                onSave={(val) => updateSettings({ introParagraph: val })}
                multiline
                as="p"
                tooltip="Click to edit intro paragraph"
              />
            </div>

            {/* LinkedIn Link */}
            <div className="pt-2 flex items-center">
              <a
                href={data.settings.contactLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-amber-300 border border-zinc-700/80 hover:border-amber-400/60 font-medium text-sm tracking-wide transition shadow-lg shadow-black/40 group cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-amber-400" />
                <InlineEditableText
                  value={data.settings.linkedInLabel || 'LinkedIn Profile'}
                  onSave={(val) => updateSettings({ linkedInLabel: val })}
                  as="span"
                  tooltip="Click to edit link label"
                />
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Credibility / Metric strip (50+ Releases, 3+ Yrs, BA Comms) with click-to-edit */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800/80 text-left">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-zinc-100 font-normal">
                  <InlineEditableText
                    value={data.settings.metric1Number || '50+'}
                    onSave={(val) => updateSettings({ metric1Number: val })}
                    as="span"
                    tooltip="Click to edit metric stat"
                  />
                </div>
                <div className="text-xs text-zinc-400 font-sans tracking-wide">
                  <InlineEditableText
                    value={data.settings.metric1Label || 'Digital Content Releases across 5 Platforms (Sasol)'}
                    onSave={(val) => updateSettings({ metric1Label: val })}
                    as="p"
                    tooltip="Click to edit metric description"
                  />
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-amber-400 font-normal">
                  <InlineEditableText
                    value={data.settings.metric2Number || '3+ Yrs'}
                    onSave={(val) => updateSettings({ metric2Number: val })}
                    as="span"
                    tooltip="Click to edit metric stat"
                  />
                </div>
                <div className="text-xs text-zinc-400 font-sans tracking-wide">
                  <InlineEditableText
                    value={data.settings.metric2Label || 'Corporate & Agency Comms Experience'}
                    onSave={(val) => updateSettings({ metric2Label: val })}
                    as="p"
                    tooltip="Click to edit metric description"
                  />
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-zinc-100 font-normal">
                  <InlineEditableText
                    value={data.settings.metric3Number || 'BA Comms'}
                    onSave={(val) => updateSettings({ metric3Number: val })}
                    as="span"
                    tooltip="Click to edit credential"
                  />
                </div>
                <div className="text-xs text-zinc-400 font-sans tracking-wide">
                  <InlineEditableText
                    value={data.settings.metric3Label || 'North-West University Graduate'}
                    onSave={(val) => updateSettings({ metric3Label: val })}
                    as="p"
                    tooltip="Click to edit credential description"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Portrait & Profile Frame matching PDF style */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative glow and border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-zinc-800 to-transparent blur-sm -z-10" />

              <div className="relative rounded-2xl border border-zinc-800 bg-[#121216] p-6 shadow-2xl overflow-hidden">
                {/* Embedded subtle radial motif */}
                <div className="absolute -top-12 -right-12 opacity-30 pointer-events-none">
                  <SpirographMotif size={240} color="gold" />
                </div>

                {/* Portrait presentation with direct Change Image capability */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-5 group">
                  <img
                    src={data.settings.profilePhotoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"}
                    alt="Onica A. Moabi"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Editorial framing overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85" />

                  {/* Change Photo hover button */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 backdrop-blur-md text-xs font-medium transition cursor-pointer shadow-lg"
                      title="Upload new profile picture"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* On-image label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                      <InlineEditableText
                        value={data.settings.cardName || 'ONICA A. MOABI'}
                        onSave={(val) => updateSettings({ cardName: val })}
                        as="p"
                        tooltip="Click to edit card name"
                      />
                    </div>
                    <div className="text-sm font-serif text-zinc-200">
                      <InlineEditableText
                        value={data.settings.cardTitle || 'Communications Practitioner'}
                        onSave={(val) => updateSettings({ cardTitle: val })}
                        as="p"
                        tooltip="Click to edit card title"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      <InlineEditableText
                        value={data.settings.cardSubtitle || 'Corporate Comms · Digital & PR'}
                        onSave={(val) => updateSettings({ cardSubtitle: val })}
                        as="p"
                        tooltip="Click to edit subtitle"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Profile Cards with click-to-edit contact fields */}
                <div className="space-y-2.5 text-xs text-zinc-400">
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-500 font-mono">CURRENT ROLE</span>
                    <InlineEditableText
                      value={data.settings.currentRoleValue || 'Sasol Group External Comms'}
                      onSave={(val) => updateSettings({ currentRoleValue: val })}
                      className="text-zinc-200 font-medium"
                      tooltip="Click to edit current role"
                    />
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-500 font-mono">LISTENING TOOLS</span>
                    <InlineEditableText
                      value={data.settings.listeningToolsValue || 'Hootsuite · Talkwalker'}
                      onSave={(val) => updateSettings({ listeningToolsValue: val })}
                      className="text-zinc-200 font-medium"
                      tooltip="Click to edit tools summary"
                    />
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-500 font-mono">LOCATION</span>
                    <InlineEditableText
                      value={data.settings.contactLocation || 'Johannesburg, Gauteng'}
                      onSave={(val) => updateSettings({ contactLocation: val })}
                      className="text-zinc-200 font-medium"
                      tooltip="Click to edit location"
                    />
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-500 font-mono">PHONE</span>
                    <InlineEditableText
                      value={data.settings.contactCell || '+27 70 381 4751'}
                      onSave={(val) => updateSettings({ contactCell: val })}
                      className="text-zinc-200 font-mono"
                      tooltip="Click to edit phone number"
                    />
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-zinc-500 font-mono">EMAIL</span>
                    <InlineEditableText
                      value={data.settings.contactEmail || 'onika.moabi@gmail.com'}
                      onSave={(val) => updateSettings({ contactEmail: val })}
                      className="text-amber-400 font-mono text-[11px]"
                      tooltip="Click to edit email address"
                    />
                  </div>
                </div>

                {/* Action button to open Images Manager */}
                <button
                  onClick={() => openEditorToTab('images')}
                  className="w-full mt-4 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-amber-300 border border-zinc-700 transition cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Customize Images & Media</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>
    </section>
  );
};
