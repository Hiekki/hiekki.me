'use client';

import { FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiMysql, SiMongodb } from 'react-icons/si';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

import { AboutMe, Experience, Education } from '@/utils/constants';

const Skills = {
    title: 'My Skills',
    description:
        'I am a self-taught developer with experience in JavaScript, TypeScript, React, Next.js, MySQL, MongoDB, Node.js, and TailwindCSS.',
    info: [
        {
            icon: <SiTypescript />,
            name: 'typescript',
        },
        {
            icon: <FaJs />,
            name: 'javascript',
        },
        {
            icon: <SiTailwindcss />,
            name: 'tailwindcss',
        },
        {
            icon: <FaNodeJs />,
            name: 'node.js',
        },
        {
            icon: <FaReact />,
            name: 'react',
        },
        {
            icon: <SiNextdotjs />,
            name: 'next.js',
        },
        {
            icon: <SiMysql />,
            name: 'mysql',
        },
        {
            icon: <SiMongodb />,
            name: 'mongodb',
        },
    ],
};

const ResumeInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <div className="container mx-auto">
                <Tabs defaultValue="about" className="flex flex-col gap-[60px] xl:flex-row">
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <div className="flex flex-col gap-[30px] text-center xl:text-left">
                            <h3 className="text-4xl font-bold">Why hire me?</h3>
                            <p className="max-w-[600px] text-black/60 dark:text-white/60 mx-auto xl:mx-0">
                                I am skilled in integrating diverse applications via REST APIs, collaborating with teams to implement
                                features and solutions, and writing clean, stable code.
                            </p>
                        </div>
                        <TabsTrigger value="about">About Me</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                    </TabsList>
                    <div className="min-h-[70vh] w-full">
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{Experience.title}</h3>
                                <p className="max-w-[600px] text-black/60 dark:text-white/60 mx-auto xl:mx-0">{Experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {Experience.info.map((item, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="bg-zinc-300 dark:bg-zinc-700 py-6 px-10 rounded-xl flex flex-col justify-center items-center xl:items-start gap-1"
                                                >
                                                    <span className="text-purple-500">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center xl:text-left">
                                                        {item.position}
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-[6px] h-[6px] rounded-full bg-purple-500" />
                                                        <p className="text-black/60 dark:text-white/60">{item.company}</p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="education" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{Education.title}</h3>
                                <p className="max-w-[600px] text-black/60 dark:text-white/60 mx-auto xl:mx-0">{Education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {Education.info.map((item, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="bg-zinc-300 dark:bg-zinc-700 py-6 px-10 rounded-xl flex flex-col justify-center items-center xl:items-start gap-1"
                                                >
                                                    <span className="text-purple-500">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center xl:text-left">
                                                        {item.insitution}
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-[6px] h-[6px] rounded-full bg-purple-500" />
                                                        <p className="text-black/60 dark:text-white/60">{item.degree}</p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                    <h3 className="text-4xl font-bold">{Skills.title}</h3>
                                    <p className="text-black/60 dark:text-white/60 mx-auto xl:mx-0">{Skills.description}</p>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:gap-[30px] gap-4">
                                    {Skills.info.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger className="w-full h-[150px] bg-zinc-300 dark:bg-zinc-700 rounded-xl flex justify-center items-center group">
                                                            <div className="text-6xl group-hover:text-purple-500 transition-all duration-300">
                                                                {item.icon}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="capitalize">{item.name}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </TabsContent>

                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{AboutMe.title}</h3>
                                <p className="max-w-[600px] text-black/60 dark:text-white/60 mx-auto xl:mx-0">{AboutMe.description}</p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {AboutMe.info.map((item, index) => {
                                        return (
                                            <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                                <span className="text-black/60 dark:text-white/60">{item.title}</span>
                                                <span className="text-xl">{item.description}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </motion.div>
    );
};

export default ResumeInfo;
