import { motion } from 'framer-motion';

const stairAnimation = {
    initial: { top: '0%' },
    animate: { top: '100%' },
    exit: { top: ['100%', '0%'] },
};

const randomStair = (array = [1, 2, 3, 4, 5, 6]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
};

const Stairs = () => {
    return (
        <>
            {[...randomStair()].map((value, index) => {
                return (
                    <motion.div
                        key={index}
                        variants={stairAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeInOut', delay: value * 0.1 }}
                        className="z-30 h-full w-full bg-zinc-300 dark:bg-zinc-700 relative"
                    ></motion.div>
                );
            })}
        </>
    );
};

export default Stairs;
