import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Users,
  CheckCircle2,
  Sparkles,
  Wrench,
  TrendingUp,
  Plus,
  Quote
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SpirographMotif } from './SpirographMotif';
import { InlineEditableText } from './InlineEditableText';
import { BackToTopButton } from './BackToTopButton';

export const AboutSection: React.FC = () => {
  const {
    data,
    updateSettings,
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
    updateReference,
    openEditorToTab
  } = usePortfolio();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newToolInput, setNewToolInput] = useState('');
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [newImpactInput, setNewImpactInput] = useState('');
  const [isAddingImpact, setIsAddingImpact] = useState(false);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addCoreSkill(newSkillInput.trim());
      setNewSkillInput('');
      setIsAddingSkill(false);
    }
  };

  const handleAddToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newToolInput.trim()) {
      addToolSkill(newToolInput.trim());
      setNewToolInput('');
      setIsAddingTool(false);
    }
  };

  const handleAddImpactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImpactInput.trim()) {
      addCareerImpact(newImpactInput.trim());
      setNewImpactInput('');
      setIsAddingImpact(false);
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden border-b border-zinc-800/80">
      {/* Background motif accent */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-30 pointer-events-none">
        <SpirographMotif size={550} color="gold" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching category tag */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-amber-400">
            <User className="w-3.5 h-3.5 shrink-0" />
            <InlineEditableText
              value={data.settings.aboutCategory || 'About / Credentials · Background & References'}
              onSave={(val) => updateSettings({ aboutCategory: val })}
              as="span"
              tooltip="Click to edit category tag"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light tracking-tight">
            <InlineEditableText
              value={data.settings.aboutTitle || 'About / Credentials — Onica A. Moabi'}
              onSave={(val) => updateSettings({ aboutTitle: val })}
              as="span"
              tooltip="Click to edit heading"
            />
          </h2>
          <div className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            <InlineEditableText
              value={data.settings.aboutSubtitle || 'Communications Practitioner · Corporate Communications · Digital & PR'}
              onSave={(val) => updateSettings({ aboutSubtitle: val })}
              as="p"
              tooltip="Click to edit subtitle"
            />
          </div>
        </div>

        {/* Professional Profile Statement Card with click-to-edit */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#16161c] via-[#121216] to-zinc-950 p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Professional Profile</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">Click text to edit directly</span>
          </div>

          <div className="text-base sm:text-lg text-zinc-200 font-serif leading-relaxed italic mb-6">
            <InlineEditableText
              value={data.professionalProfile}
              onSave={(val) => updateProfessionalProfile(val)}
              multiline
              as="p"
              tooltip="Click to edit professional profile statement"
            />
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-zinc-400 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <InlineEditableText
                value={data.settings.contactLocation || 'Johannesburg, Gauteng'}
                onSave={(val) => updateSettings({ contactLocation: val })}
                tooltip="Click to edit location"
              />
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <InlineEditableText
                value={data.settings.contactCell || '+27 70 381 4751'}
                onSave={(val) => updateSettings({ contactCell: val })}
                tooltip="Click to edit phone"
              />
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <InlineEditableText
                value={data.settings.contactEmail || 'onika.moabi@gmail.com'}
                onSave={(val) => updateSettings({ contactEmail: val })}
                tooltip="Click to edit email"
              />
            </div>
            <a
              href={data.settings.contactLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition ml-auto"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Core Skills & Tools & Impact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Core Skills (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <InlineEditableText
                  value={data.settings.coreSkillsTitle || 'Core Skills'}
                  onSave={(val) => updateSettings({ coreSkillsTitle: val })}
                  as="span"
                  tooltip="Click to edit heading"
                />
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">{data.coreSkills.length} Disciplines</span>
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-mono flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Inline Add Skill form */}
            {isAddingSkill && (
              <form onSubmit={handleAddSkillSubmit} className="flex items-center gap-2 mb-2 p-2 rounded-xl bg-zinc-900 border border-amber-500/40">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Enter skill name (e.g. Media Relations)..."
                  autoFocus
                  className="flex-1 bg-transparent text-xs text-zinc-100 outline-none px-2 py-1 font-sans"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-400 text-zinc-950 rounded-lg text-xs font-semibold hover:bg-amber-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSkill(false)}
                  className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-2">
              {data.coreSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative inline-flex items-center rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition pl-3 pr-2 py-1 text-xs font-medium text-zinc-200"
                >
                  <InlineEditableText
                    value={skill}
                    onSave={(val) => updateCoreSkill(idx, val)}
                    tooltip="Click to edit skill"
                  />
                  <button
                    onClick={() => deleteCoreSkill(idx)}
                    title="Remove skill"
                    className="ml-1.5 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Tools & Digital Skills */}
            <div className="pt-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                <h3 className="text-lg font-serif text-zinc-100 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                  <InlineEditableText
                    value={data.settings.toolsSkillsTitle || 'Tools & Digital Skills'}
                    onSave={(val) => updateSettings({ toolsSkillsTitle: val })}
                    as="span"
                    tooltip="Click to edit heading"
                  />
                </h3>
                <button
                  onClick={() => setIsAddingTool(true)}
                  className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-mono flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Tool</span>
                </button>
              </div>

              {isAddingTool && (
                <form onSubmit={handleAddToolSubmit} className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-zinc-900 border border-amber-500/40">
                  <input
                    type="text"
                    value={newToolInput}
                    onChange={(e) => setNewToolInput(e.target.value)}
                    placeholder="Enter tool name (e.g. Talkwalker, Figma)..."
                    autoFocus
                    className="flex-1 bg-transparent text-xs text-zinc-100 outline-none px-2 py-1 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-400 text-zinc-950 rounded-lg text-xs font-semibold hover:bg-amber-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingTool(false)}
                    className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </form>
              )}

              <div className="flex flex-wrap gap-2">
                {data.toolsAndDigitalSkills.map((tool, idx) => (
                  <div
                    key={idx}
                    className="group relative inline-flex items-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 pl-2.5 pr-1.5 py-1"
                  >
                    <InlineEditableText
                      value={tool}
                      onSave={(val) => updateToolSkill(idx, val)}
                      tooltip="Click to edit tool"
                    />
                    <button
                      onClick={() => deleteToolSkill(idx)}
                      title="Remove tool"
                      className="ml-1.5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-400 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Career Impact (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                <InlineEditableText
                  value={data.settings.careerImpactTitle || 'Selected Career Impact'}
                  onSave={(val) => updateSettings({ careerImpactTitle: val })}
                  as="span"
                  tooltip="Click to edit heading"
                />
              </h3>
              <button
                onClick={() => setIsAddingImpact(true)}
                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-mono flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Milestone</span>
              </button>
            </div>

            {isAddingImpact && (
              <form onSubmit={handleAddImpactSubmit} className="flex items-center gap-2 mb-2 p-2 rounded-xl bg-zinc-900 border border-amber-500/40">
                <input
                  type="text"
                  value={newImpactInput}
                  onChange={(e) => setNewImpactInput(e.target.value)}
                  placeholder="Enter career milestone..."
                  autoFocus
                  className="flex-1 bg-transparent text-xs text-zinc-100 outline-none px-2 py-1 font-sans"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-400 text-zinc-950 rounded-lg text-xs font-semibold hover:bg-amber-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingImpact(false)}
                  className="px-2 py-1 text-zinc-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
              </form>
            )}

            <div className="rounded-2xl border border-zinc-800 bg-[#121216] p-6 space-y-4">
              {data.selectedCareerImpact.map((impact, idx) => (
                <div key={idx} className="group flex items-start gap-3 text-xs text-zinc-300 leading-relaxed pb-3 border-b border-zinc-800/60 last:border-0 last:pb-0">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <InlineEditableText
                      value={impact}
                      onSave={(val) => updateCareerImpact(idx, val)}
                      multiline
                      tooltip="Click to edit impact milestone"
                    />
                  </div>
                  <button
                    onClick={() => deleteCareerImpact(idx)}
                    title="Remove milestone"
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 transition text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Professional Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Work Experience Timeline (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif text-zinc-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                <InlineEditableText
                  value={data.settings.experienceTitle || 'Professional Experience'}
                  onSave={(val) => updateSettings({ experienceTitle: val })}
                  as="span"
                  tooltip="Click to edit heading"
                />
              </h3>
              <span className="text-xs font-mono text-zinc-400 uppercase">Click any role/bullet to edit</span>
            </div>

            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 hover:border-amber-500/30 transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <InlineEditableText
                      value={exp.role}
                      onSave={(val) => updateExperience({ ...exp, role: val })}
                      as="h4"
                      className="font-serif text-lg text-zinc-100"
                      tooltip="Click to edit job role"
                    />
                    <InlineEditableText
                      value={exp.period}
                      onSave={(val) => updateExperience({ ...exp, period: val })}
                      className="text-xs font-mono text-amber-400 font-medium"
                      tooltip="Click to edit dates"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 flex-wrap">
                    <InlineEditableText
                      value={exp.organization}
                      onSave={(val) => updateExperience({ ...exp, organization: val })}
                      className="text-zinc-200 font-semibold"
                      tooltip="Click to edit company"
                    />
                    <span>•</span>
                    <InlineEditableText
                      value={exp.type}
                      onSave={(val) => updateExperience({ ...exp, type: val })}
                      tooltip="Click to edit employment type"
                    />
                    {exp.location && (
                      <>
                        <span>•</span>
                        <InlineEditableText
                          value={exp.location}
                          onSave={(val) => updateExperience({ ...exp, location: val })}
                          tooltip="Click to edit location"
                        />
                      </>
                    )}
                  </div>

                  {exp.summary && (
                    <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                      <InlineEditableText
                        value={exp.summary}
                        onSave={(val) => updateExperience({ ...exp, summary: val })}
                        multiline
                        tooltip="Click to edit experience summary"
                      />
                    </div>
                  )}

                  <ul className="space-y-2 text-xs text-zinc-400 pt-1">
                    {exp.bulletPoints.map((point, idx) => (
                      <li key={idx} className="group/bullet flex items-start gap-2">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <div className="flex-1 leading-relaxed text-zinc-300">
                          <InlineEditableText
                            value={point}
                            onSave={(val) => updateExperienceBullet(exp.id, idx, val)}
                            multiline
                            tooltip="Click to edit bullet point"
                          />
                        </div>
                        <button
                          onClick={() => deleteExperienceBullet(exp.id, idx)}
                          title="Delete bullet"
                          className="opacity-0 group-hover/bullet:opacity-100 text-zinc-500 hover:text-rose-400 text-xs px-1"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const bullet = window.prompt('Enter new responsibility bullet:');
                        if (bullet && bullet.trim()) {
                          addExperienceBullet(exp.id, bullet.trim());
                        }
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add responsibility bullet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Endorsements Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-lg font-serif text-zinc-100 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <InlineEditableText
                    value={data.settings.educationTitle || 'Education & Academic Credentials'}
                    onSave={(val) => updateSettings({ educationTitle: val })}
                    as="span"
                    tooltip="Click to edit heading"
                  />
                </h3>
              </div>

              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl border border-zinc-800/90 bg-[#121216] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <InlineEditableText
                        value={edu.period}
                        onSave={(val) => updateEducation({ ...edu, period: val })}
                        className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold"
                        tooltip="Click to edit dates"
                      />
                      <InlineEditableText
                        value={edu.status}
                        onSave={(val) => updateEducation({ ...edu, status: val })}
                        className="text-xs font-mono text-zinc-400"
                        tooltip="Click to edit status"
                      />
                    </div>

                    <InlineEditableText
                      value={edu.degree}
                      onSave={(val) => updateEducation({ ...edu, degree: val })}
                      as="h4"
                      className="font-serif text-base text-zinc-100"
                      tooltip="Click to edit degree"
                    />
                    <InlineEditableText
                      value={edu.institution}
                      onSave={(val) => updateEducation({ ...edu, institution: val })}
                      as="p"
                      className="text-xs font-mono text-zinc-400"
                      tooltip="Click to edit institution"
                    />

                    {edu.details && (
                      <InlineEditableText
                        value={edu.details}
                        onSave={(val) => updateEducation({ ...edu, details: val })}
                        as="p"
                        className="text-xs text-zinc-400 leading-relaxed pt-1"
                        tooltip="Click to edit details"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* References Strip with Direct Click-to-Edit */}
        <div className="mb-16 pt-10 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
                <Users className="w-4 h-4 shrink-0" />
                <InlineEditableText
                  value={data.settings.referencesTitle || 'Professional References & Endorsements'}
                  onSave={(val) => updateSettings({ referencesTitle: val })}
                  as="span"
                  tooltip="Click to edit heading"
                />
              </div>
              <h3 className="text-2xl font-serif text-zinc-100 font-light">
                <InlineEditableText
                  value={data.settings.referencesSubtitle || `Leadership Endorsements (${data.references.length})`}
                  onSave={(val) => updateSettings({ referencesSubtitle: val })}
                  as="span"
                  tooltip="Click to edit sub-heading"
                />
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openEditorToTab('references')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider transition cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reference</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.references.map((ref) => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl border border-zinc-800 bg-[#121216] space-y-3 flex flex-col justify-between hover:border-amber-500/30 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-full">
                      <InlineEditableText
                        value={ref.name}
                        onSave={(val) => updateReference({ ...ref, name: val })}
                        as="h4"
                        className="font-serif text-base text-zinc-100 font-medium"
                        tooltip="Click to edit reference name"
                      />
                      <InlineEditableText
                        value={ref.organization}
                        onSave={(val) => updateReference({ ...ref, organization: val })}
                        className="text-xs font-mono text-amber-400 uppercase tracking-wide block mt-0.5"
                        tooltip="Click to edit organization"
                      />
                    </div>
                  </div>

                  <InlineEditableText
                    value={ref.role}
                    onSave={(val) => updateReference({ ...ref, role: val })}
                    className="text-xs text-zinc-300 font-sans block"
                    tooltip="Click to edit role"
                  />

                  {ref.relationship && (
                    <div className="inline-block px-2 py-0.5 rounded-md bg-zinc-800/90 text-[10px] font-mono text-zinc-400">
                      <InlineEditableText
                        value={ref.relationship}
                        onSave={(val) => updateReference({ ...ref, relationship: val })}
                        tooltip="Click to edit relationship"
                      />
                    </div>
                  )}

                  {ref.quote && (
                    <div className="pt-2 border-t border-zinc-800/60">
                      <div className="flex items-start gap-1.5 text-zinc-400 text-xs italic">
                        <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <InlineEditableText
                          value={ref.quote}
                          onSave={(val) => updateReference({ ...ref, quote: val })}
                          multiline
                          tooltip="Click to edit recommendation quote"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-800/60 space-y-1.5 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                    <InlineEditableText
                      value={ref.email}
                      onSave={(val) => updateReference({ ...ref, email: val })}
                      className="truncate text-zinc-300"
                      tooltip="Click to edit email"
                    />
                  </div>
                  {ref.phoneNote && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <Phone className="w-3 h-3 text-zinc-500 shrink-0" />
                      <InlineEditableText
                        value={ref.phoneNote}
                        onSave={(val) => updateReference({ ...ref, phoneNote: val })}
                        tooltip="Click to edit phone note"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Back to Top Button */}
        <BackToTopButton variant="bar" />
      </div>
    </section>
  );
};
