export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  clientOrOrg: string;
  period: string;
  category: 'Corporate Comms' | 'Digital Strategy' | 'Campaign Execution' | 'Community & Reputation' | 'PR & Media' | 'Speculative Concept';
  isSpeculative?: boolean;
  priority: number;
  summary: string;
  heroImage?: string;
  brief: string;
  roleAndContribution: string[];
  audienceAndStrategy: string;
  keyDeliverables: string[];
  sampleCopyOrContent: {
    heading: string;
    platform?: string;
    context: string;
    body: string;
  }[];
  actionableInsights?: string[];
  outcomesAndImpact: string[];
  whatThisSells: string[];
  driveAttachment?: {
    fileId?: string;
    fileName?: string;
    fileUrl?: string;
  };
}

export interface WritingSample {
  id: string;
  title: string;
  category: 'Social & Digital Copy' | 'PR & Corporate Writing' | 'Stakeholder & Community' | 'Insights & Recommendations';
  targetAudience: string;
  objective: string;
  contribution: string;
  platformOrChannel: string;
  dateOrEra: string;
  content: string;
  tags: string[];
  takeaway: string;
}

export interface CommunicationNote {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
  highlightQuote: string;
  keyTakeaways: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  imageUrl?: string;
  category?: 'Newsletters' | 'Magazine Articles' | 'Flyers & Design' | 'Community Management' | 'Internal Comms' | 'Events' | string;
  organization?: string;
  period?: string;
  description?: string;
  highlights?: string[];
  aspectRatio?: string;
  badge?: string;
  accentQuote?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  email: string;
  phoneNote?: string;
  relationship?: string;
  quote?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location?: string;
  summary: string;
  bulletPoints: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string;
  details?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Corporate Storytelling' | 'Editorial & Publications' | 'Social & Digital' | 'Brand & Graphic Design' | 'Events & Activations';
  organization: string;
  year: string;
  imageUrl: string;
  description: string;
  tags: string[];
  clientOrContext?: string;
  linkOrCaseStudyId?: string;
}

export interface PortfolioSettings {
  isPrivateMode: boolean;
  accessPasscode: string;
  allowedTokens: string[];
  headline: string;
  subHeadline: string;
  introParagraph: string;
  heroPitch: string;
  profilePhotoUrl: string;
  contactEmail: string;
  contactCell: string;
  contactLocation: string;
  contactLinkedIn: string;
  activeCvUrl?: string;
  activeCvName?: string;

  // Section Headings & Category Text (Click-to-edit)
  heroCategory?: string;

  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryCategory?: string;

  workTitle?: string;
  workSubtitle?: string;
  workCategory?: string;

  writingTitle?: string;
  writingSubtitle?: string;
  writingCategory?: string;

  notesTitle?: string;
  notesSubtitle?: string;
  notesCategory?: string;

  archiveTitle?: string;
  archiveSubtitle?: string;
  archiveCategory?: string;

  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutCategory?: string;

  // Subsection Headings
  careerImpactTitle?: string;
  experienceTitle?: string;
  educationTitle?: string;
  referencesTitle?: string;
  referencesSubtitle?: string;
  coreSkillsTitle?: string;
  toolsSkillsTitle?: string;

  // Header, Hero metrics & portrait card text
  brandName?: string;
  brandTitle?: string;
  linkedInLabel?: string;
  metric1Number?: string;
  metric1Label?: string;
  metric2Number?: string;
  metric2Label?: string;
  metric3Number?: string;
  metric3Label?: string;
  cardName?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  currentRoleValue?: string;
  listeningToolsValue?: string;

  // Dossier & Footer
  verifiedDossierTitle?: string;
  verifiedDossierText?: string;
  verifiedDossierButtonText?: string;
  footerTagline?: string;
  footerNotice?: string;
}

export interface FullPortfolioData {
  settings: PortfolioSettings;
  professionalProfile: string;
  coreSkills: string[];
  toolsAndDigitalSkills: string[];
  selectedCareerImpact: string[];
  caseStudies: CaseStudy[];
  galleryItems: GalleryItem[];
  writingSamples: WritingSample[];
  notes: CommunicationNote[];
  archiveItems: ArchiveItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  references: ReferenceItem[];
}
