'use client';

import Image from 'next/image';

import { asset } from '@/lib/asset';

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" data-hero-section>
      <div data-hero-stack>
        <h1 id="hero-heading" className="cmwp-headline tracking-tight leading-none" data-hero-heading data-reveal>
          <span className="block">We help businesses make </span>
          <span className="block">the right real estate decisions — with international expertise </span>
          <span className="block">and local precision.</span>
        </h1>
      </div>

      <div data-hero-sub-row>
        <p className="cmwp-body" data-hero-sub data-reveal>
          CMWP is an independent advisory firm helping landowners, investors, occupiers and
          corporate clients navigate commercial real estate in Cyprus — from strategy through to
          delivery.
        </p>

        <div data-hero-watermark aria-hidden="true" className="pointer-events-none">
          <img src={asset('/images/logo_short.svg')} alt="" className="size-full max-w-none" />
        </div>
      </div>

      <div data-hero-image-wrap>
        <Image
          src={asset('/images/Frame%20119.webp')}
          alt="Contemporary commercial building façade"
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 1440px) 100vw, 1312px"
          priority
        />
      </div>
    </section>
  );
}
