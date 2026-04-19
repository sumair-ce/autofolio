import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || /^https?:\/\/.+/i.test(value),
    "Use a valid URL starting with http:// or https://"
  );

const optionalEmail = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || z.email().safeParse(value).success,
    "Use a valid email address"
  );

export const portfolioSchema = z.object({
  template_id: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  title: z.string().trim(),
  bio: z.string().trim(),
  email: optionalEmail,
  phone: z.string().trim(),
  location: z.string().trim(),
  avatar_url: optionalUrl,
  resume_url: optionalUrl,
  skills: z.array(
    z.object({
      name: z.string().trim().min(1, "Skill name is required"),
      level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
      category: z.string().trim(),
    })
  ),
  services: z.array(
    z.object({
      title: z.string().trim().min(1, "Service title is required"),
      description: z.string().trim(),
      price_range: z.string().trim(),
    })
  ),
  social_links: z.array(
    z.object({
      platform: z.string().trim().min(1, "Platform is required"),
      url: optionalUrl.refine((value) => value.length > 0, "Link URL is required"),
    })
  ),
  projects: z.array(
    z.object({
      title: z.string().trim().min(1, "Project title is required"),
      description: z.string().trim(),
      tech_stack: z.array(z.string().trim().min(1)),
      live_url: optionalUrl,
      repo_url: optionalUrl,
      images: z.array(
        z.object({
          url: optionalUrl.refine(
            (value) => value.length > 0,
            "Project image URL is required"
          ),
          is_thumbnail: z.boolean(),
        })
      ),
    })
  ),
});

export type PortfolioFormValues = z.infer<typeof portfolioSchema>;
