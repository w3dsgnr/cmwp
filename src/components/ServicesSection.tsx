'use client';

import Image from 'next/image';

import { asset } from '@/lib/asset';

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-banner-heading" data-services-section>
      <div data-services-visual>
        <Image
          src={asset('/images/Mask%20group.webp')}
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none object-contain"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />

        <div data-services-title>
          <h2 id="services-banner-heading" className="cmwp-display text-c-white" data-reveal>
            Five practices.
            <br />
            One discipline.
          </h2>
        </div>
      </div>

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
    </section>
  );
}
