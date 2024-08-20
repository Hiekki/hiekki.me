import ProjectsInfo from '@/components/ProjectsInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hiekki | Projects',
};

const Projects = () => {
    return <ProjectsInfo />;
};

export default Projects;
