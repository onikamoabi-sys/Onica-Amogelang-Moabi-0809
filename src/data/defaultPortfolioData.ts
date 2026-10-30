import { FullPortfolioData } from '../types/portfolio';

export const defaultPortfolioData: FullPortfolioData = {
  settings: {
    isPrivateMode: true,
    accessPasscode: 'ONICA2025',
    allowedTokens: ['recruiter', 'sasol', 'portfolio', 'vip', 'talent'],
    headline: "Good communication doesn't just tell a story. It makes the story matter.",
    subHeadline: "Translating complex business and industry information into clear, audience-focused communication across digital, media and stakeholder channels.",
    introParagraph: "Communications professional with 3+ years of experience across corporate communications, public relations, digital communications, content, community management and stakeholder engagement. Currently working in Group External Communications at Sasol.",
    heroPitch: "COMMUNICATIONS PRACTITIONER · CORPORATE COMMUNICATIONS · DIGITAL & PR",
    profilePhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    contactEmail: "onika.moabi@gmail.com",
    contactCell: "+27 70 381 4751",
    contactLocation: "Johannesburg, Gauteng",
    contactLinkedIn: "https://www.linkedin.com/in/onica-moabi-107017188",
    activeCvName: "Onica_A_Moabi_Communications_Practitioner_CV.pdf",
    activeCvUrl: "",
    heroCategory: "Home · Professional Positioning",

    galleryTitle: "Work Gallery — Featured Deliverables & Campaigns",
    gallerySubtitle: "Explore corporate digital releases, publications, community campaigns, and brand collateral across Sasol, AFSA, Instinctif Partners, and independent projects.",
    galleryCategory: "Work Gallery · Visual Portfolio",

    workTitle: "Selected Work — Strategic Case Studies & Proof",
    workSubtitle: "In-depth breakdowns demonstrating how strategic thinking, audience listening, and deliberate copywriting convert corporate priorities into measurable resonance.",
    workCategory: "Selected Work · Proof of Impact",

    writingTitle: "The Writing Room — The Craft of Written Communication",
    writingSubtitle: "Every sample below is framed with three essential strategic anchors: the intended audience, the business objective, and my direct editorial contribution.",
    writingCategory: "The Writing Room · The Craft",

    notesTitle: "The Edit — Notes on Communication",
    notesSubtitle: "Short, critical essays demonstrating strategic judgement, brand reputation awareness, and what it takes to make communication genuinely human.",
    notesCategory: "The Edit · Point of View",

    archiveTitle: "The Archive / Media Gallery",
    archiveSubtitle: "Curated publications, desktop publishing layouts, community management campaigns, and on-the-ground event executions across AFSA, Instinctif Partners, and freelance tenures.",
    archiveCategory: "The Archive · Foundational Media",

    aboutTitle: "About / Credentials — Onica A. Moabi",
    aboutSubtitle: "Communications Practitioner · Corporate Communications · Digital & PR",
    aboutCategory: "About / Credentials · Background & References",

    careerImpactTitle: "Selected Career Impact",
    experienceTitle: "Professional Experience",
    educationTitle: "Education & Academic Credentials",
    referencesTitle: "Professional References & Endorsements",
    coreSkillsTitle: "Core Competencies & Strategic Capabilities",
    toolsSkillsTitle: "Tools & Digital Systems",

    // Header, Hero metrics & portrait card text
    brandName: "ONICA A. MOABI",
    brandTitle: "Communications Practitioner · Digital & PR",
    linkedInLabel: "LinkedIn Profile",
    metric1Number: "50+",
    metric1Label: "Digital Content Releases across 5 Platforms (Sasol)",
    metric2Number: "3+ Yrs",
    metric2Label: "Corporate & Agency Comms Experience",
    metric3Number: "BA Comms",
    metric3Label: "North-West University Graduate",
    cardName: "ONICA A. MOABI",
    cardTitle: "Communications Practitioner",
    cardSubtitle: "Corporate Comms · Digital & PR",
    currentRoleValue: "Sasol Group External Comms",
    listeningToolsValue: "Hootsuite · Talkwalker",

    // Dossier & Footer
    verifiedDossierTitle: "Verified Dossier",
    verifiedDossierText: "Full work samples, Talkwalker listening reports, and verified references available directly upon recruiter request.",
    verifiedDossierButtonText: "Request Full Portfolio Dossier",
    footerTagline: "Good communication doesn’t just tell a story. It makes the story matter.",
    footerNotice: "Private Portfolio Edition · Built for Recruiter Review",
  },
  professionalProfile: "Communications professional with 3+ years of experience across corporate communications, public relations, digital communications, content, community management and stakeholder engagement. Currently working in Group External Communications at Sasol, supporting corporate reputation, media relations, digital content, social listening and cross-functional communication campaigns. Experienced in translating complex business and industry information into clear, audience-focused communication across digital, media and stakeholder channels. Brings agency and corporate experience across energy, mining, financial services, technology, construction, automotive, real estate and FMCG, with hands-on capability in copywriting, media monitoring, content planning, social media management, communications reporting and campaign execution.",
  coreSkills: [
    "Corporate Communications",
    "External Communications",
    "Digital Communications",
    "Public Relations",
    "Media Relations",
    "Community Management",
    "Social Media Management",
    "Content Strategy & Copywriting",
    "Stakeholder Engagement",
    "Reputation Management",
    "Media Monitoring & Social Listening",
    "Campaign Management",
    "Communications Reporting & Insights",
    "Event Communications",
    "Research & Analysis",
    "Brand & Message Management"
  ],
  toolsAndDigitalSkills: [
    "Hootsuite",
    "Talkwalker",
    "Canva",
    "Microsoft Office",
    "LinkedIn",
    "Instagram",
    "Facebook",
    "TikTok",
    "X",
    "Social listening & analytics",
    "Content scheduling",
    "Digital reporting"
  ],
  selectedCareerImpact: [
    "50+ pieces of corporate and digital content created, repurposed and published across five major social platforms at Sasol.",
    "Delivered multiple Hootsuite/Talkwalker analyses with performance insights and recommendations for digital communication teams.",
    "Built experience across both corporate and agency environments, supporting communications for energy, mining, financial services, technology, construction, automotive, property and FMCG.",
    "Contributed to communications for major corporate, social investment, skills development, innovation, community and stakeholder initiatives."
  ],
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Sasol Decarbonisation & Industrial Storytelling',
      subtitle: 'External digital releases highlighting green energy procurement',
      category: 'Corporate Storytelling',
      organization: 'Sasol',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      description: 'Strategic social releases and external articles translating renewable energy transitions and corporate milestones into engaging, public-facing digital copy across LinkedIn and X.',
      tags: ['Corporate Comms', 'Clean Energy', 'Executive Copywriting', 'LinkedIn'],
      clientOrContext: 'Group External Communications',
      linkOrCaseStudyId: 'sasol-corporate-storytelling'
    },
    {
      id: 'gal-2',
      title: 'Hootsuite & Talkwalker Social Listening Reports',
      subtitle: 'Data-driven sentiment monitoring & competitor benchmarking',
      category: 'Social & Digital',
      organization: 'Sasol',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'In-depth listening sweeps across Sasol Energy, Chemicals, and Retail, transforming unstructured audience commentary into predictive communications recommendations.',
      tags: ['Social Listening', 'Analytics', 'Talkwalker', 'Hootsuite'],
      clientOrContext: 'Digital Strategy & Intelligence',
      linkOrCaseStudyId: 'sasol-social-listening-insights'
    },
    {
      id: 'gal-3',
      title: 'National Skills Competition Live Coverage',
      subtitle: 'Multi-stage campaign celebrating next-generation artisans',
      category: 'Events & Activations',
      organization: 'Sasol Foundation & Kagiso Trust',
      year: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
      description: 'Pre-event teasers, live arena reporting at Sun Bet Arena, and post-competition victor profiles honoring top vocational learners across South Africa.',
      tags: ['Event Coverage', 'Campaign Execution', 'Youth Skills', 'CSI'],
      clientOrContext: 'Sasol Foundation & Kagiso Trust',
      linkOrCaseStudyId: 'sasol-foundation-skills-competition'
    },
    {
      id: 'gal-4',
      title: 'SA Aluminium News Magazine (Vol. 5, Issues 1 & 2)',
      subtitle: 'Complete editorial design, desktop publishing & technical features',
      category: 'Editorial & Publications',
      organization: 'AFSA',
      year: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80',
      description: 'Created all layouts, curated technical articles, and spotlighted industry members including Hulamin, Wispeco, and South32 for South Africa’s premier aluminium publication.',
      tags: ['Desktop Publishing', 'Editorial Design', 'Newsletters', 'AFSA'],
      clientOrContext: 'Aluminium Federation of South Africa'
    },
    {
      id: 'gal-5',
      title: 'Solange Knowles: Creative Renaissance Editorial',
      subtitle: 'Typography grid, image sourcing & editorial layout design',
      category: 'Editorial & Publications',
      organization: 'Academic / Editorial Media',
      year: '2022',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      description: 'Two-column magazine layout celebrating Solange Knowles’ artistic evolution, showcasing typographic pacing, pull-quote balance, and desktop publishing fluency.',
      tags: ['Magazine Layout', 'Typography', 'Art Direction', 'Publishing'],
      clientOrContext: 'Editorial Portfolio'
    },
    {
      id: 'gal-6',
      title: 'NWU X #AMINEXT Campus Movement Feature',
      subtitle: 'Investigative campus journalism standing against GBV',
      category: 'Editorial & Publications',
      organization: 'North-West University',
      year: '2019',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      description: 'Authored an investigative feature capturing student mobilization and institutional responses to gender-based violence, contributing directly to university safety discourse.',
      tags: ['Journalism', 'Campus Comms', 'Social Advocacy', 'NWU'],
      clientOrContext: 'Vanderbijlpark Campus Publication'
    },
    {
      id: 'gal-7',
      title: 'Bryte Insurance Social Risk Awareness',
      subtitle: 'SME festive preparedness & business continuity campaigns',
      category: 'Social & Digital',
      organization: 'Bryte Insurance via Instinctif',
      year: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
      description: 'Designed social media content calendars and wrote actionable risk-advisory copy for SME business owners ahead of the holiday season.',
      tags: ['B2B Marketing', 'Insurance Comms', 'Social Content', 'Risk'],
      clientOrContext: 'Instinctif Partners Africa'
    },
    {
      id: 'gal-8',
      title: 'Instinctif Partners Siyakubonga & Culture Cards',
      subtitle: 'Multilingual employee recognition & workplace belonging',
      category: 'Brand & Graphic Design',
      organization: 'Instinctif Partners Africa',
      year: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      description: 'Conceptualized and designed internal culture graphics including multilingual “Siyakubonga / Rea Leboga” cards, Heritage Day celebrations, and wellness campaigns.',
      tags: ['Internal Branding', 'Graphic Design', 'Culture Comms', 'Wellness'],
      clientOrContext: 'Internal Communications'
    },
    {
      id: 'gal-9',
      title: 'NAACAM Show 2023 & AGOA 20th Forum Exhibition',
      subtitle: 'Conference booth coordination & direct stakeholder engagement',
      category: 'Events & Activations',
      organization: 'AFSA / NAACAM / AGOA',
      year: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: 'Managed exhibition booth presentation, live collateral distribution, and direct delegate engagement at South Africa’s leading automotive and international trade conferences.',
      tags: ['Events', 'Client Engagement', 'Exhibitions', 'Trade Comms'],
      clientOrContext: 'Trade Conferences (Sun Bet Arena, Menlyn)'
    },
    {
      id: 'gal-10',
      title: 'Commercial Brand Flyers & Career Revamping',
      subtitle: 'Print & digital marketing collateral for SMEs and professionals',
      category: 'Brand & Graphic Design',
      organization: 'Freelance & Consultative',
      year: '2022',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      description: 'Visual identity collateral created for Tswelopele Babysitting, Lethokuhle Health Care Training, and executive resume revamping packages.',
      tags: ['Flyers', 'Canva Design', 'Visual Identity', 'SME Branding'],
      clientOrContext: 'Freelance Design'
    },
    {
      id: 'gal-11',
      title: 'The Crafts That Build Us: Campaign Concept',
      subtitle: 'Self-initiated 360° strategic campaign repositioning technical trades',
      category: 'Corporate Storytelling',
      organization: 'Independent Project',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      description: 'A comprehensive, multi-channel strategy repositioning vocational crafts for South Africa’s youth through cinematic digital content, TVET hubs, and corporate partnerships.',
      tags: ['Campaign Architecture', 'Creative Direction', 'Youth Empowerment'],
      clientOrContext: 'Speculative Initiative',
      linkOrCaseStudyId: 'empowerartisan-speculative-concept'
    },
    {
      id: 'gal-12',
      title: 'Capital Markets PR & Media Monitoring Dossiers',
      subtitle: 'Financial results announcements & executive briefings',
      category: 'Corporate Storytelling',
      organization: 'Instinctif Partners Africa',
      year: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      description: 'Prepared media statements, daily press monitoring summaries, and earnings releases for listed clients across mining, finance, and industrial sectors.',
      tags: ['Capital Markets', 'PR & Media', 'Media Monitoring', 'JSE'],
      clientOrContext: 'Instinctif Partners Africa',
      linkOrCaseStudyId: 'instinctif-corporate-toolkit'
    }
  ],
  caseStudies: [
    {
      id: 'sasol-corporate-storytelling',
      title: 'Corporate Storytelling in the Digital Space',
      subtitle: 'Translating complex corporate priorities into human-centered digital communication across multidisciplinary channels.',
      clientOrOrg: 'Sasol',
      period: 'Group External Communications',
      category: 'Corporate Comms',
      priority: 1,
      heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      summary: 'Authored and orchestrated over 50 digital content releases, translating group milestones, energy transition initiatives, and stakeholder achievements into relatable narratives across LinkedIn, X, and corporate portals.',
      brief: 'Sasol needed to elevate its brand presence and engage a multifaceted stakeholder ecosystem—including investors, communities, industry partners, and prospective talent—without getting bogged down in impenetrable corporate jargon.',
      roleAndContribution: [
        'Served in Group External Communications to develop, adapt, and copywrite digital stories aligned with corporate messaging pillars.',
        'Authored and adapted over 50 pieces of external digital copy tailored specifically for varied platform demographics.',
        'Collaborated with multimedia specialists and channel leads to ensure consistent corporate tone of voice and strict brand compliance.',
        'Instituted a copy-first framework that stripped away corporate abstractions in favor of clear, active-voice impact statements.'
      ],
      audienceAndStrategy: 'Segmented communications into three core tiers: Corporate/Investor stakeholders (governance, sustainability milestones), Community/Public (socio-economic development, community upliftment), and Industry Professionals (technical innovation and green initiatives).',
      keyDeliverables: [
        '50+ published social posts and digital features',
        'Cross-platform copy matrix (LinkedIn thought leadership vs X real-time updates)',
        'Content calendar coordination across group subsidiaries',
        'Tone of voice guidelines for executive quoting and partner highlights'
      ],
      sampleCopyOrContent: [
        {
          heading: 'Executive Sustainability Announcement (LinkedIn)',
          platform: 'LinkedIn',
          context: 'Targeting industry leaders, ESG analysts, and institutional partners.',
          body: 'Decarbonisation is not just an engineering roadmap—it is a commitment to the communities that power our economy. Today marks an important milestone as we advance our renewable energy procurement initiatives, proving that industrial progress and sustainable stewardship can move forward together. Discover how our cross-functional teams are turning long-term vision into daily operations.'
        },
        {
          heading: 'Employee Spotlight: Women in Engineering (X / Twitter)',
          platform: 'X (formerly Twitter)',
          context: 'High-velocity corporate culture spotlight for public engagement.',
          body: '“When young girls see women leading safety, process engineering, and heavy industry, the impossible becomes achievable.” Meet Lerato, one of the dedicated engineers behind our synthetic fuels operations. #WomenInSTEM #SasolPeople #BuildingTheFuture'
        }
      ],
      actionableInsights: [
        'Posts spotlighting real people behind technical operations achieved 3.2x higher engagement than generalized corporate statements.',
        'Active-voice opening hooks on LinkedIn reduced drop-off rates on outbound link clicks by 44%.'
      ],
      outcomesAndImpact: [
        'Successfully supported publishing of 50+ pieces of high-visibility corporate content.',
        'Standardized post formats adopted across recurring external communications campaigns.',
        'Strengthened employee advocacy through authentic human storytelling.'
      ],
      whatThisSells: [
        'Corporate Communications',
        'Digital Content Strategy',
        'Executive Copywriting',
        'Channel Management'
      ]
    },
    {
      id: 'sasol-social-listening-insights',
      title: 'From Social Listening to Actionable Insights',
      subtitle: 'Harnessing Hootsuite and Talkwalker analytics to transform raw digital chatter into predictive communication strategies.',
      clientOrOrg: 'Sasol',
      period: 'Digital Strategy & Listening',
      category: 'Digital Strategy',
      priority: 2,
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      summary: 'Monitored brand sentiment, competitor activity, and public discourse using enterprise listening platforms, generating strategic reports that guided editorial pivots and mitigated potential reputational friction.',
      brief: 'How do you know if your corporate message is truly landing, or simply vanishing into the digital void? The business needed actionable visibility into audience sentiment around energy, sustainability, and community initiatives.',
      roleAndContribution: [
        'Configured keyword tracking matrices, topic clusters, and sentiment monitors in Hootsuite and Talkwalker.',
        'Synthesized weekly and ad-hoc listening sweeps into executive-ready communication debriefs.',
        'Flagged early signals of community queries, preventing escalation into public relation controversies.',
        'Formulated clear recommendations that bridged data findings directly to upcoming editorial content cycles.'
      ],
      audienceAndStrategy: 'Internal leadership, brand custodians, and digital marketing coordinators who required factual sentiment data rather than speculative assumptions before approving campaign budgets.',
      keyDeliverables: [
        'Weekly Digital Sentiment & Share-of-Voice Dashboards',
        'Competitor benchmarking reports across South African energy and manufacturing sectors',
        'Anonymised case study reports on query escalation spikes',
        'Strategic recommendations document for quarterly editorial planning'
      ],
      sampleCopyOrContent: [
        {
          heading: 'Executive Listening Brief Excerpt',
          platform: 'Internal Intelligence Memo',
          context: 'Anonymised finding following a regional community event announcement.',
          body: 'Key Finding: 68% of inbound commentary centered on local employment criteria rather than event festivities. Recommendation: Shift subsequent campaign messaging from celebratory tone to an informational FAQ addressing recruitment transparency and verified application portals.'
        }
      ],
      actionableInsights: [
        'Discovered that technical acronyms in sustainability releases sparked confusion and skeptical comments; recommended plain-language glossaries that immediately decreased negative sentiment by 28%.',
        'Identified optimal posting windows (Tuesday & Thursday mornings) for B2B engagement across Southern Africa.'
      ],
      outcomesAndImpact: [
        'Equipped communications leadership with evidence-based rationale for editorial pivots.',
        'Transformed reactive social monitoring into proactive message calibration.',
        'Reduced misinformation spread through rapid-response clarifying content.'
      ],
      whatThisSells: [
        'Analytical Thinking',
        'Social Listening (Hootsuite / Talkwalker)',
        'Communications Reporting',
        'Reputation Risk Mitigation'
      ]
    },
    {
      id: 'sasol-foundation-skills-competition',
      title: 'Turning an Event into a Multi-Stage Story',
      subtitle: 'End-to-end campaign execution for the Sasol Foundation & Kagiso Trust National Skills Competition.',
      clientOrOrg: 'Sasol Foundation & Kagiso Trust',
      period: 'Campaign & Event Storytelling',
      category: 'Campaign Execution',
      priority: 3,
      heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
      summary: 'Crafted a three-stage communication campaign—Anticipation, Live Event Coverage, and Post-Event Legacy—celebrating South Africa’s next generation of skilled artisans and vocational learners.',
      brief: 'Vocational skills and technical trades are critical to South Africa’s economic development, yet technical artisans are frequently under-celebrated. The campaign needed to make technical education relatable, inspiring, and worthy of national pride.',
      roleAndContribution: [
        'Architected the multi-stage narrative arc: anticipation teasers, live arena reporting, and victor profiles.',
        'Developed live event coverage copy capturing learner tension, skill showcases, and award celebrations in real time.',
        'Conducted short interviews with student participants to distill authentic quotes for social and press assets.',
        'Coordinated visual asset alignment with partner foundations (Kagiso Trust and Sasol Foundation).'
      ],
      audienceAndStrategy: 'Learners, educators, technical training colleges (TVETs), corporate partners, and youth development advocates across South Africa.',
      keyDeliverables: [
        'Comprehensive 3-phase Content Calendar',
        'Live social coverage playbook (Instagram, Facebook, LinkedIn, X)',
        'Post-event press release draft and quote repository',
        'Short-form celebratory winner cards and achievement showcases'
      ],
      sampleCopyOrContent: [
        {
          heading: 'Phase 1: Pre-Event Anticipation Copy',
          platform: 'Multi-Channel Teaser',
          context: 'Building excitement among colleges and families.',
          body: 'Precision welding. Automotive technology. Electrical installations. These aren’t just trades—they are the engines of our infrastructure. In 48 hours, South Africa’s most talented vocational students will compete at the Sasol Foundation & Kagiso Trust National Skills Competition. Stay tuned as we spotlight the hands shaping tomorrow.'
        },
        {
          heading: 'Phase 2: Live Arena Coverage Copy',
          platform: 'Live Digital Broadcast / Social',
          context: 'Capturing the atmosphere as the judges deliberate.',
          body: 'Tension, precision, and pure passion on the arena floor! When millimeters make the difference between gold and silver, our competitors prove that technical craftsmanship is an art form. Meet Sibusiso from Mpumalanga, putting the final touches on his electrical circuitry installation.'
        },
        {
          heading: 'Phase 3: Winner Announcement & Legacy',
          platform: 'LinkedIn & Press Wire',
          context: 'Celebrating champions and reinforcing corporate citizenship.',
          body: 'Huge congratulations to all the winners of the National Skills Competition! By investing in technical and vocational excellence, Sasol Foundation and Kagiso Trust are creating tangible pathways to youth employment and economic sovereignty. The future of South African industry is in brilliant hands.'
        }
      ],
      actionableInsights: [
        'Video and quote-led content featuring the artisans explaining their passion outperformed standard graphic announcements by over 210%.',
        'Framing vocational training as high-technology mastery shifted audience comments from polite applause to enthusiastic sharing by parents and colleges.'
      ],
      outcomesAndImpact: [
        'Delivered complete cross-channel coverage with zero missed milestones across the 3-day competition.',
        'Generated substantial organic pickup from provincial education departments and TVET colleges.',
        'Established a reusable event storytelling blueprint for future foundation initiatives.'
      ],
      whatThisSells: [
        'Campaign Execution',
        'Event Communications',
        'Stakeholder Storytelling',
        'Multi-Phase Content Planning'
      ]
    },
    {
      id: 'sasol-community-management-reputation',
      title: 'Beyond the Comment Section: Reputation & Care',
      subtitle: 'Designing an empathy-led enquiry-to-resolution framework for high-visibility public channels.',
      clientOrOrg: 'Sasol',
      period: 'Community Management & Public Affairs',
      category: 'Community & Reputation',
      priority: 4,
      heroImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
      summary: 'Spearheaded brand community engagement, distinguishing routine queries from potential reputational triggers, and establishing a nuanced tone-of-voice playbook for difficult online conversations.',
      brief: 'Large industrial entities face diverse public commentary daily—ranging from passionate bursary queries and supply-chain requests to environmental inquiries. The challenge was maintaining human empathy while rigorously protecting corporate integrity.',
      roleAndContribution: [
        'Developed a clear 4-tier Enquiry-to-Resolution matrix (Informational, Service Request, Escalation, and Crisis Sensitive).',
        'Drafted standardized yet customizable response templates reflecting patience, warmth, and accuracy.',
        'Identified when to transition heated public debates into verified, private corporate resolution channels.',
        'Collaborated directly with legal and media relations teams when complex public inquiries arose.'
      ],
      audienceAndStrategy: 'Job seekers, local community members, university students seeking bursaries, and active social media commentators.',
      keyDeliverables: [
        'Tiered Community Engagement Protocol',
        'FAQ response handbook with pre-cleared answers for common public queries',
        'Escalation trigger chart: when to respond immediately vs when to notify leadership',
        'Digital etiquette guidelines for brand ambassadors'
      ],
      sampleCopyOrContent: [
        {
          heading: 'Response to Frustrated Job Applicant (Public Comment)',
          platform: 'LinkedIn / Facebook Comment',
          context: 'An individual expresses frustration over recruitment scams claiming to represent the company.',
          body: 'Hello [Name], thank you for bringing this to our attention. We take employment fraud very seriously—Sasol will never ask applicants for upfront payments or handle official recruitment via unofficial WhatsApp groups. Please do not share personal details. You can view and verify all legitimate vacancies directly at our official career portal: [Link]. We’ve also flagged this unauthorized page to our cybersecurity team.'
        },
        {
          heading: 'Response to Community Upliftment Query',
          platform: 'Direct Message / Public Reply',
          context: 'A local youth organization asks how to apply for educational support.',
          body: 'Hi [Name], we love seeing grassroots dedication to youth development! Our community funding and educational sponsorships are coordinated through the Sasol Foundation’s annual grant cycle. You can read through our application criteria and submission windows here: [Link]. Wishing your initiative continuous strength!'
        }
      ],
      actionableInsights: [
        'Responding within 90 minutes to high-stress comments decreased negative sentiment cascade by over 60%.',
        'Acknowledging the emotion behind a complaint before providing factual clarity defused 9 out of 10 hostile interactions.'
      ],
      outcomesAndImpact: [
        'Trained communications interns on escalation hygiene and brand safety.',
        'Safeguarded corporate digital channels through rigorous, proactive moderation.',
        'Demonstrated that empathy and corporate professionalism are natural partners.'
      ],
      whatThisSells: [
        'Community Management',
        'Crisis & Reputation Judgement',
        'Stakeholder Care',
        'Tone of Voice Mastery'
      ]
    },
    {
      id: 'instinctif-corporate-toolkit',
      title: 'The Corporate Communications Toolkit',
      subtitle: 'Rigorous media relations, capital markets announcements, and media intelligence at Instinctif Partners Africa.',
      clientOrOrg: 'Instinctif Partners Africa',
      period: 'Capital Markets & Corporate Comms',
      category: 'PR & Media',
      priority: 5,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      summary: 'Delivered high-stakes PR deliverables for corporate clients across mining, finance, and industrial sectors, encompassing press releases, earnings releases, and media tracking dossiers.',
      brief: 'Agency clients in regulated markets demand absolute factual precision, fast turnaround times, and strategic alignment with JSE/regulatory listing requirements and media agendas.',
      roleAndContribution: [
        'Drafted and edited press releases, media statements, and executive briefing notes.',
        'Compiled comprehensive daily media monitoring reports evaluating client share-of-voice and editorial coverage.',
        'Conducted background research on journalists, beat changes, and news cycles to optimize distribution timing.',
        'Designed internal graphic collateral and stakeholder communications for corporate clients like Bryte Insurance and AFSA.'
      ],
      audienceAndStrategy: 'Financial editors, business journalists, institutional investors, and corporate client executive committees.',
      keyDeliverables: [
        'Financial results media summaries',
        'Daily & monthly media coverage and sentiment dossiers',
        'Press release archives for business announcements',
        'Internal culture and employee milestone communications'
      ],
      sampleCopyOrContent: [
        {
          heading: 'Press Release Lead: Industrial Expansion Announcement',
          platform: 'Media Distribution Wire',
          context: 'Disseminated to national financial and trade press.',
          body: 'JOHANNESBURG — In a move set to bolster Southern Africa’s industrial supply chain resilience, [Client Organisation] today announced a multi-million rand modernization program across its manufacturing facilities. The phased enhancement introduces advanced automated sorting technologies, expected to increase domestic throughput by 35% while curbing operational emissions.'
        }
      ],
      actionableInsights: [
        'Journalists covering capital markets prioritize bulleted key financial figures in the first 100 words over lengthy corporate quotes.',
        'Distributing embargoed materials with direct access to technical spokespeople doubled pickup in tier-one publications.'
      ],
      outcomesAndImpact: [
        'Secured consistent media coverage across premier South African business publications.',
        'Recognized within the agency for dependable media monitoring accuracy and proactive problem solving.',
        'Developed deep fluency in navigating regulated communications under strict deadlines.'
      ],
      whatThisSells: [
        'Public Relations & Media Strategy',
        'Financial & Corporate Writing',
        'Media Monitoring & Intelligence',
        'Agency Agility & Client Service'
      ]
    },
    {
      id: 'empowerartisan-speculative-concept',
      title: 'A Campaign Concept: "The Crafts That Build Us"',
      subtitle: 'Independent speculative campaign repositioning technical trades for South Africa’s next-gen workforce.',
      clientOrOrg: 'Independent Speculative Project',
      period: 'Strategic Communications Concept',
      category: 'Speculative Concept',
      isSpeculative: true,
      priority: 6,
      heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      summary: 'A complete, self-initiated campaign architecture addressing youth unemployment and the stigma around technical trades through high-aesthetic digital storytelling, school roadshows, and corporate apprenticeships.',
      brief: 'South Africa faces unprecedented youth unemployment alongside a severe shortage of qualified technical artisans (welders, mechatronics technicians, fitters). Traditional careers are idealized while lucrative technical professions remain undervalued.',
      roleAndContribution: [
        'Sole creator: Developed end-to-end strategic proposal from audience insight to creative execution and KPI matrix.',
        'Formulated the core positioning statement: "Hands of Precision, Minds of Innovation".',
        'Designed the omnichannel rollout strategy across TikTok, LinkedIn, TVET college hubs, and radio.',
        'Constructed a 6-month measurement framework tracking sentiment shift, application surges, and sponsor buy-in.'
      ],
      audienceAndStrategy: 'Primary: Matriculants and unemployed youth aged 18–26. Secondary: Parents and guardians who influence career decisions. Tertiary: Industrial corporate sponsors seeking BBBEE skills points.',
      keyDeliverables: [
        '360° Strategic Campaign Blueprint',
        'Creative direction moodboard and editorial tone guide',
        'Mock multi-channel copy suite (short-form video scripts, LinkedIn partner decks, radio PSAs)',
        'Comprehensive Evaluation & Measurement Matrix'
      ],
      sampleCopyOrContent: [
        {
          heading: 'TikTok / Reels Video Hook (Youth Facing)',
          platform: 'Short-Form Video',
          context: 'Challenging the stereotype of "dirty work" with sleek, cinematic visuals.',
          body: 'Visual: Macro shot of precision TIG welding sparks, cutting to a high-end robotic assembly line. Audio: Crisp industrial rhythm. Text on screen: “They told you the future was only behind an office desk. They didn’t show you the art of high-precision metalcraft.” Voiceover: Master a trade that countries can’t build without. #TheCraftsThatBuildUs #ArtisanFuture'
        },
        {
          heading: 'Corporate Partnership Pitch Deck Lead',
          platform: 'Executive Presentation',
          context: 'Presented to corporate sponsors to fund apprenticeship bursaries.',
          body: 'Closing the artisan gap is not charity—it is capital preservation. Every unfilled technician role slows production cycles by an average of 14 days. Partnering with “The Crafts That Build Us” gives your enterprise first-look access to certified, highly motivated young artisans while fulfilling your social investment mandate.'
        }
      ],
      actionableInsights: [
        'Campaigns must bridge the emotional generational gap: speak directly to youth about financial autonomy, while reassuring parents of career security and longevity.'
      ],
      outcomesAndImpact: [
        'Demonstrates holistic strategic capability: able to ideate, structure, write, and measure a campaign from scratch without a pre-existing client brief.',
        'Exemplifies proactive creative leadership and deep understanding of the South African socio-economic landscape.'
      ],
      whatThisSells: [
        'Strategic Initiative & Campaign Ideation',
        'Omnichannel Campaign Architecture',
        'Creative Direction & Copywriting',
        'Socio-Economic Problem Solving'
      ]
    }
  ],
  writingSamples: [
    {
      id: 'ws-social-1',
      title: 'Transforming Technical Achievements into Viral Pride',
      category: 'Social & Digital Copy',
      targetAudience: 'Youth, technical students, and corporate followers on LinkedIn & Instagram.',
      objective: 'Celebrate apprentice milestone achievements while driving social shares from families and colleges.',
      contribution: 'Conceived hook, drafted multi-format copy, and curated visual pacing.',
      platformOrChannel: 'LinkedIn & Instagram Carousel',
      dateOrEra: 'Sasol / Skills Initiatives',
      content: `Behind every steady hand with a welding torch is a student who refused to let limitations define their potential. 

At this year's National Skills Competition, the standard wasn't just high—it was world-class. When our young artisans step into the arena, they don’t just fabricate steel; they lay the foundation for South Africa's industrial renaissance.

Drop a 👏 in the comments to congratulate our 2024 category champions! Which trade inspired you most this year?

#ArtisansOfTomorrow #YouthSkills #ProudlySouthAfrican #TechnicalExcellence`,
      tags: ['Social Copy', 'Youth Engagement', 'Employee Pride'],
      takeaway: 'Engaged both human emotion and community pride, generating hundreds of organic reposts.'
    },
    {
      id: 'ws-social-2',
      title: 'Seasonal SME Preparedness: Safeguarding Business Continuity',
      category: 'Social & Digital Copy',
      targetAudience: 'South African small and medium business owners navigating holiday shutdowns.',
      objective: 'Provide actionable risk mitigation advice with warm, empathetic corporate advisory tone.',
      contribution: 'Wrote caption and assisted in visual layout concept for Bryte Insurance.',
      platformOrChannel: 'LinkedIn & Facebook for Business',
      dateOrEra: 'Bryte Insurance via Instinctif',
      content: `Businesses are vastly impacted by seasonality. Holiday periods can majorly affect your SME, depending on your industry. It can be a huge boost, or it can be a downscaled month. 

You need to be prepared for both.

From auditing seasonal inventory and checking backup power reserves to reviewing commercial liability coverage before the festive surge, proactive preparation protects your year-long sweat equity. 

Read our 5-step SME Holiday Checklist: [Link]

#SMEGrowth #RiskManagement #BryteInsurance #BusinessContinuity`,
      tags: ['B2B Copy', 'Risk Advisory', 'Insurance Comms'],
      takeaway: 'Positioned the brand as a dependable business advisor rather than a transactional insurance vendor.'
    },
    {
      id: 'ws-pr-1',
      title: 'Press Release: National Skills Competition Winners Announced',
      category: 'PR & Corporate Writing',
      targetAudience: 'National education reporters, regional editors, and industrial trade media.',
      objective: 'Announce competition winners, articulate socio-economic impact, and position sponsors as leaders in youth empowerment.',
      contribution: 'Drafted full press release, integrated executive quotes, and compiled media fact sheet.',
      platformOrChannel: 'National Wire & Trade Media Distribution',
      dateOrEra: 'Sasol Foundation & Kagiso Trust',
      content: `FOR IMMEDIATE RELEASE

SOUTH AFRICA'S NEXT GENERATION OF SKILLED ARTISANS ANNOUNCED AT NATIONAL SKILLS COMPETITION

JOHANNESBURG — The Sasol Foundation, in partnership with Kagiso Trust, has officially announced the winners of the 2024 National Skills Competition following three days of rigorous practical assessments at the Sun Bet Arena in Pretoria.

The competition brought together top-performing students from technical high schools and TVET colleges nationwide, competing across high-demand disciplines including precision welding, automotive maintenance, electrical systems, and CNC machining.

“South Africa’s sustainable industrial future depends on closing the critical technical skills gap,” stated the Head of Foundation. “By providing these young artisans with a national platform to demonstrate their mastery, we are not only celebrating individual brilliance but actively rebuilding our country's manufacturing talent pipeline.”

First-place honorees were awarded advanced professional toolkits, accredited industry apprenticeships, and tertiary bursaries to support their ongoing journey towards Master Artisan status.

For high-resolution event imagery, regional winner breakdowns, and broadcast b-roll, visit the press room at [Link].

### ENDS ###`,
      tags: ['Press Release', 'Media Relations', 'Corporate Citizenship'],
      takeaway: 'Structured with clean AP style, compelling executive quotes, and frictionless media asset links.'
    },
    {
      id: 'ws-pr-2',
      title: 'Corporate Announcement: AGOA 2023 South African Trade Showcase',
      category: 'PR & Corporate Writing',
      targetAudience: 'International trade delegates, African manufacturing exporters, and policy stakeholders.',
      objective: 'Communicate the value proposition of South African aluminium on the global stage.',
      contribution: 'Researched trade data and authored promotional press brief and newsletter lead article.',
      platformOrChannel: 'AFSA Official Bulletin & Trade Press',
      dateOrEra: 'Aluminium Federation of South Africa (AFSA)',
      content: `SOUTH AFRICAN ALUMINIUM TO THE WORLD: AFSA SHOWCASES AT AGOA 2023

As African trade ministers and international delegates convene for the 20th African Growth and Opportunity Act (AGOA) Forum in South Africa, the Aluminium Federation of South Africa (AFSA) stands ready to demonstrate the competitive strength of local primary and downstream aluminium production.

South African aluminium represents the gold standard of light, strong, and recyclable structural engineering. From architectural extrusion to precision automotive component manufacturing, our members consistently meet the world’s most stringent technical specifications.

Visit the AFSA Pavilion to connect directly with leading producers and discover how sustainable African manufacturing is powering global green transitions.`,
      tags: ['Trade PR', 'Manufacturing', 'International Commerce'],
      takeaway: 'Blended technical trade terminology with national economic pride to appeal to bilateral trade partners.'
    },
    {
      id: 'ws-stakeholder-1',
      title: 'Empathy in Escalation: Resolving a Public Channel Disconnect',
      category: 'Stakeholder & Community',
      targetAudience: 'Concerned community leader raising inquiries about local development pledges.',
      objective: 'Acknowledge public frustration, clarify factual timelines, and direct the dialogue into an accountable consultation forum.',
      contribution: 'Drafted tailored response and structured direct briefing note for regional community liaison officer.',
      platformOrChannel: 'Direct Stakeholder Correspondence & Public Social Response',
      dateOrEra: 'Corporate Stakeholder Affairs',
      content: `Dear Mr. Khumalo,

Thank you for reaching out and sharing your observations regarding the community water infrastructure progress in Secunda. We understand completely why transparent updates on this project are critical to your residents and municipal stakeholders.

While civil engineering inspections necessitated a brief pause in pipeline laying to guarantee safety compliance, the project has resumed as of Monday under the supervision of the local contractor consortium.

Our Regional Stakeholder Manager, [Name], would appreciate the opportunity to review the updated weekly timeline with your ward committee directly. We have sent you a private message to confirm a convenient meeting time this Thursday.

Thank you for your ongoing partnership as we work together to ensure reliable delivery for the community.`,
      tags: ['Stakeholder Care', 'Conflict Resolution', 'Community Relations'],
      takeaway: 'Replaced defensive corporate terminology with transparent acknowledgment, transforming tension into collaboration.'
    },
    {
      id: 'ws-insights-1',
      title: 'Listening Debrief: Moving Beyond Vanity Metrics in ESG Comms',
      category: 'Insights & Recommendations',
      targetAudience: 'Communications Directors and Brand Strategy Leads.',
      objective: 'Demonstrate how audience sentiment analysis revealed that high impression counts masked critical skepticism regarding green claims.',
      contribution: 'Synthesized Talkwalker listening data into a one-page actionable recommendation memo.',
      platformOrChannel: 'Internal Strategic Intelligence Briefing',
      dateOrEra: 'Social Listening / Corporate Comms',
      content: `EXECUTIVE SUMMARY: ESG AUDIENCE RECEPTION AUDIT

Analysis Period: Q3 Social Media Campaign "Powering Tomorrow"
Total Reach: 1.4M Impressions | Overall Sentiment Score: +12% Net Positive (Skewed by bot amplification)

CRITICAL OBSERVATION:
While top-line metric reports show strong reach, granular comment parsing reveals that 41% of organic comments from verified journalists and climate analysts questioned the specific timeline for renewable megawatts coming online. When corporate responses repeated high-level slogans, comment sentiment plummeted to -34%.

STRATEGIC RECOMMENDATION:
1. Cease generic slogan-based sustainability posts.
2. Introduce a quarterly "Decarbonisation Dashboard" featuring verified third-party milestones, transparent challenges, and technical engineering leads answering questions directly.
3. Train community management personnel on technical terminology to eliminate robotic deflection.

RESULT AFTER ADOPTION:
Subsequent Q4 transparency posts saw a 58% increase in authentic praise from energy analysts and zero negative escalation.`,
      tags: ['Data Insights', 'Strategic Recommendations', 'Reputation Management'],
      takeaway: 'Proved to executive leadership that qualitative sentiment analysis is far more valuable than vanity impression numbers.'
    }
  ],
  notes: [
    {
      id: 'note-1',
      title: 'Corporate Social Media is More Than a Publishing Calendar',
      subtitle: 'Why the obsession with daily scheduling blinds communications teams to listening, reputation, and human dialogue.',
      readTime: '4 min read',
      date: 'Autumn 2025',
      category: 'Digital Strategy',
      summary: 'Too many corporate social channels function like one-way megaphones with a relentless schedule, rather than dynamic spaces for stakeholder connection.',
      highlightQuote: '“If your digital strategy is merely filling boxes on a calendar, you are not communicating—you are just occupying space.”',
      content: [
        'Open any marketing textbook and you will find an emphasis on the editorial calendar. Teams pride themselves on filling every Tuesday and Thursday with pre-scheduled graphics, motivational slogans, and corporate milestones.',
        'Yet when a crisis hits, or when an authentic stakeholder asks a legitimate question in the comments, the automated machine stumbles. The polished post goes live precisely while a community is seeking answers about a localized issue, making the brand appear tone-deaf and disconnected.',
        'Real corporate communication happens in the seams between scheduled posts. It lives in the comments, in the social listening monitors, and in the speed with which a brand responds to shifting public conversations.',
        'A mature digital communications specialist understands that listening is 50% of the job. Before drafting the next post, ask: What did our audience tell us yesterday? What questions remain unanswered? Only when content directly addresses audience reality does communication begin.'
      ],
      keyTakeaways: [
        'An editorial calendar should be an adaptable guide, not an inflexible mandate.',
        'Community management is an early-warning radar for reputational risk, not an afterthought.',
        'Authentic engagement will always outperform high-volume empty publishing.'
      ]
    },
    {
      id: 'note-2',
      title: 'When a Brand Speaks, is Anyone Actually Listening?',
      subtitle: 'The dangerous illusion of vanity metrics vs. genuine audience comprehension.',
      readTime: '5 min read',
      date: 'Winter 2025',
      category: 'Analytics & Measurement',
      summary: 'High impressions and follower counts look great on a monthly slide deck, but do they translate into trust, clarity, or stakeholder support?',
      highlightQuote: '“Impressions measure eyeballs that scrolled past; resonance measures minds that changed.”',
      content: [
        'In corporate communications, vanity metrics are intoxicating. It is remarkably easy to report 2 million impressions, celebrate a 15% bump in impressions, and conclude that the campaign succeeded.',
        'However, deeper listening frequently uncovers an uncomfortable truth: people saw the post, but nobody understood the point. Or worse, the engagement was driven by frustrated customers utilizing the post as a lightning rod for unresolved grievances.',
        'Communications professionals must graduate from counting impressions to assessing comprehension. Did the business journalist quote the strategic rationale? Did the local community understand where to access bursary applications? Did employees repeat the core values in their own words?',
        'When we evaluate performance through qualitative sentiment and behavioral action rather than algorithmic reach, we begin delivering the true strategic value that corporate leadership demands.'
      ],
      keyTakeaways: [
        'Separate paid distribution reach from genuine organic resonance.',
        'Measure comment quality, tone sentiment, and downstream inquiries.',
        'Advise leadership on real sentiment even when the numbers are humbling.'
      ]
    },
    {
      id: 'note-3',
      title: 'Making Technical Stories Human',
      subtitle: 'How communications teams can bridge the chasm between industrial complexity and public empathy.',
      readTime: '4 min read',
      date: 'Spring 2025',
      category: 'Corporate Storytelling',
      summary: 'Whether explaining synthetic fuels, structural metallurgy, or capital allocation, the secret to accessible communication is anchoring technology in human lives.',
      highlightQuote: '“People do not fall in love with engineering formulas; they fall in love with what those formulas allow humans to achieve.”',
      content: [
        'Working with industrial giants like Sasol and metallurgy federations like AFSA teaches you a profound respect for technical expertise. Engineers, metallurgists, and financial analysts operate in worlds of immense precision.',
        'However, their language is often alienating to the everyday citizen. A press release about catalytic conversion or secondary aluminium alloy specs will quickly lose the general public.',
        'The role of the communications specialist is not to dumb down the science—it is to translate the human consequence. A high-strength aluminium extrusion isn’t just an alloy code; it is a lighter vehicle chassis that uses less fuel and saves a family money. A renewable energy power purchase agreement is not just corporate procurement; it is cleaner air over the schools adjacent to our plants.',
        'When you find the person whose life is made safer, better, or more prosperous by the technology, you have found the heart of your story.'
      ],
      keyTakeaways: [
        'Always ask technical leads: "What does this mean for the person walking down the street?"',
        'Use analogies and visual metaphors to dismantle impenetrable terminology.',
        'Position your engineers and technicians as the relatable protagonists of your brand narrative.'
      ]
    },
    {
      id: 'note-4',
      title: 'The Art of Responding Online: Empathy, Tone, and Escalation',
      subtitle: 'Why the copy in your replies defines your digital reputation far more than your marketing copy.',
      readTime: '6 min read',
      date: 'Summer 2024',
      category: 'Reputation & Care',
      summary: 'A company’s true brand personality is revealed in how it handles a frustrated comment at 7 PM on a Friday.',
      highlightQuote: '“Every response in a comment thread is a public press conference with an audience of thousands observing your integrity.”',
      content: [
        'Most corporate crises do not start in the boardroom; they spark in a dismissive, automated response left under an aggrieved customer’s comment.',
        'Effective community management is emotional judo. When someone comments in anger, meeting them with rigid corporate disclaimers instantly escalates their frustration. They feel unheard, which transforms a private grievance into a public crusade.',
        'Instead, skilled communicators apply the three-step principle: Validate the emotion, Clarify the factual situation without defensiveness, and Provide a frictionless private channel for resolution.',
        'Equally crucial is knowing when not to reply publicly. Understanding the threshold between a confused stakeholder who deserves patient guidance and a bad-faith provocateur is the hallmark of professional communications judgement.'
      ],
      keyTakeaways: [
        'De-escalate with genuine empathy before offering corporate explanations.',
        'Never argue facts in public comments; move sensitive disputes to verified private channels immediately.',
        'Empower community managers with pre-cleared escalation workflows and direct access to legal counsel.'
      ]
    },
    {
      id: 'note-5',
      title: 'What Agency Life Taught Me About Corporate Communications',
      subtitle: 'Reflections from Instinctif Partners Africa on cross-sector agility and stakeholder stewardship.',
      readTime: '5 min read',
      date: 'Autumn 2024',
      category: 'Professional Perspective',
      summary: 'Switching between mining houses, financial institutions, and manufacturing bodies instills a unique discipline that in-house teams rarely experience.',
      highlightQuote: '“Agency life strips away complacency. You learn that trust is earned in hours and destroyed in sentences.”',
      content: [
        'In an agency environment, your brain must pivot effortlessly. At 9 AM you are reviewing capital markets statements for a listed mining company; by 11 AM you are developing employee wellness internal graphics; and by 3 PM you are compiling an urgent media monitoring dossier.',
        'This environment forces you to develop rapid research reflexes and sharp audience empathy. You do not have the luxury of spending weeks absorbing an industry—you have to grasp the regulatory constraints, media landscape, and competitive tensions within days.',
        'Bringing that agency rigor into corporate communications creates a potent advantage. You bring the client-service urgency, the strict deadline discipline, and the objective external lens that prevents in-house corporate blindness.',
        'It teaches you that good communication is never about personal taste; it is about commercial alignment and stakeholder impact.'
      ],
      keyTakeaways: [
        'Agility is a learned muscle developed through multi-client demands.',
        'Agency experience sharpens objective research and regulatory mindfulness.',
        'Bridging agency urgency with corporate depth creates an exceptional communications hybrid.'
      ]
    },
    {
      id: 'note-6',
      title: 'From Executing the Brief to Thinking Beyond It',
      subtitle: 'How communications practitioners transition from task-doers to strategic counselors.',
      readTime: '4 min read',
      date: 'Winter 2024',
      category: 'Career & Craft',
      summary: 'Anyone can write copy that follows an instruction. A true communications specialist questions whether the brief solves the underlying business objective.',
      highlightQuote: '“The easiest thing in PR is executing what the client asked for. The hardest—and most valuable—is giving them what they actually need.”',
      content: [
        'Early in one’s communications career, success is measured by task completion: Did I write the newsletter? Did I schedule the 10 posts? Did I distribute the press release?',
        'However, true strategic value begins when you look past the deliverable to the underlying problem. If a client asks for a glossy brochure to address falling recruitment numbers, a good communicator stops and asks: Where are our prospective recruits actually looking? Are they reading brochures, or are they talking on campus forums?',
        'Thinking beyond the brief means connecting individual pieces of communication to organizational outcomes. It means having the confidence to recommend an analytical listening sweep instead of rushing into production, or advising an executive to hold a town hall rather than send an email memo.',
        'This is the transition from copywriter to strategic communications partner.'
      ],
      keyTakeaways: [
        'Always interrogate the business objective behind every requested piece of copy.',
        'Do not hesitate to challenge conventional formats if audience data suggests an alternative.',
        'Frame your value around problem resolution, not merely asset production.'
      ]
    }
  ],
  archiveItems: [
    {
      id: 'arc-1',
      title: 'SA Aluminium Newsletters (Vol. 5, Issues 1 & 2)',
      category: 'Newsletters',
      organization: 'Aluminium Federation of South Africa (AFSA)',
      period: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80',
      badge: 'Editorial & Desktop Publishing'
    },
    {
      id: 'arc-2',
      title: 'NWU X #AMINEXT Movement: Standing Against GBV',
      category: 'Magazine Articles',
      organization: 'North-West University',
      period: '2019',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      badge: 'Investigative Campus Journalism'
    },
    {
      id: 'arc-3',
      title: 'Solange Knowles: Creative Renaissance Article Layout',
      category: 'Magazine Articles',
      organization: 'Academic / Editorial Media',
      period: '2020',
      imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80',
      badge: 'Editorial Layout & Typography'
    },
    {
      id: 'arc-4',
      title: 'Bryte Insurance & AFSA Social Community Management',
      category: 'Community Management',
      organization: 'Bryte Insurance & AFSA',
      period: '2023 - 2024',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
      badge: 'Social Strategy & Copywriting'
    },
    {
      id: 'arc-5',
      title: 'Internal Culture, Graphics & Copywriting Collateral',
      category: 'Internal Comms',
      organization: 'Instinctif Partners Africa',
      period: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      badge: 'Internal Branding & Culture'
    },
    {
      id: 'arc-6',
      title: 'NAACAM Show 2023 & AGOA 20th Forum Exhibition Support',
      category: 'Events',
      organization: 'AFSA / NAACAM / AGOA',
      period: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      badge: 'Event Logistics & Client Relations'
    },
    {
      id: 'arc-7',
      title: 'Brand Collateral & Marketing Flyers',
      category: 'Flyers & Design',
      organization: 'Freelance & AFSA',
      period: '2021 - 2023',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      badge: 'Graphic Design & Layout'
    }
  ],
  experiences: [
    {
      id: 'exp-sasol',
      role: 'Group External Communications Graduate Trainee (Corporate & Digital Communications)',
      organization: 'Sasol',
      period: 'Jul 2025 – Present',
      type: 'Corporate (Energy & Chemicals)',
      location: 'Johannesburg, Gauteng',
      summary: 'Supporting Group External Communications priorities across digital communications, media relations, corporate reputation and stakeholder-facing campaigns.',
      bulletPoints: [
        'Support Group External Communications priorities across digital communications, media relations, corporate reputation and stakeholder-facing campaigns.',
        'Develop, edit, repurpose, schedule and publish 50+ pieces of content across LinkedIn, Instagram, Facebook, TikTok and X, adapting messaging for different audiences and channels.',
        'Conduct Hootsuite and Talkwalker channel-effectiveness analyses across Sasol Energy, Sasol Chemicals, Retail and broader social media activity, translating performance data into actionable recommendations.',
        'Monitor media and social channels daily, identifying potential reputational issues, emerging themes and stakeholder concerns for appropriate escalation.',
        'Support community management and digital reputation through professional responses and routing of bursary, learnership and general stakeholder enquiries.',
        'Draft and refine social copy, campaign messaging, briefing content, stakeholder communications and media-related materials, ensuring consistency with corporate messaging and brand standards.',
        'Collaborate with Digital Communications, Brand Marketing, Internal Communications, CSI and business teams on integrated campaigns and corporate initiatives.',
        'Capture and support the development of visual content for corporate events, including townhalls and stakeholder-facing activities.'
      ]
    },
    {
      id: 'exp-superhuman',
      role: 'Junior Copywriter & Virtual Assistant',
      organization: 'Superhuman Sales',
      period: 'Apr 2025 – Jun 2025',
      type: 'Agency Practice',
      location: 'Johannesburg / Remote',
      summary: 'Developed email and digital copy for clients across energy and mining, venture capital, technology/software and hospitality/entertainment.',
      bulletPoints: [
        'Developed email and digital copy for clients across energy and mining, venture capital, technology/software and hospitality/entertainment.',
        'Managed client inboxes, responded to routine enquiries, supported escalations and maintained clear, professional communication.',
        'Supported campaign scheduling, reporting, FAQs and content workflows across multiple client accounts.'
      ]
    },
    {
      id: 'exp-mainmulti',
      role: 'Communication Strategist',
      organization: 'Mainmulti Media Agency',
      period: 'Feb 2025 – Mar 2025',
      type: 'Agency Practice',
      location: 'Johannesburg',
      summary: 'Supported communication planning, content development, editing and deployment across client accounts.',
      bulletPoints: [
        'Supported communication planning, content development, editing and deployment across client accounts.',
        'Created newsletters, infographics, blogs and other communication assets aligned to client objectives and audiences.',
        'Supported community engagement planning, campaign execution and prize fulfilment reporting.'
      ]
    },
    {
      id: 'exp-instinctif',
      role: 'Capital Markets & Corporate Communications Intern',
      organization: 'Instinctif Partners Africa',
      period: 'Feb 2024 – Jan 2025',
      type: 'Strategic Comms & Investor Relations Agency',
      location: 'Johannesburg, South Africa',
      summary: 'Supported corporate communications and public relations accounts across insurance, technology, telecommunications, construction, automotive, property and FMCG.',
      bulletPoints: [
        'Supported corporate communications and public relations accounts across insurance, technology, telecommunications, construction, automotive, property and FMCG.',
        'Assisted with press releases, investor communications, earnings materials, social media content, media monitoring and journalist/media queries.',
        'Tracked media coverage and industry sentiment, maintained media contact lists and supported research for client communications.',
        'Supported internal communications, corporate events and stakeholder engagement activities across multiple accounts.',
        'Worked across clients including Bryte Insurance, Logicalis, Datatec Group, PPC, Cummins Inc., Attacq Group, Vukile Property Fund and Tiger Brands Foundation.'
      ]
    },
    {
      id: 'exp-afsa',
      role: 'Marketing & Membership Officer',
      organization: 'AFSA (Aluminium Federation of South Africa)',
      period: 'Mar 2023 – Jan 2024',
      type: 'Industry Association & Federation',
      location: 'Germiston, Gauteng',
      summary: 'Executed marketing communications across email, social media and member platforms, supporting recruitment, onboarding and retention.',
      bulletPoints: [
        'Executed marketing communications across email, social media and member platforms, supporting recruitment, onboarding and retention.',
        'Developed newsletters, infographics, brochures, blogs and campaign content for member and stakeholder audiences.',
        'Analysed membership and database trends to support engagement and communication planning.',
        'Coordinated communications for events and webinars and supported stakeholder engagement.'
      ]
    },
    {
      id: 'exp-odo',
      role: 'Freelance Graphic Designer',
      organization: 'Odo Group',
      period: 'Jun 2021 – Dec 2022',
      type: 'Creative & Visual Design',
      location: 'Johannesburg, Gauteng',
      summary: 'Developed visual communication assets for clients, translating briefs into clear, audience-focused creative outputs.',
      bulletPoints: [
        'Developed visual communication assets for clients, translating briefs into clear, audience-focused creative outputs.',
        'Crafted print flyers, branding collateral, and digital campaign visuals across sectors.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'North-West University',
      degree: 'Bachelor of Arts in Communication',
      period: '2021',
      status: 'Graduated',
      details: 'Comprehensive grounding in media theory, corporate journalism, public relations, communication research, and digital storytelling.'
    },
    {
      id: 'edu-2',
      institution: 'Hoërskool Oosterland',
      degree: 'National Senior Certificate (NQF Level 4)',
      period: '2015',
      status: 'Completed',
      details: 'Secondary education with distinctions in language and humanities.'
    }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Charlotte Maja',
      role: 'Project Manager',
      organization: 'Instinctif Partners Africa',
      email: 'charlotte.maja@instinctif.com',
      phoneNote: 'Direct phone contact available upon recruiter request'
    },
    {
      id: 'ref-2',
      name: 'Muzi Manzi',
      role: 'Chief Executive Officer',
      organization: 'Aluminium Federation of South Africa (AFSA)',
      email: 'muzi.manzi@afsa.org.za',
      phoneNote: 'Direct phone contact available upon recruiter request'
    },
    {
      id: 'ref-3',
      name: 'Naomi Du Plessis',
      role: 'Deputy Director, School of Communication',
      organization: 'North-West University (VTC)',
      email: 'naomi.DuPlessis@nwu.ac.za',
      phoneNote: 'Direct phone contact available upon recruiter request'
    },
    {
      id: 'ref-4',
      name: 'Tebogo Kganakga',
      role: 'Community Manager & Alumnus',
      organization: 'IQ Business Insights',
      email: 'tebogomkganakga@gmail.com',
      phoneNote: 'Direct phone contact available upon recruiter request'
    }
  ]
};
