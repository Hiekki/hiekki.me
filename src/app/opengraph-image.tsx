import { renderOg } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const alt = 'Portfolio preview';
export const contentType = 'image/png';

export default function Image() {
    return renderOg();
}
