import { Metadata } from 'next';

import ResumeInfo from '@/components/ResumeInfo';

export const metadata: Metadata = {
    title: 'Hiekki | Resume',
};

const Resume = () => {
    return <ResumeInfo />;
};

export default Resume;
