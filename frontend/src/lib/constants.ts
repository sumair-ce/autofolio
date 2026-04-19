import { PortfolioPayload, SkillLevel } from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://instant-share-portfolio.onrender.com";

export const WIZARD_STEPS = [
  "Basics",
  "Media",
  "Skills",
  "Services",
  "Social Links",
  "Projects",
  "Template",
  "Review & Publish",
] as const;

export const SOCIAL_PLATFORMS = [
  "github",
  "linkedin",
  "twitter",
  "behance",
  "dribbble",
  "instagram",
  "website",
] as const;

export const SKILL_LEVELS: SkillLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
];

export const TEMPLATE_OPTIONS = [
  {
    id: 1 as const,
    name: "Template 1",
    label: "Editorial Calm",
    description:
      "A warm, minimal portfolio with serif headlines and generous spacing.",
  },
  {
    id: 2 as const,
    name: "Template 2",
    label: "Creative Pulse",
    description:
      "A bolder layout with layered cards, punchy accents, and gallery energy.",
  },
  {
    id: 3 as const,
    name: "Template 3",
    label: "Professional Grid",
    description:
      "A confident business-forward layout with stats, structure, and clear hierarchy.",
  },
];

export const defaultPortfolioValues: PortfolioPayload = {
  template_id: 1,
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  avatar_url: "",
  resume_url: "",
  skills: [
    {
      name: "",
      level: "advanced",
      category: "",
    },
  ],
  services: [
    {
      title: "",
      description: "",
      price_range: "",
    },
  ],
  social_links: [
    {
      platform: "github",
      url: "",
    },
  ],
  projects: [
    {
      title: "",
      description: "",
      tech_stack: [],
      live_url: "",
      repo_url: "",
      images: [],
    },
  ],
};
