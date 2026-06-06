'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { asset } from '@/lib/asset';

// M-shape outline, re-ordered so the drawing starts at the top-centre notch
// (the point marked red in the storyboard) and runs clockwise from there.
const M_SHAPE =
  'M123.673 40.6006L192.964 0.798828V47.0869H209.487V121.927H134.597V107.088L133.904 107.486L70.4453 143.945V103.737L69.7529 104.136L0.462891 143.945V71.1748L122.98 0.798828V40.998Z';

// ---- Pinned spotlight tuning (edit freely) ----
const SPOTLIGHT = {
  // Scroll the pin holds PER service, as a fraction of viewport height.
  // Track height = (1 + (N-1)*segVh) * 100vh → 0.25 ≈ 200vh for 5 rows
  // (~100vh of pinned travel). Higher = slower, more deliberate scrub.
  segVh: 0.25,
  // Focus falloff, measured in units of the gap BETWEEN adjacent row centres
  // (rowStep, ~200px). `plateau`: how far from centre a row stays fully lit;
  // then smoothstep to 0 across `falloff`. A neighbour ~1 gap away lands at the
  // dim floor.
  plateau: 0.18,
  falloff: 0.9,
  // Per-frame easing toward the target (single-pole lerp). Lower = more inertia,
  // silkier; higher = snappier. Keeps fast flicks smooth ("без рывков").
  smooth: 0.18,
  // Breathing room at the top/bottom of the pinned list, as a fraction of the
  // pin height. The list translate is clamped to its own bounds + this inset, so
  // the first row sits just below the top (≈ the original banner gap) instead of
  // being pushed to centre — no big empty band at entry/exit.
  edgeVh: 0.07,
  // Below this viewport width the pin/spotlight is off (plain stacked list) to
  // avoid jitter on mobile.
  minWidth: 768,
} as const;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function ServicesSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<'idle' | 'play'>('idle');

  // Play the morph once the visual scrolls into view (plays once). The scale is
  // a fixed factor in CSS, so the whole intro is identical at every resolution —
  // nothing is measured at runtime.
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    if (!('IntersectionObserver' in window)) {
      setAnim('play');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setAnim('play');
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(visual);
    return () => io.disconnect();
  }, []);

  // Pinned scroll spotlight: a tall track gives scroll length, a sticky pin holds
  // the list, and the list is translateY-scrubbed by the section's scroll
  // progress so the active service sits at the pin centre — fully lit while
  // neighbours fall to --svc-dim. Reversible by construction (reads progress each
  // frame). Writes --focus (0..1) per row; CSS turns that into opacity, a hair of
  // title scale, and the blue active label. Disabled on mobile / reduced-motion.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const pin = track.querySelector<HTMLElement>('[data-services-pin]');
    const list = track.querySelector<HTMLElement>('[data-services-list]');
    const rows = Array.from(
      track.querySelectorAll<HTMLElement>('[data-service-row]'),
    );
    if (!pin || !list || rows.length === 0) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const enabled = () =>
      !prefersReduced && window.innerWidth >= SPOTLIGHT.minWidth;

    // Geometry in the list's own coordinate space (offsetTop — unaffected by the
    // scrub transform). rowStep = the gap BETWEEN adjacent centres (~200px) and
    // is the ONLY focus-falloff scale; pinH is only for centring + progress.
    let rowCentre: number[] = [];
    let rowStep = 1;
    let pinH = 0;
    let listH = 0;
    const measure = () => {
      rowCentre = rows.map((r) => r.offsetTop + r.offsetHeight / 2);
      const gaps: number[] = [];
      for (let i = 1; i < rowCentre.length; i += 1) {
        gaps.push(rowCentre[i] - rowCentre[i - 1]);
      }
      gaps.sort((a, b) => a - b);
      rowStep = gaps.length ? gaps[gaps.length >> 1] : 1; // median gap
      pinH = pin.clientHeight;
      listH = list.offsetHeight;
    };

    // Smoothed state.
    const focus = rows.map(() => 1);
    let translate = 0;
    let primed = false;

    const bell = (x: number) => {
      // x = distance / rowStep. Flat 1 within `plateau`, smoothstep to 0 by
      // plateau + falloff. A neighbour ~1 rowStep away → ~0 → dim floor.
      const t = clamp01((x - SPOTLIGHT.plateau) / SPOTLIGHT.falloff);
      return 1 - smoothstep(t);
    };

    let rafId = 0;
    let inView = false;

    const frame = () => {
      rafId = 0;
      if (!enabled() || !inView) return;

      const rect = track.getBoundingClientRect();
      const span = rect.height - pinH;
      const progress = span > 0 ? clamp01(-rect.top / span) : 0;

      const fi = progress * (rows.length - 1);
      const lo = Math.floor(fi);
      const hi = Math.min(rows.length - 1, lo + 1);
      const targetCentre =
        rowCentre[lo] + (rowCentre[hi] - rowCentre[lo]) * (fi - lo);

      // Centre the active row, then clamp so the list never slides past its own
      // edges (+ a small breathing inset) — kills the centred-pin void while the
      // focus math below still gives every row its lit moment.
      const inset = pinH * SPOTLIGHT.edgeVh;
      const maxT = inset;
      const minT = pinH - listH - inset;
      let targetTranslate = pinH / 2 - targetCentre;
      targetTranslate =
        minT <= maxT
          ? Math.min(maxT, Math.max(minT, targetTranslate))
          : (pinH - listH) / 2; // list shorter than the pin: just centre it
      if (!primed) {
        translate = targetTranslate;
        primed = true;
      } else {
        translate += (targetTranslate - translate) * SPOTLIGHT.smooth;
      }
      list.style.transform = `translateY(${translate.toFixed(2)}px)`;

      let settled = Math.abs(targetTranslate - translate) < 0.4;
      for (let i = 0; i < rows.length; i += 1) {
        const target = bell(Math.abs(rowCentre[i] - targetCentre) / rowStep);
        focus[i] += (target - focus[i]) * SPOTLIGHT.smooth;
        if (Math.abs(target - focus[i]) > 0.003) settled = false;
        rows[i].style.setProperty('--focus', focus[i].toFixed(3));
      }

      // Keep ticking while animating; idle out once settled. A scroll/resize
      // re-wakes the loop via start().
      if (!settled) rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!rafId && enabled() && inView) rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // Enable/disable the whole pinned mechanism; clear inline styles when off so
    // the CSS off-state (plain flow) wins. Gate + track height are applied BEFORE
    // measure() so the pin is already sticky/100vh — otherwise offsetTop/pinH read
    // against the wrong offset parent.
    const sync = () => {
      if (enabled()) {
        track.dataset.spotlight = 'on';
        track.style.height = `${Math.round(100 + (rows.length - 1) * SPOTLIGHT.segVh * 100)}vh`;
        measure();
        primed = false;
        start();
      } else {
        stop();
        track.dataset.spotlight = 'off';
        track.style.height = '';
        list.style.transform = '';
        rows.forEach((r) => r.style.setProperty('--focus', '1'));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { rootMargin: '10% 0px 10% 0px' },
    );
    io.observe(track);

    // Re-measure when the list reflows (font swap, wrap changes) and wake the loop.
    const ro = new ResizeObserver(() => {
      if (enabled()) {
        measure();
        start();
      }
    });
    ro.observe(list);

    const onScroll = () => start();
    const onResize = () => sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    sync();

    return () => {
      io.disconnect();
      ro.disconnect();
      stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      track.style.height = '';
      list.style.transform = '';
    };
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-banner-heading"
      data-services-section
    >
      <div data-services-visual data-anim={anim} ref={visualRef}>
        <Image
          src={asset('/images/Mask%20group.webp')}
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none object-contain"
          sizes="(max-width: 1440px) 100vw, 1440px"
          data-services-photo
        />

        {/* Outline + title scale together as one unit; the outline then
            cross-fades into the photo. */}
        <div data-services-morph>
          <svg
            data-services-outline
            viewBox="0 0 210 145"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d={M_SHAPE} pathLength={1} vectorEffect="non-scaling-stroke" />
          </svg>

          <div data-services-title>
            <h2 id="services-banner-heading" className="cmwp-display text-c-white">
              Five practices.
              <br />
              One discipline.
            </h2>
          </div>
        </div>
      </div>

      <div data-services-track ref={trackRef}>
      <div data-services-pin>
      <div data-services-list>
        <article data-service-row data-reveal>
          <div data-service-meta>
            <p className="cmwp-note text-c-white">ADVISORY</p>
            <h3 className="cmwp-title text-c-white">
              Development Advisory
              <br />
              & Fee Development
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body text-c-white">
              Strategic advisory and hands-on development management across all project stages —
              from feasibility and concept through to delivery.
            </p>
            <p className="cmwp-body text-c-muted">
              We work alongside landowners, investors and corporate clients either in an advisory
              capacity or as fee developer, taking full responsibility for project execution on their
              behalf.
            </p>
          </div>
        </article>

        <article data-service-row data-reveal>
          <div data-service-meta>
            <p className="cmwp-note text-c-white">OCCUPIER</p>
            <h3 className="cmwp-title text-c-white">
              Market Entry
              <br />
              & Client Representation
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body text-c-white">
              Supporting companies entering or expanding in Cyprus — navigating the local market and
              acting exclusively on the client’s side.
            </p>
            <p className="cmwp-body text-c-muted">
              Identifying suitable premises, advising on location strategy, negotiating lease terms,
              managing due diligence and coordinating legal and regulatory requirements.
            </p>
          </div>
        </article>

        <article data-service-row data-reveal>
          <div data-service-meta>
            <p className="cmwp-note text-c-white">INVESTMENT</p>
            <h3 className="cmwp-title text-c-white">
              Investment Advisory
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body text-c-white">
              Independent advice for commercial real estate investment in Cyprus — neutral, data-led
              and strictly aligned with the investor’s mandate.
            </p>
            <p className="cmwp-body text-c-muted">
              Market analysis, asset evaluation, due diligence and transaction structuring, with
              active involvement from the earliest stages of each investment process.
            </p>
          </div>
        </article>

        <article data-service-row data-reveal>
          <div data-service-meta>
            <p className="cmwp-note text-c-white">DELIVERY</p>
            <h3 className="cmwp-title text-c-white">
              Project Management
              <br />
              & Financial-Technical Monitoring
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body text-c-white">
              Managing the full project lifecycle and delivering independent oversight to owners,
              lenders and investors.
            </p>
            <p className="cmwp-body text-c-muted">
              From brief through design, procurement, construction and handover. We also provide
              independent monitoring — tracking budgets, progress, quality compliance and reporting
              throughout development.
            </p>
          </div>
        </article>

        <article data-service-row data-reveal>
          <div data-service-meta>
            <p className="cmwp-note text-c-white">WORKPLACE</p>
            <h3 className="cmwp-title text-c-white">
              Workplace Strategy
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body text-c-white">
              Helping organisations define and create their ideal working environment, translating
              business strategy into workspace.
            </p>
            <p className="cmwp-body text-c-muted">
              Portfolio strategy, space standards, hybrid work models, change management and design
              brief development — from concept to operational workplace.
            </p>
          </div>
        </article>
      </div>
      </div>
      </div>
    </section>
  );
}
