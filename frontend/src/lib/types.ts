export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type SkillInput = {
  name: string;
  level: SkillLevel;
  category: string;
};

export type ServiceInput = {
  title: string;
  description: string;
  price_range: string;
};

export type SocialLinkInput = {
  platform: string;
  url: string;
};

export type ProjectImageInput = {
  url: string;
  is_thumbnail: boolean;
};

export type ProjectInput = {
  title: string;
  description: string;
  tech_stack: string[];
  live_url: string;
  repo_url: string;
  images: ProjectImageInput[];
};

export type PortfolioPayload = {
  template_id: 1 | 2 | 3;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  resume_url: string;
  skills: SkillInput[];
  services: ServiceInput[];
  social_links: SocialLinkInput[];
  projects: ProjectInput[];
};

export type PortfolioRecord = PortfolioPayload & {
  id: string;
  code: string;
  views: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PortfolioResponse = {
  success: true;
  data: PortfolioRecord;
};

export type CreatePortfolioResponse = {
  success: true;
  code: string;
  url: string;
};

export type UploadResponse = {
  success: true;
  url: string;
  public_id: string;
};

export type ApiError = {
  success: false;
  error: string;
};
