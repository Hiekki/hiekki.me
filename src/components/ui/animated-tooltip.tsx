'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const items = [
    { id: 1, key: 'typescript', name: 'Typescript', skill_level: '' },
    { id: 2, key: 'javascript', name: 'Javascript', skill_level: '' },
    { id: 3, key: 'tailwindcss', name: 'Tailwindcss', skill_level: '' },
    { id: 4, key: 'mysql', name: 'MySQL', skill_level: '' },
    { id: 5, key: 'mongodb', name: 'MongoDB', skill_level: '' },
    { id: 6, key: 'git', name: 'Git', skill_level: '' },
    { id: 7, key: 'nextjs', name: 'NextJS', skill_level: '' },
];

export const AnimatedTooltip = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 7.5 };
    const x = useMotionValue(0); // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
    // translate the tooltip
    const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };

    return (
        <>
            {items.map((item, idx) => (
                <div
                    className='group relative'
                    key={item.key}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode='popLayout'>
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: 'nowrap',
                                }}
                                className='absolute -left-1/2 -top-16 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl'
                            >
                                <div className='absolute inset-x-10 -bottom-px h-px w-[20%] bg-gradient-to-r from-transparent via-purple-600 to-transparent' />
                                <div className='absolute -bottom-px left-10 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-400 to-transparent' />
                                <div className='relative text-base font-bold text-white'>{item.name}</div>
                                <div className='text-xs text-white'>{item.skill_level}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className=''>
                        <div className='flex items-center justify-center rounded-full border border-purple-500 bg-transparent text-purple-500 duration-500 ease-in-out hover:border-purple-600 hover:text-white hover:transition-all dark:hover:border-purple-400 dark:hover:text-white'>
                            <Image
                                onMouseMove={handleMouseMove}
                                height={50}
                                width={50}
                                src={`/assets/skills/${item.key}.png`}
                                alt={item.name}
                                className='border-1 relative !m-0 rounded-full border-purple-500 object-contain !p-1 transition duration-500 group-hover:scale-105'
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
