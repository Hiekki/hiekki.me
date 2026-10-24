'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { sections, site } from '@/lib/data';
import { createScene } from '@/lib/scene';
import type { Scene } from '@/lib/scene';
import { panelBodies } from './Panels';

export default function Portfolio() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const markRef = useRef<HTMLSpanElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<(HTMLElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sceneRef = useRef<Scene | null>(null);
    const router = useRouter();
    const [hud, setHud] = useState({ near: -1, docked: false });

    useEffect(() => {
        const canvas = canvasRef.current,
            hero = heroRef.current,
            mark = markRef.current,
            spacer = spacerRef.current;
        const panels = panelRefs.current.filter((p): p is HTMLElement => !!p);
        const contents = contentRefs.current.filter((c): c is HTMLDivElement => !!c);
        if (!canvas || !hero || !mark || !spacer || panels.length !== sections.length || contents.length !== sections.length) return;
        const scene = createScene({
            canvas,
            sections: sections.map((s) => ({ label: s.label, color: s.color })),
            nameLines: site.nameLines,
            panels,
            contents,
            hero,
            mark,
            spacer,
            onHud: (near, docked) => setHud({ near, docked }),
        });
        if (!scene) {
            // The browser could not start the animation, so show the plain version instead.
            router.replace('/plain');
            return;
        }
        sceneRef.current = scene;
        return () => {
            scene?.destroy();
            sceneRef.current = null;
        };
    }, [router]);

    return (
        <>
            <canvas ref={canvasRef} aria-hidden='true' className='fixed inset-0 block h-full w-full' />
            <h1 className='sr-only'>
                {site.nameLines.join(' ')}, {site.tagline}
            </h1>

            <noscript>
                <div className='fixed inset-0 z-50 grid place-items-center bg-bg p-6 text-center'>
                    <a href='/plain' className='rounded-full border border-edge px-5 py-3 font-semibold'>
                        Open the plain version of this site
                    </a>
                </div>
            </noscript>

            <div className='pointer-events-none fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-[max(16px,env(safe-area-inset-left))] pt-[max(14px,env(safe-area-inset-top))]'>
                <span ref={markRef} className='font-bold tracking-tight opacity-0 transition-opacity duration-300'>
                    {site.nameLines.join(' ')}
                </span>
                <Link
                    href='/plain'
                    className='pointer-events-auto ml-auto rounded-full border border-edge bg-card px-4 py-2 text-[0.88rem] font-semibold'
                >
                    Plain version
                </Link>
            </div>

            <div
                ref={heroRef}
                className='pointer-events-none fixed inset-x-0 top-[62%] z-5 px-[max(16px,env(safe-area-inset-left))] text-center'
            >
                <p className='mx-auto max-w-[22em] text-balance text-[clamp(1rem,3.6vw,1.25rem)] text-muted'>{site.tagline}</p>
                <div className='mt-7 inline-flex flex-col items-center gap-2 text-sm text-muted'>
                    <span>Scroll</span>
                    <i className='scroll-cue' />
                </div>
            </div>

            {sections.map((s, i) => (
                <section
                    key={s.id}
                    ref={(el) => {
                        panelRefs.current[i] = el;
                    }}
                    className='panel'
                    style={{ '--c': `rgb(${s.color.join(',')})` } as React.CSSProperties}
                    aria-label={s.label}
                >
                    <div
                        ref={(el) => {
                            contentRefs.current[i] = el;
                        }}
                        className='mx-auto max-w-160 py-4.5 will-change-transform'
                    >
                        <h2 className='text-balance text-[clamp(2.2rem,9vw,3.8rem)] leading-none font-extrabold tracking-[-0.03em]'>
                            {s.heading}
                        </h2>
                        <p className='mt-3.5 mb-5 max-w-[32em] text-[1.05rem] text-muted'>{s.blurb}</p>
                        {panelBodies[i]}
                    </div>
                </section>
            ))}

            <nav
                aria-label='Sections'
                className={
                    'fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-10 flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-1 rounded-full border border-edge bg-card py-1 pr-4 pl-2 transition-opacity duration-300 ' +
                    (hud.docked ? 'opacity-100' : 'pointer-events-none opacity-0')
                }
            >
                {sections.map((s, i) => (
                    <button
                        key={s.id}
                        type='button'
                        aria-label={s.label}
                        aria-current={hud.near === i}
                        onClick={() => sceneRef.current?.jump(i)}
                        style={{ '--c': `rgb(${s.color.join(',')})` } as React.CSSProperties}
                        className='grid h-9 w-7.5 cursor-pointer place-items-center'
                    >
                        <i
                            className={'block h-2 w-2 rounded-full transition ' + (hud.near === i ? 'scale-150 bg-(--c)' : 'bg-[#566178]')}
                        />
                    </button>
                ))}
                <span className='ml-1.5 min-w-[6.4em] whitespace-nowrap text-[0.9rem] font-semibold'>
                    {hud.near >= 0 ? sections[hud.near].label : 'Overview'}
                </span>
            </nav>

            <div ref={spacerRef} className='w-px' />
        </>
    );
}
