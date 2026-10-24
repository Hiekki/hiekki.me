// The scroll-driven particle scene. Plain TypeScript with no framework imports,
// so it can be used from any client component. See components/Portfolio.tsx.

export type SceneSection = { label: string; color: [number, number, number] };

export type SceneOptions = {
    canvas: HTMLCanvasElement;
    sections: SceneSection[]; // exactly five (one cluster shape per section)
    nameLines: [string, string];
    panels: HTMLElement[]; // the fixed window for each section
    contents: HTMLElement[]; // the moving content inside each panel
    hero: HTMLElement;
    mark: HTMLElement;
    spacer: HTMLElement; // gives the page its scroll length
    onHud: (near: number, dockVisible: boolean) => void;
};

export type Scene = { destroy: () => void; jump: (i: number) => void };

type Seg = { type: 'land' | 'hold' | 'in' | 'dwell' | 'out'; start: number; len: number; i: number };
type Vec = { x: number; y: number; z: number };

const TAU = Math.PI * 2;
const D = 660; // camera distance in the overview
const PALE = [226, 232, 242];
const BG = '#07090d';

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const sm = (t: number) => {
    const c = clamp(t);
    return c * c * (3 - 2 * c);
};
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function form(c: number): [number, number, number] {
    const r = Math.random;
    let x = 0,
        y = 0,
        z = 0;
    if (r() < 0.16) {
        // loose halo around the cluster
        const a = r() * TAU,
            b = Math.acos(2 * r() - 1),
            rad = 130 + r() * 130;
        return [rad * Math.sin(b) * Math.cos(a), rad * Math.cos(b), rad * Math.sin(b) * Math.sin(a)];
    }
    const shape = c % 5;
    if (shape === 0) {
        // helix
        const u = r() * 2 - 1,
            a = u * 5.2 * Math.PI + (r() < 0.5 ? 0 : Math.PI),
            rr = 38 + r() * 5;
        x = Math.cos(a) * rr;
        z = Math.sin(a) * rr;
        y = u * 100;
    } else if (shape === 1) {
        // sphere shell
        const a = r() * TAU,
            b = Math.acos(2 * r() - 1),
            rad = 78 + (r() - 0.5) * 8;
        x = rad * Math.sin(b) * Math.cos(a);
        y = rad * Math.cos(b);
        z = rad * Math.sin(b) * Math.sin(a);
    } else if (shape === 2) {
        // wireframe grid
        const ax = Math.floor(r() * 3),
            i = (Math.floor(r() * 5) - 2) * 36,
            j = (Math.floor(r() * 5) - 2) * 36,
            t = (r() * 2 - 1) * 84;
        if (ax === 0) {
            x = t;
            y = i;
            z = j;
        } else if (ax === 1) {
            x = i;
            y = t;
            z = j;
        } else {
            x = i;
            y = j;
            z = t;
        }
    } else if (shape === 3) {
        // stacked discs
        const lv = Math.floor(r() * 5),
            a = r() * TAU,
            rad = r() < 0.75 ? 66 + r() * 3 : Math.sqrt(r()) * 66;
        y = (lv - 2) * 42;
        x = Math.cos(a) * rad;
        z = Math.sin(a) * rad;
    } else {
        // tilted ring
        const u = r() * TAU,
            v = r() * TAU,
            R = 60,
            rr = 22;
        x = (R + rr * Math.cos(v)) * Math.cos(u);
        z = (R + rr * Math.cos(v)) * Math.sin(u);
        y = rr * Math.sin(v);
        const y2 = y * Math.cos(0.7) - z * Math.sin(0.7),
            z2 = y * Math.sin(0.7) + z * Math.cos(0.7);
        y = y2;
        z = z2;
    }
    return [x + (r() - 0.5) * 4, y + (r() - 0.5) * 4, z + (r() - 0.5) * 4];
}

export function createScene(o: SceneOptions): Scene | null {
    const ctx = o.canvas.getContext('2d');
    if (!ctx) return null;
    const canvas = o.canvas;
    const SECS = o.sections;
    const NS = SECS.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = window.innerWidth < 700 ? 2000 : 3400;
    const fontFamily = () => getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif';

    let W = 0,
        H = 0,
        dpr = 1,
        f = 400,
        K = 1.6,
        unit = 800,
        Sc = 1,
        dEnd = 60,
        sizeW = 3;
    let lastW = 0,
        lastH = 0;
    const base: Vec[] = Array.from({ length: NS }, () => ({ x: 0, y: 0, z: 0 }));
    const Crot: Vec[] = Array.from({ length: NS }, () => ({ x: 0, y: 0, z: 0 }));
    const spinPh = [0.3, 1.7, 2.9, 4.1, 5.3],
        spinW = [0.22, -0.18, 0.15, -0.25, 0.2];
    const cs = new Float32Array(NS),
        sn = new Float32Array(NS);

    /* particles */
    const hx = new Float32Array(N),
        hy = new Float32Array(N),
        hz = new Float32Array(N);
    const lx = new Float32Array(N),
        ly = new Float32Array(N),
        lz = new Float32Array(N);
    const bx = new Float32Array(N),
        by = new Float32Array(N),
        bz = new Float32Array(N);
    const cid = new Uint8Array(N),
        dl = new Float32Array(N),
        rs = new Float32Array(N),
        ra = new Float32Array(N),
        ph = new Float32Array(N);
    for (let i = 0; i < N; i++) {
        cid[i] = Math.floor((i * NS) / N);
        const p = form(cid[i]);
        lx[i] = p[0];
        ly[i] = p[1];
        lz[i] = p[2];
        bx[i] = (Math.random() - 0.5) * 240;
        by[i] = (Math.random() - 0.5) * 240;
        bz[i] = (Math.random() - 0.5) * 300;
        dl[i] = Math.random() * 0.4;
        rs[i] = 0.6 + Math.random() * 0.8;
        ra[i] = Math.random();
        ph[i] = Math.random() * TAU;
    }

    /* wordmark: sample the name into home positions */
    const oc = document.createElement('canvas');
    const octx = oc.getContext('2d', { willReadFrequently: true });
    function buildHomes() {
        if (!octx) return;
        const FONT = fontFamily();
        const portrait = W < H * 0.85;
        const lines = portrait ? [...o.nameLines] : [o.nameLines.join(' ')];
        octx.font = '800 100px ' + FONT;
        let w100 = 1;
        lines.forEach((l) => {
            w100 = Math.max(w100, octx.measureText(l).width);
        });
        const maxW = portrait ? W * 0.84 : Math.min(W * 0.7, H * 1.7);
        let fs = (100 * maxW) / w100;
        fs = Math.min(fs, H * (portrait ? 0.2 : 0.3));
        const lh = fs * 1.02,
            cw = Math.ceil(maxW + 24),
            ch = Math.ceil(lines.length * lh + 24);
        oc.width = cw;
        oc.height = ch;
        octx.clearRect(0, 0, cw, ch);
        octx.font = '800 ' + fs + 'px ' + FONT;
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        octx.fillStyle = '#fff';
        lines.forEach((l, i) => octx.fillText(l, cw / 2, 12 + lh * (i + 0.5)));
        const img = octx.getImageData(0, 0, cw, ch).data;
        let ink = 0;
        for (let i = 3; i < img.length; i += 4) if (img[i] > 110) ink++;
        const step = clamp(Math.sqrt(Math.max(1, ink) / (N * 0.9)), 1.6, 7);
        const pts: number[] = [];
        for (let y = 0; y < ch; y += step)
            for (let x = 0; x < cw; x += step) {
                const px = Math.min(cw - 1, Math.floor(x + Math.random() * step * 0.6));
                const py = Math.min(ch - 1, Math.floor(y + Math.random() * step * 0.6));
                if (img[(py * cw + px) * 4 + 3] > 110) pts.push(px, py);
            }
        const cnt = pts.length / 2;
        const order = Array.from({ length: cnt }, (_, i) => i);
        for (let i = cnt - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = order[i];
            order[i] = order[j];
            order[j] = t;
        }
        const yOff = H * 0.1 * K;
        for (let i = 0; i < N; i++) {
            const k = cnt ? order[i % cnt] : 0;
            const jit = i >= cnt ? step * 0.5 : 0;
            const px = (cnt ? pts[k * 2] : cw / 2) + (Math.random() - 0.5) * jit;
            const py = (cnt ? pts[k * 2 + 1] : ch / 2) + (Math.random() - 0.5) * jit;
            hx[i] = (px - cw / 2) * K;
            hy[i] = -(py - ch / 2) * K + yOff;
            hz[i] = (Math.random() - 0.5) * 24;
        }
        sizeW = step * 0.5 * K;
    }

    function layoutScene() {
        f = Math.min(W, H * 0.9);
        K = D / f;
        unit = H;
        const halfW = 0.5 * W * K,
            halfH = 0.5 * H * K;
        // Wide screens: two columns that zigzag (left, right, left, right, left) with even spacing.
        // Tall screens: a single column down the middle.
        // Every cluster sits at the same depth, so the columns and rows line up exactly.
        const wide = W >= H * 0.85;
        const reach = halfH * (wide ? 0.56 : 0.62);
        const step = (2 * reach) / (NS - 1);
        const Xc = Math.min(halfW * 0.26, 260);
        if (wide) Sc = Math.min(1, (2 * step - 40) / 215, (2 * Xc - 40) / 200);
        else Sc = Math.min(1, (step - 40) / 215, (halfW * 0.5) / 100);
        dEnd = 40 + 30 * Sc;
        for (let i = 0; i < NS; i++) {
            base[i].x = wide ? (i % 2 ? 1 : -1) * Xc : 0;
            base[i].y = reach - step * i;
            base[i].z = 0;
        }
        buildHomes();
    }

    /* timeline: how many pixels of scrolling each phase gets */
    let segs: Seg[] = [];
    let scr: number[] = [],
        dwellStart: number[] = [],
        inStart: number[] = [];
    function buildTimeline() {
        const pv = H - 156;
        segs = [];
        scr = [];
        dwellStart = [];
        inStart = [];
        let y = 0;
        const push = (type: Seg['type'], len: number, i: number) => {
            segs.push({ type, start: y, len, i });
            y += len;
        };
        push('land', unit * 1.7, -1);
        push('hold', unit * 0.25, -1);
        for (let i = 0; i < NS; i++) {
            const h = o.contents[i].offsetHeight;
            o.contents[i].style.marginTop = h < pv ? Math.round((pv - h) * 0.35) + 'px' : '0px';
            scr[i] = Math.max(0, h - pv);
            inStart[i] = y;
            push('in', unit, i);
            dwellStart[i] = y;
            push('dwell', scr[i] + unit * 0.6, i);
            if (i < NS - 1) {
                push('out', unit, i);
                push('hold', unit * 0.2, -1);
            }
        }
        o.spacer.style.height = y + H + 'px';
    }

    const S = { e: 0, idx: -1, s: 0, pa: 0, pp: 0 };
    function stateAt(y: number) {
        S.e = clamp(y / (unit * 1.55));
        S.idx = -1;
        S.s = 0;
        S.pa = 0;
        S.pp = 0;
        for (const g of segs) {
            if (y >= g.start && y < g.start + g.len + 0.001) {
                const t = clamp((y - g.start) / g.len);
                if (g.type === 'in') {
                    S.idx = g.i;
                    S.s = eio(t);
                    S.pa = sm((t - 0.72) / 0.28);
                } else if (g.type === 'dwell') {
                    S.idx = g.i;
                    S.s = 1;
                    S.pa = 1;
                    const pre = (unit * 0.3) / g.len;
                    S.pp = scr[g.i] ? clamp((t - pre) / (1 - 2 * pre)) : 0;
                } else if (g.type === 'out') {
                    S.idx = g.i;
                    S.s = 1 - eio(t);
                    S.pa = 1 - sm(t / 0.28);
                    S.pp = 1;
                }
                return S;
            }
        }
        const lastSeg = segs[segs.length - 1];
        if (lastSeg && y >= lastSeg.start + lastSeg.len) {
            S.idx = lastSeg.i;
            S.s = 1;
            S.pa = 1;
            S.pp = 1;
        }
        return S;
    }

    /* batched drawing: one path per colour and brightness */
    const NB = 3 * NS * 3;
    const bk = Array.from({ length: NB }, () => new Float32Array(N * 3));
    const bc = new Int32Array(NB);
    const AL = [0.38, 0.68, 0.98];
    const colStr: string[] = [];
    for (let l = 0; l < 3; l++)
        for (let c = 0; c < NS; c++) {
            const a = SECS[c].color;
            const m = l === 0 ? PALE : l === 1 ? [0, 1, 2].map((q) => (PALE[q] + a[q]) / 2) : a;
            colStr.push('rgb(' + m.map(Math.round).join(',') + ')');
        }

    /* hud and input */
    let hudKey = '',
        pActive = false,
        pwx = 0,
        pwy = 0,
        cur = 0,
        raf = 0;
    const pCache: { vis?: string; o?: string }[] = [];
    const onMove = (ev: PointerEvent) => {
        pActive = true;
        pwx = (ev.clientX - W / 2) * K;
        pwy = -(ev.clientY - H / 2) * K;
    };
    const onLeave = () => {
        pActive = false;
    };
    const onUp = (ev: PointerEvent) => {
        if (ev.pointerType !== 'mouse') pActive = false;
    };

    function jump(i: number) {
        // skip the long trip: appear at the overview just before this section, then fly in
        const from = inStart[i] + 1;
        window.scrollTo(0, from);
        cur = from;
        requestAnimationFrame(() => window.scrollTo({ top: dwellStart[i] + 2, behavior: reduce ? 'auto' : 'smooth' }));
    }

    let last = performance.now();
    function frame(now: number) {
        if (!ctx) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const t = now / 1000;
        const target = window.scrollY || 0;
        cur += (target - cur) * (reduce ? 1 : 1 - Math.exp(-dt * 14));
        if (Math.abs(target - cur) < 0.25) cur = target;
        const st = stateAt(cur),
            e = st.e,
            idx = st.idx,
            s = st.s;
        const FONT = fontFamily();

        const cy = 1,
            sy = 0; // clusters stay exactly in line; only their shapes spin
        for (let i = 0; i < NS; i++) {
            const b = base[i];
            Crot[i].x = b.x * cy + b.z * sy;
            Crot[i].z = -b.x * sy + b.z * cy;
            Crot[i].y = b.y;
            const a = spinPh[i % 5] + (reduce ? 0 : t * spinW[i % 5]);
            cs[i] = Math.cos(a);
            sn[i] = Math.sin(a);
        }
        let camX = 0,
            camY = 0,
            camZ = D;
        if (idx >= 0) {
            const C = Crot[idx],
                kk = 1 - Math.pow(1 - s, 3),
                dist = Math.exp(Math.log(D) * (1 - s) + Math.log(dEnd) * s);
            camX = C.x * kk;
            camY = C.y * kk;
            camZ = C.z * kk + dist;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, W, H);
        const cx0 = W / 2,
            cy0 = H / 2;
        if (idx >= 0 && s > 0.3) {
            const c = SECS[idx].color,
                g = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, Math.max(W, H) * 0.8);
            g.addColorStop(0, 'rgba(' + c.join(',') + ',' + 0.16 * sm((s - 0.3) / 0.7) + ')');
            g.addColorStop(1, 'rgba(' + c.join(',') + ',0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }
        ctx.globalCompositeOperation = 'lighter';
        bc.fill(0);
        const lyw = reduce ? 0 : 0.2 * Math.sin(t * 0.45) * (1 - e),
            lcy = Math.cos(lyw),
            lsy = Math.sin(lyw);
        const dimF = 1 - 0.62 * s,
            rMax = 11 - 5.5 * s,
            pi = Math.PI;
        for (let i = 0; i < N; i++) {
            const c = cid[i];
            let lt = clamp((e - dl[i]) / 0.6);
            lt = lt * lt * (3 - 2 * lt);
            const m = reduce ? 0 : 1,
                a1 = t * 0.8 + ph[i],
                a2 = t * 0.6 + ph[i] * 1.7;
            const wv = Math.sin(hx[i] / (160 * K) - t * 1.4) * 3.5 * K * m;
            let x0 = hx[i] + (Math.sin(a1) * 2.6 + Math.cos(a2) * 1.6) * K * m;
            let y0 = hy[i] + (Math.cos(a1) * 2.6 + wv) * K * m;
            let z0 = hz[i] + Math.sin(a2) * 10 * m;
            if (pActive && lt <= 0) {
                const dx = x0 - pwx,
                    dy = y0 - pwy,
                    d2 = dx * dx + dy * dy,
                    R = 90 * K;
                if (d2 < R * R && d2 > 0.01) {
                    const d = Math.sqrt(d2),
                        push = (1 - d / R) * 48 * K;
                    x0 += (dx / d) * push;
                    y0 += (dy / d) * push;
                    z0 += (1 - d / R) * 40;
                }
            }
            const ox = x0 * lcy + z0 * lsy,
                oz = -x0 * lsy + z0 * lcy;
            let X = ox,
                Y = y0,
                Z = oz;
            if (lt > 0) {
                const lxx = lx[i] * Sc,
                    lyy = ly[i] * Sc,
                    lzz = lz[i] * Sc;
                const rx = lxx * cs[c] - lzz * sn[c],
                    rz = lxx * sn[c] + lzz * cs[c];
                const C = Crot[c],
                    sx = C.x + rx,
                    sy2 = C.y + lyy,
                    sz = C.z + rz,
                    bs = Math.sin(pi * lt);
                X = ox + (sx - ox) * lt + bx[i] * bs;
                Y = y0 + (sy2 - y0) * lt + by[i] * bs;
                Z = oz + (sz - oz) * lt + bz[i] * bs;
            }
            const zz = camZ - Z;
            if (zz < 8) continue;
            const sc = f / zz,
                px = cx0 + (X - camX) * sc,
                py = cy0 - (Y - camY) * sc;
            if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
            let r = sizeW * rs[i] * sc;
            r = r < 0.8 ? 0.8 : r > rMax ? rMax : r;
            let aq = ra[i] < 0.34 ? 0 : ra[i] < 0.7 ? 1 : 2;
            if (zz < 30) aq = 0;
            const lvl = lt < 0.2 ? 0 : lt < 0.55 ? 1 : 2;
            const b = (lvl * NS + c) * 3 + aq,
                n = bc[b]++,
                a = bk[b];
            a[n * 3] = px;
            a[n * 3 + 1] = py;
            a[n * 3 + 2] = r;
        }
        for (let b = 0; b < NB; b++) {
            const n = bc[b];
            if (!n) continue;
            const a = bk[b];
            ctx.fillStyle = colStr[(b / 3) | 0];
            ctx.globalAlpha = AL[b % 3] * dimF;
            ctx.beginPath();
            for (let k = 0; k < n; k++) {
                const x = a[k * 3],
                    y = a[k * 3 + 1],
                    r = a[k * 3 + 2];
                ctx.moveTo(x + r, y);
                ctx.arc(x, y, r, 0, TAU);
            }
            ctx.fill();
        }
        /* glowing core of each cluster, and its label */
        const showE = sm((e - 0.5) / 0.4);
        if (showE > 0) {
            for (let i = 0; i < NS; i++) {
                const C = Crot[i],
                    zz = camZ - C.z;
                if (zz < 6) continue;
                const sc = f / zz,
                    px = cx0 + (C.x - camX) * sc,
                    py = cy0 - (C.y - camY) * sc,
                    col = SECS[i].color.join(',');
                const ca = showE * (i === idx ? 1 - sm((s - 0.8) / 0.18) : 1);
                const rp = 20 * Sc * sc;
                if (ca > 0.01 && px > -rp * 4 && px < W + rp * 4 && py > -rp * 4 && py < H + rp * 4) {
                    const g = ctx.createRadialGradient(px, py, 0, px, py, rp * 3.4);
                    g.addColorStop(0, 'rgba(255,255,255,' + 0.95 * ca + ')');
                    g.addColorStop(0.2, 'rgba(' + col + ',' + 0.85 * ca + ')');
                    g.addColorStop(1, 'rgba(' + col + ',0)');
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = g;
                    ctx.fillRect(px - rp * 3.4, py - rp * 3.4, rp * 6.8, rp * 6.8);
                }
            }
            ctx.globalCompositeOperation = 'source-over';
            const la = showE * (1 - sm(s / 0.5));
            if (la > 0.02) {
                ctx.font = '600 ' + Math.round(clamp(W / 28, 13, 17)) + 'px ' + FONT;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#eef1f6';
                for (let i = 0; i < NS; i++) {
                    const C = Crot[i],
                        zz = camZ - C.z;
                    if (zz < 20) continue;
                    const sc = f / zz;
                    ctx.globalAlpha = la;
                    ctx.fillText(SECS[i].label, cx0 + (C.x - camX) * sc, cy0 - (C.y - camY) * sc + 108 * Sc * sc + 8);
                }
            }
        }
        /* flash as you pass through the core */
        if (idx >= 0 && s > 0.7 && s < 1) {
            const fa = Math.sin(pi * clamp((s - 0.7) / 0.3)) * 0.85,
                col = SECS[idx].color.join(',');
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = 1;
            const g = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, Math.max(W, H) * 0.75);
            g.addColorStop(0, 'rgba(255,255,255,' + fa + ')');
            g.addColorStop(0.35, 'rgba(' + col + ',' + fa * 0.7 + ')');
            g.addColorStop(1, 'rgba(' + col + ',' + fa * 0.25 + ')');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        /* html layers */
        o.hero.style.opacity = String(1 - clamp(cur / (unit * 0.3)));
        o.mark.style.opacity = e > 0.6 ? '1' : '0';
        for (let i = 0; i < NS; i++) {
            const on = i === idx && st.pa > 0.01,
                p = o.panels[i],
                c = pCache[i] || (pCache[i] = {});
            const vis = on ? 'visible' : 'hidden';
            if (c.vis !== vis) {
                p.style.visibility = vis;
                c.vis = vis;
            }
            if (on) {
                const op = st.pa.toFixed(3);
                if (c.o !== op) {
                    p.style.opacity = op;
                    p.style.pointerEvents = st.pa > 0.9 ? 'auto' : 'none';
                    c.o = op;
                }
                o.contents[i].style.transform = 'translate3d(0,' + (-st.pp * scr[i]).toFixed(1) + 'px,0)';
            }
        }
        const near = idx >= 0 && s > 0.5 ? idx : -1,
            key = near + ':' + (e > 0.5 ? 1 : 0);
        if (key !== hudKey) {
            hudKey = key;
            o.onHud(near, e > 0.5);
        }
        raf = requestAnimationFrame(frame);
    }

    function resize() {
        const w = window.innerWidth,
            h = window.innerHeight;
        if (!w || !h) return;
        const redo = Math.abs(w - lastW) > 1 || Math.abs(h - lastH) > h * 0.2;
        W = w;
        H = h;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        if (redo) {
            lastW = W;
            lastH = H;
            layoutScene();
            buildTimeline();
        }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerup', onUp);
    resize();
    // Rebuild once fonts are loaded so the sampled name uses the real typeface.
    document.fonts.ready
        .then(() => {
            buildHomes();
            buildTimeline();
        })
        .catch(() => {});
    raf = requestAnimationFrame((n) => {
        last = n;
        frame(n);
    });

    return {
        jump,
        destroy() {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('pointerup', onUp);
        },
    };
}
