'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const Photo = () => {
    let theme = false;
    if (typeof window !== 'undefined') theme = localStorage?.getItem('theme') === 'dark';

    return (
        <div className="w-full h-full relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { delay: 2, duration: 0.4, ease: 'easeIn' },
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 2.4, duration: 0.4, ease: 'easeInOut' },
                    }}
                    className="w-[285px] h-[285px] xl:w-[390px] xl:h-[390px] absolute"
                >
                    <Image
                        src={'/assets/hiekki-portfolio-transparent.svg'}
                        priority
                        quality={100}
                        fill
                        alt=""
                        className="object-contain rounded-full ml-2 dark:invert xl:ml-14 xl:mt-11"
                    />
                </motion.div>

                <motion.svg
                    className="w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]"
                    fill="transparent"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle
                        cx="253"
                        cy="253"
                        r="250"
                        stroke="#A855F7"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: '24 10 0 0' }}
                        animate={{ strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'], rotate: [120, 360] }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    />
                </motion.svg>
            </motion.div>
        </div>
    );
};

export default Photo;
