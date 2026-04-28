import { getProject, getAllSlugs } from "../../data/projects";
import ProjectDetailClient from "../../components/ProjectDetailClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  return <ProjectDetailClient project={project} />;
}
