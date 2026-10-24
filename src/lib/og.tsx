import { ImageResponse } from 'next/og';
import { sections, site } from './data';

// The picture shown when your link is shared in a text, chat or social post.
// It is built from lib/data.ts, so it updates when you change your name or tagline.
const rand = (i: number, n: number) => {
    const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
};

export function renderOg() {
    const centers = [
        [790, 130],
        [1010, 250],
        [830, 380],
        [1040, 490],
        [640, 520],
    ];
    const dots = centers.flatMap(([cx, cy], c) => {
        const color = sections[c % sections.length].color.join(',');
        return Array.from({ length: 26 }, (_, k) => {
            const i = c * 100 + k;
            const a = rand(i, 1) * Math.PI * 2;
            const r = Math.sqrt(rand(i, 2)) * 78;
            const s = 6 + rand(i, 3) * 9;
            return (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: cx + Math.cos(a) * r - s / 2,
                        top: cy + Math.sin(a) * r - s / 2,
                        width: s,
                        height: s,
                        borderRadius: 999,
                        background: `rgba(${color},${0.55 + rand(i, 4) * 0.45})`,
                    }}
                />
            );
        });
    });

    return new ImageResponse(
        <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: '#07090d' }}>
            {dots}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '0 80px' }}>
                <div style={{ display: 'flex', fontSize: 128, fontWeight: 700, color: '#eef1f6', lineHeight: 1, letterSpacing: -3 }}>
                    {site.nameLines.join(' ')}
                </div>
                <div style={{ display: 'flex', marginTop: 28, fontSize: 38, color: '#a3adbf' }}>{site.tagline}</div>
            </div>
        </div>,
        { width: 1200, height: 630 },
    );
}
