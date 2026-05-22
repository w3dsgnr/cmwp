'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" data-hero-section>
      <div data-hero-stack>
        <h1 id="hero-heading" className="cmwp-h2 tracking-tight leading-none" data-hero-heading>
          <span className="block">We help businesses make </span>
          <span className="block">the right real estate decisions — with international expertise </span>
          <span className="block">and local precision.</span>
        </h1>
      </div>

      <p className="cmwp-body" data-hero-sub>
        CMWP is an independent advisory firm helping landowners, investors, occupiers and
        corporate clients navigate commercial real estate in Cyprus — from strategy through to
        delivery.
      </p>

      <div data-hero-watermark aria-hidden="true" className="pointer-events-none">
        <img src="/cmwp/images/logo_short.svg" alt="" className="size-full max-w-none" />
      </div>

      <div data-hero-image-wrap>
        <Image
          src="/images/Frame%20119.png"
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
