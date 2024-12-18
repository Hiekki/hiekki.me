'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectValue, SelectTrigger } from './ui/select';

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaDiscord } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { handleSubmit } from '@/utils';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';

const info = [
    {
        title: 'Email',
        icon: <FaEnvelope />,
        description: 'hiekkii@gmail.com',
    },
    {
        title: 'Phone Number',
        icon: <FaPhoneAlt />,
        description: '(629) 244.0074',
    },
    {
        title: 'Location',
        icon: <FaMapMarkerAlt />,
        description: 'West Memphis, Arkansas, USA',
    },
    {
        title: 'Discord',
        icon: <FaDiscord />,
        description: 'hiekki',
    },
];

const ContactInfo = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [token, setToken] = useState<string | null>(null);

    const submit = async (event: FormData) => {
        handleSubmit(event, token);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
            className='py-6'
        >
            <div className='container mx-auto'>
                <div className='flex flex-col gap-[30px] xl:flex-row'>
                    <div className='order-2 xl:order-none xl:w-[54%]'>
                        <form className='flex flex-col gap-6 rounded-xl bg-zinc-300 p-10 dark:bg-zinc-700' action={submit}>
                            <h3 className='text-4xl text-purple-500'>Let's work together</h3>
                            <p className='mx-auto text-black/60 dark:text-white/60 xl:mx-0'>
                                I'm always looking for new opportunities to work on. If you're interested in working together, please fill
                                out the form below and I'll get back to you as soon as possible.
                            </p>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <Input type='firstname' placeholder='First Name' required name='firstname' />
                                <Input type='lastname' placeholder='Last Name' required name='lastname' />
                                <Input type='email' placeholder='Email' required name='email' />
                                <Input type='phone' placeholder='Phone Number' required name='phone' />
                            </div>
                            <Select required name='service'>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a service' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a service</SelectLabel>
                                        <SelectItem value='Looking to Hire'>Looking to Hire</SelectItem>
                                        <SelectItem value='Discord Bots'>Discord Bots</SelectItem>
                                        <SelectItem value='Websites'>Websites</SelectItem>
                                        <SelectItem value='General Questions'>General Questions</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Textarea className='h-[200px]' placeholder='Type your message here' required name='message' />
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
                                onChange={(t) => setToken(t)}
                            />
                            <Button className='max-w-40' size='md' disabled={!token}>
                                Send Message
                            </Button>
                        </form>
                    </div>
                    <div className='order-1 mb-8 flex flex-1 items-center xl:order-none xl:mb-0 xl:justify-end'>
                        <ul className='flex flex-col gap-10'>
                            {info.map((item, index) => {
                                return (
                                    <li key={index} className='flex items-center gap-6'>
                                        <div className='flex h-[52px] w-[52px] items-center justify-center rounded-md bg-zinc-300 text-purple-500 dark:bg-zinc-700 xl:h-[72px] xl:w-[72px]'>
                                            <div className='text-[28px]'>{item.icon}</div>
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-black/60 dark:text-white/60'>{item.title}</p>
                                            <h3 className='text-xl'>{item.description}</h3>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
