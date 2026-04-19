"use client";

import Image from "next/image";
import { LoaderCircle, Plus, Trash2, Upload } from "lucide-react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { SKILL_LEVELS, SOCIAL_PLATFORMS, TEMPLATE_OPTIONS } from "@/lib/constants";
import { PortfolioFormValues } from "@/lib/schemas";
import { cn, normalizeTechStack } from "@/lib/utils";
import { Button, FieldError, Input, Label, Textarea } from "@/components/ui";

type UploadState = {
  avatar: boolean;
  resume: boolean;
  projectImagePath: string | null;
};

type CommonProps = {
  form: UseFormReturn<PortfolioFormValues>;
};

type ArrayProps = CommonProps & {
  skills: UseFieldArrayReturn<PortfolioFormValues, "skills", "id">;
  services: UseFieldArrayReturn<PortfolioFormValues, "services", "id">;
  socialLinks: UseFieldArrayReturn<PortfolioFormValues, "social_links", "id">;
  projects: UseFieldArrayReturn<PortfolioFormValues, "projects", "id">;
};

export function BasicsStep({ form }: CommonProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <FieldGroup label="Full name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Aisha Khan" />
      </FieldGroup>
      <FieldGroup label="Professional title" error={errors.title?.message}>
        <Input {...register("title")} placeholder="Full Stack Developer" />
      </FieldGroup>
      <FieldGroup className="md:col-span-2" label="Short bio" error={errors.bio?.message}>
        <Textarea
          {...register("bio")}
          placeholder="I build clean product experiences, thoughtful systems, and fast interfaces that people enjoy using."
        />
      </FieldGroup>
      <FieldGroup label="Email" error={errors.email?.message}>
        <Input {...register("email")} placeholder="you@example.com" />
      </FieldGroup>
      <FieldGroup label="Phone" error={errors.phone?.message}>
        <Input {...register("phone")} placeholder="+92 300 1234567" />
      </FieldGroup>
      <FieldGroup className="md:col-span-2" label="Location" error={errors.location?.message}>
        <Input {...register("location")} placeholder="Karachi, Pakistan" />
      </FieldGroup>
    </div>
  );
}

export function MediaStep({
  form,
  uploadState,
  onUpload,
}: CommonProps & {
  uploadState: UploadState;
  onUpload: (kind: "avatar" | "resume", file: File) => void;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const values = watch();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <UploadCard
        title="Profile image"
        description="Upload a clean portrait or personal brand image. It will be sent straight to Cloudinary through your backend."
        loading={uploadState.avatar}
        value={values.avatar_url}
        actionLabel="Upload image"
        accept="image/png,image/jpeg,image/webp"
        onSelect={(file) => onUpload("avatar", file)}
      />
      <UploadCard
        title="Resume PDF"
        description="Add the resume once so every template can link to it with a clear download action."
        loading={uploadState.resume}
        value={values.resume_url}
        actionLabel="Upload resume"
        accept="application/pdf"
        onSelect={(file) => onUpload("resume", file)}
      />
      <FieldGroup className="lg:col-span-2" label="Avatar URL" error={errors.avatar_url?.message}>
        <Input {...register("avatar_url")} placeholder="https://..." />
      </FieldGroup>
      <FieldGroup className="lg:col-span-2" label="Resume URL" error={errors.resume_url?.message}>
        <Input {...register("resume_url")} placeholder="https://..." />
      </FieldGroup>
    </div>
  );
}

export function SkillsStep({ form, skills }: ArrayProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      {skills.fields.map((field, index) => (
        <RowCard
          key={field.id}
          title={`Skill ${index + 1}`}
          onRemove={skills.fields.length > 1 ? () => skills.remove(index) : undefined}
        >
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.8fr_1fr]">
            <FieldGroup label="Skill name" error={errors.skills?.[index]?.name?.message}>
              <Input {...register(`skills.${index}.name`)} placeholder="React" />
            </FieldGroup>
            <FieldGroup label="Level" error={errors.skills?.[index]?.level?.message}>
              <select
                {...register(`skills.${index}.level`)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-slate-950 dark:border-white/12 dark:bg-slate-950 dark:text-white dark:focus:border-slate-400"
              >
                {SKILL_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </FieldGroup>
            <FieldGroup label="Category" error={errors.skills?.[index]?.category?.message}>
              <Input {...register(`skills.${index}.category`)} placeholder="frontend" />
            </FieldGroup>
          </div>
        </RowCard>
      ))}
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() => skills.append({ name: "", level: "advanced", category: "" })}
      >
        <Plus className="h-4 w-4" />
        Add skill
      </Button>
    </div>
  );
}

export function ServicesStep({ form, services }: ArrayProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      {services.fields.map((field, index) => (
        <RowCard
          key={field.id}
          title={`Service ${index + 1}`}
          onRemove={services.fields.length > 1 ? () => services.remove(index) : undefined}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Service title" error={errors.services?.[index]?.title?.message}>
              <Input {...register(`services.${index}.title`)} placeholder="Web development" />
            </FieldGroup>
            <FieldGroup
              label="Price range"
              error={errors.services?.[index]?.price_range?.message}
            >
              <Input {...register(`services.${index}.price_range`)} placeholder="$500 - $2,000" />
            </FieldGroup>
            <FieldGroup
              className="md:col-span-2"
              label="Description"
              error={errors.services?.[index]?.description?.message}
            >
              <Textarea
                {...register(`services.${index}.description`)}
                placeholder="Explain what the service covers and how clients benefit."
              />
            </FieldGroup>
          </div>
        </RowCard>
      ))}
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() => services.append({ title: "", description: "", price_range: "" })}
      >
        <Plus className="h-4 w-4" />
        Add service
      </Button>
    </div>
  );
}

export function SocialLinksStep({ form, socialLinks }: ArrayProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      {socialLinks.fields.map((field, index) => (
        <RowCard
          key={field.id}
          title={`Link ${index + 1}`}
          onRemove={socialLinks.fields.length > 1 ? () => socialLinks.remove(index) : undefined}
        >
          <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
            <FieldGroup
              label="Platform"
              error={errors.social_links?.[index]?.platform?.message}
            >
              <select
                {...register(`social_links.${index}.platform`)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-slate-950 dark:border-white/12 dark:bg-slate-950 dark:text-white dark:focus:border-slate-400"
              >
                {SOCIAL_PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </FieldGroup>
            <FieldGroup label="URL" error={errors.social_links?.[index]?.url?.message}>
              <Input
                {...register(`social_links.${index}.url`)}
                placeholder="https://github.com/username"
              />
            </FieldGroup>
          </div>
        </RowCard>
      ))}
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() => socialLinks.append({ platform: "website", url: "" })}
      >
        <Plus className="h-4 w-4" />
        Add link
      </Button>
    </div>
  );
}

export function ProjectsStep({
  form,
  projects,
  uploadState,
  onUploadProjectImage,
  onRemoveProjectImage,
  onSetProjectThumbnail,
}: ArrayProps & {
  uploadState: UploadState;
  onUploadProjectImage: (file: File, projectIndex: number) => void;
  onRemoveProjectImage: (projectIndex: number, imageIndex: number) => void;
  onSetProjectThumbnail: (projectIndex: number, imageIndex: number) => void;
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const values = watch();

  return (
    <div className="space-y-5">
      {projects.fields.map((field, index) => (
        <RowCard
          key={field.id}
          title={`Project ${index + 1}`}
          onRemove={projects.fields.length > 1 ? () => projects.remove(index) : undefined}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Project title" error={errors.projects?.[index]?.title?.message}>
              <Input {...register(`projects.${index}.title`)} placeholder="SaaS dashboard" />
            </FieldGroup>
            <FieldGroup
              label="Tech stack"
              error={errors.projects?.[index]?.tech_stack?.message?.toString()}
            >
              <Input
                defaultValue={values.projects[index]?.tech_stack.join(", ")}
                onChange={(event) =>
                  setValue(
                    `projects.${index}.tech_stack`,
                    normalizeTechStack(event.target.value),
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  )
                }
                placeholder="React, Node.js, PostgreSQL"
              />
            </FieldGroup>
            <FieldGroup
              className="md:col-span-2"
              label="Description"
              error={errors.projects?.[index]?.description?.message}
            >
              <Textarea
                {...register(`projects.${index}.description`)}
                placeholder="Describe the problem, the solution, and what made the outcome meaningful."
              />
            </FieldGroup>
            <FieldGroup label="Live URL" error={errors.projects?.[index]?.live_url?.message}>
              <Input {...register(`projects.${index}.live_url`)} placeholder="https://myapp.com" />
            </FieldGroup>
            <FieldGroup label="Repo URL" error={errors.projects?.[index]?.repo_url?.message}>
              <Input
                {...register(`projects.${index}.repo_url`)}
                placeholder="https://github.com/username/project"
              />
            </FieldGroup>
          </div>

          <div className="mt-5 rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-950">Project screenshots</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Upload one or more images and choose a thumbnail for the card preview.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                {uploadState.projectImagePath === `projects.${index}.images` ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload screenshot
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onUploadProjectImage(file, index);
                    }
                    event.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
            <FieldError message={errors.projects?.[index]?.images?.message?.toString()} />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {values.projects[index]?.images.map((image, imageIndex) => (
                <div
                  key={`${image.url}-${imageIndex}`}
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950/80"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.url}
                      alt={`Project ${index + 1} image ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 30vw, 100vw"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <button
                      type="button"
                      onClick={() => onSetProjectThumbnail(index, imageIndex)}
                      className={cn(
                        "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
                        image.is_thumbnail
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {image.is_thumbnail ? "Thumbnail" : "Set thumbnail"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveProjectImage(index, imageIndex)}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RowCard>
      ))}
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() =>
          projects.append({
            title: "",
            description: "",
            tech_stack: [],
            live_url: "",
            repo_url: "",
            images: [],
          })
        }
      >
        <Plus className="h-4 w-4" />
        Add project
      </Button>
    </div>
  );
}

export function TemplateStep({ form }: CommonProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;
  const values = watch();

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {TEMPLATE_OPTIONS.map((template) => {
        const active = values.template_id === template.id;

        return (
          <button
            key={template.id}
            type="button"
            onClick={() =>
              setValue("template_id", template.id, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            className={cn(
              "overflow-hidden rounded-[30px] border text-left transition",
              active
                ? "border-slate-950 bg-slate-950 text-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
                : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-950"
            )}
          >
            <div
              className={cn(
                "h-36",
                template.id === 1 && "bg-[linear-gradient(135deg,#f7f1e8,#ebdcc8)]",
                template.id === 2 &&
                  "bg-[linear-gradient(135deg,#0f172a,#f97316_65%,#2dd4bf)]",
                template.id === 3 &&
                  "bg-[linear-gradient(135deg,#e2e8f0,#ffffff,#dbeafe)]"
              )}
            />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{template.label}</p>
                {active ? (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            Selected
          </span>
                ) : null}
              </div>
              <p className={cn("text-sm leading-6", active ? "text-white/80" : "text-slate-600")}>
                {template.description}
              </p>
            </div>
          </button>
        );
      })}
      <FieldError message={errors.template_id?.message} />
    </div>
  );
}

export function ReviewStep({ form }: CommonProps) {
  const values = form.watch();
  const selectedTemplate = TEMPLATE_OPTIONS.find(
    (template) => template.id === values.template_id
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Ready to publish
            </p>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
              Review the payload before it goes live.
            </h2>
          </div>
          <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {selectedTemplate?.label ?? "Template 1"}
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <ReviewLine label="Name" value={values.name || "Missing"} />
            <ReviewLine label="Title" value={values.title || "Optional"} />
            <ReviewLine label="Bio" value={values.bio || "Optional"} multiline />
            <ReviewLine
              label="Contact"
              value={
                [values.email, values.phone, values.location].filter(Boolean).join(" • ") ||
                "Optional"
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryItem label="Skills" value={String(values.skills.length)} />
            <SummaryItem label="Services" value={String(values.services.length)} />
            <SummaryItem label="Links" value={String(values.social_links.length)} />
            <SummaryItem label="Projects" value={String(values.projects.length)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/80">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

function ReviewLine({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/80">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300">{label}</p>
      <p className={cn("mt-2 text-slate-800 dark:text-slate-200", multiline && "leading-7")}>{value}</p>
    </div>
  );
}

function FieldGroup({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function RowCard({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/72">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
          {title}
        </div>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function UploadCard({
  title,
  description,
  actionLabel,
  accept,
  loading,
  value,
  onSelect,
}: {
  title: string;
  description: string;
  actionLabel: string;
  accept: string;
  loading: boolean;
  value: string;
  onSelect: (file: File) => void;
}) {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/70">
      <div>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{description}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {actionLabel}
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onSelect(file);
              }
              event.currentTarget.value = "";
            }}
          />
        </label>
        {value ? (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-800">
            Uploaded
          </span>
        ) : null}
      </div>
      {value ? <p className="mt-4 break-all text-sm text-slate-600 dark:text-slate-300">{value}</p> : null}
    </div>
  );
}
