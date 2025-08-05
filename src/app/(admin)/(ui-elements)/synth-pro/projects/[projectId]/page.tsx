import React from 'react';
import ProjectPageClient from './ProjectPageClient';

// Server component that handles async params
const ProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  
  return <ProjectPageClient projectId={projectId} />;
};

export default ProjectPage; 