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
                    className="relative group"
                    key={item.key}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout">
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
                                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-10 shadow-xl px-4 py-2"
                            >
                                <div className="absolute inset-x-10 z-10 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-purple-600 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-10 -bottom-px bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px " />
                                <div className="font-bold text-white relative z-10 text-base">{item.name}</div>
                                <div className="text-white text-xs">{item.skill_level}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex flex-row object-contain !m-0 !p-0 object-top rounded-full group-hover:scale-105 group-hover:z-10 relative transition duration-500">
                        <div className="border border-purple-500 rounded-full flex justify-center items-center text-purple-500 bg-transparent hover:text-white dark:hover:text-white hover:border-purple-600 dark:hover:border-purple-400 hover:transition-all duration-500 ease-in-out">
                            <Image
                                onMouseMove={handleMouseMove}
                                height={50}
                                width={50}
                                src={`/assets/skills/${item.key}.png`}
                                alt={item.name}
                                className="object-contain !m-0 !p-1 object-top rounded-full border-1 group-hover:scale-105 group-hover:z-30 border-purple-500 relative transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
