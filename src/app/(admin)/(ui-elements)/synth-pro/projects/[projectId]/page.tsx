import React from 'react';
import ProjectPageClient from './ProjectPageClient';

// Type definition for Next.js 15 page props
interface PageProps {
  params: Promise<{ projectId: string }>;
}

// Server component that handles async params
const ProjectPage = async ({ params }: PageProps) => {
  const { projectId } = await params;
  
  return <ProjectPageClient projectId={projectId} />;
};

export default ProjectPage; 