import Link from 'next/link';
import { BsChatLeftText } from 'react-icons/bs';

import Photo from '@/components/Photo';
import { Button } from '@/components/ui/button';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Stats from '@/components/Stats';
import { AboutMe } from '@/utils/constants';

export default function Home() {
    return (
        <section className='h-full'>
            <div className='container mx-auto h-full'>
                <div className='flex flex-col items-center justify-between xl:flex-row xl:pb-24 xl:pt-8'>
                    <div className='order-2 text-center xl:order-none xl:text-left'>
                        <span className='text-xl'>Software Developer</span>
                        <h1 className='h1 mb-6'>
                            Hello, I'm <br />
                            <span className='text-purple-500'>Kevin Abernathy</span>
                        </h1>
                        <p className='mb-9 max-w-[500px] text-black/80 dark:text-white/80'>{AboutMe.description}</p>
                        <div className='flex flex-col items-center justify-center xl:flex-row'>
                            <Button variant='outline' size='lg' className='mb-8 flex items-center gap-2 uppercase xl:mb-0'>
                                <Link href={'/contact'}>Contact</Link>
                                <BsChatLeftText className='text-xl' />
                            </Button>
                            <div className='mb-8 flex w-full items-center justify-center gap-2 transition-all duration-1000 ease-in-out xl:mb-0'>
                                <AnimatedTooltip />
                            </div>
                        </div>
                    </div>
                    <div className='order-1 mb-8 mt-10 xl:order-none xl:mb-0 xl:mt-0'>
                        <Photo />
                    </div>
                </div>
                <Stats />
            </div>
        </section>
    );
}
