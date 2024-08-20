'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from 'react-icons/bs';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import Link from 'next/link';
import Image from 'next/image';
import ProjectsSliderButtons from './ProjectsSliderButtons';

const projects = [
    {
        number: '01',
        title: 'Elenora',
        description:
            "Elenora is a top performing Discord bot for the RuneScape MMORPG game. It deals with administrative features, member updates and information, and other general information about the game. Elenora was one of the first projects that was used to learn basic JavaScript/TypeScript skills and functionality, file and code organization, databases, API's, and much more on the journey into programming and developing.",
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'TailwindCSS' }, { name: 'Git' }],
        image: '/assets/projects/elenora.png',
        live: 'https://elenora.gg/',
        github: '#',
    },
    {
        number: '02',
        title: 'Simple Slash',
        description:
            "A simple wrapper for creating slash commands for Discord bots. Discord's conventional way of creating slash commands is very messy and time consuming to create. This project aims to make it easier for developers to create slash commands for their bots.",
        stack: [{ name: 'TypeScript' }, { name: 'Git' }],
        image: '/assets/projects/simpleslash.png',
        live: 'https://www.npmjs.com/package/@elenoragroup/simple-slash',
        github: 'https://github.com/Hiekki/SimpleSlash',
    },
    {
        number: '03',
        title: 'Stubby',
        description:
            'A simple Discord ticketing system bot. Allows you to create different categories that allows users to open a ticket based on those categories and have one on one conversations with those individuals.',
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'Node.js' }, { name: 'Git' }],
        image: '/assets/projects/stubby.png',
        live: '#',
        github: 'https://github.com/Hiekki/Stubby',
    },
    {
        number: '04',
        title: 'NotiFyre',
        description:
            'A simple Discord reminder bot. This bot allows you to use simple times like 1h/1hour, 30m/30minutes, or 1d12hr15m, or specific times like 7pm, 7:00pm, or 19:00, or more complex dates and times like "next Friday at 3pm" or "the first Tuesday of next month at noon".',
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'Node.js' }, { name: 'Git' }],
        image: '/assets/projects/notifyre.png',
        live: '#',
        github: 'https://github.com/Hiekki/NotiFyre',
    },
];

const ProjectsInfo = () => {
    const [project, setProject] = useState(projects[0]);

    const handleSlideChange = (swiper: any) => {
        const index = swiper.activeIndex;
        setProject(projects[index]);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
            className='flex min-h-[80vh] flex-col justify-center py-12 xl:py-0'
        >
            <div className='container mx-auto'>
                <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
                    <div className='order-2 flex w-full flex-col xl:order-none xl:h-[460px] xl:w-[50%] xl:justify-between'>
                        <div className='flex h-[50%] flex-col gap-[30px]'>
                            <div className='text-outline dark:text-outline-dark text-8xl font-extrabold leading-none text-transparent'>
                                {project.number}
                            </div>
                            <h2 className='text-[42px] font-bold capitalize leading-none text-black transition-all duration-500 dark:text-white'>
                                {project.title}
                            </h2>
                            <p className='text-black/60 dark:text-white/60'>{project.description}</p>
                            <ul className='flex gap-4'>
                                {project.stack.map((item, index) => {
                                    return (
                                        <li key={index} className='text-xl text-purple-500'>
                                            {item.name}
                                            {index !== project.stack.length - 1 && ', '}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className='border border-black/20 dark:border-white/20' />
                            <div className='flex items-center gap-4'>
                                {project.live !== '#' && (
                                    <Link href={project.live}>
                                        <TooltipProvider delayDuration={500}>
                                            <Tooltip>
                                                <TooltipTrigger className='group flex h-[70px] w-[70px] items-center justify-center rounded-full bg-black/5 dark:bg-white/5'>
                                                    <BsArrowUpRight className='text-3xl text-black group-hover:text-purple-500 dark:text-white' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Live Project</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                )}
                                {project.github !== '#' && (
                                    <Link href={project.github}>
                                        <TooltipProvider delayDuration={500}>
                                            <Tooltip>
                                                <TooltipTrigger className='group flex h-[70px] w-[70px] items-center justify-center rounded-full bg-black/5 dark:bg-white/5'>
                                                    <BsGithub className='text-3xl text-black group-hover:text-purple-500 dark:text-white' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Github Repository</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full xl:w-[50%]'>
                        <Swiper spaceBetween={50} slidesPerView={1} className='mb-12 xl:h-[525px]' onSlideChange={handleSlideChange}>
                            {projects.map((project, index) => {
                                return (
                                    <SwiperSlide key={index} className='w-full'>
                                        <div className='group relative flex h-[525px] items-center justify-center bg-zinc-200 dark:bg-zinc-700'>
                                            <div className='absolute bottom-0 top-0 z-10 h-full w-full bg-black/10' />
                                            <div className='relative h-full w-full'>
                                                <Image src={project.image} alt='' fill className='object-cover' />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            <ProjectsSliderButtons
                                containerClasses='flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none'
                                buttonClasses='bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-400 text-black dark:text-white text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all'
                            />
                        </Swiper>
                    </div>
                    <div></div>
                </div>
            </div>
        </motion.section>
    );
};

export default ProjectsInfo;
