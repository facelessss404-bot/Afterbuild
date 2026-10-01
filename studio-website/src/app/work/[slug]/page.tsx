import { projects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();
  return <ProjectDetailClient slug={slug} />;
}
