'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectValue, SelectTrigger } from './ui/select';

import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';

const info = [
    {
        title: 'Email',
        icon: <FaEnvelope />,
        description: 'youremail@email.com',
    },
    {
        title: 'Phone Number',
        icon: <FaPhoneAlt />,
        description: '(555) 555.5555',
    },
    {
        title: 'Address',
        icon: <FaMapMarkerAlt />,
        description: '123 Main St, Anytown USA',
    },
];

const ContactInfo = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
            className='py-6'
        >
            <div className='container mx-auto'>
                <div className='flex flex-col gap-[30px] xl:flex-row'>
                    <div className='order-2 xl:order-none xl:h-[54%]'>
                        <form className='flex flex-col gap-6 rounded-xl bg-zinc-300 p-10 dark:bg-zinc-700'>
                            <h3 className='text-4xl text-purple-500'>Let's work together</h3>
                            <p className='mx-auto text-black/60 dark:text-white/60 xl:mx-0'>
                                I'm always looking for new opportunities to work on. If you're interested in working together, please fill
                                out the form below and I'll get back to you as soon as possible.
                            </p>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <Input type='firstname' placeholder='First Name' />
                                <Input type='lastname' placeholder='Last Name' />
                                <Input type='email' placeholder='Email' />
                                <Input type='phone' placeholder='Phone Number' />
                            </div>
                            <Select>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a service' />
                                </SelectTrigger>
                            </Select>
                        </form>
                    </div>
                    <div className='order-1 mb-8 flex flex-1 items-center xl:order-none xl:mb-0 xl:justify-end'>info</div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
