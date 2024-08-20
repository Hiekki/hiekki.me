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
import { Projects } from '@/utils/constants';

const ProjectsInfo = () => {
    const [project, setProject] = useState(Projects[0]);

    const handleSlideChange = (swiper: any) => {
        const index = swiper.activeIndex;
        setProject(Projects[index]);
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
                        <Swiper spaceBetween={50} slidesPerView={1} className='mb-12 xl:h-[520px]' onSlideChange={handleSlideChange}>
                            {Projects.map((project, index) => {
                                return (
                                    <SwiperSlide key={index} className='w-full'>
                                        <div className='group relative flex h-[460px] items-center justify-center bg-zinc-200 dark:bg-zinc-700'>
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
