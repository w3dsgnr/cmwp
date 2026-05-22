'use client';

import Image from 'next/image';

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-banner-heading" data-services-section>
      <div data-services-visual>
        <Image
          src="/images/Mask%20group.png"
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none object-contain"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />

        <div data-services-title>
          <h2 id="services-banner-heading" className="cmwp-h1" style={{ color: '#fff' }}>
            Five practices.
            <br />
            One discipline.
          </h2>
        </div>
      </div>

      <div data-services-list>
        <article data-service-row>
          <div data-service-meta>
            <p className="cmwp-note" style={{ color: '#fff' }}>ADVISORY</p>
            <h3 className="cmwp-h3" style={{ fontWeight: 400, color: '#fefefe' }}>
              Development Advisory
              <br />
              & Fee Development
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body" style={{ color: '#fefefe' }}>
              Strategic advisory and hands-on development management across all project stages —
              from feasibility and concept through to delivery.
            </p>
            <p className="cmwp-body" style={{ color: '#8b8b8b' }}>
              We work alongside landowners, investors and corporate clients either in an advisory
              capacity or as fee developer, taking full responsibility for project execution on their
              behalf.
            </p>
          </div>
        </article>

        <article data-service-row>
          <div data-service-meta>
            <p className="cmwp-note" style={{ color: '#fff' }}>OCCUPIER</p>
            <h3 className="cmwp-h3" style={{ fontWeight: 400, color: '#fefefe' }}>
              Market Entry
              <br />
              & Client Representation
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body" style={{ color: '#fefefe' }}>
              Supporting companies entering or expanding in Cyprus — navigating the local market and
              acting exclusively on the client’s side.
            </p>
            <p className="cmwp-body" style={{ color: '#8b8b8b' }}>
              Identifying suitable premises, advising on location strategy, negotiating lease terms,
              managing due diligence and coordinating legal and regulatory requirements.
            </p>
          </div>
        </article>

        <article data-service-row>
          <div data-service-meta>
            <p className="cmwp-note" style={{ color: '#fff' }}>INVESTMENT</p>
            <h3 className="cmwp-h3" style={{ fontWeight: 400, color: '#fefefe' }}>
              Investment Advisory
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body" style={{ color: '#fefefe' }}>
              Independent advice for commercial real estate investment in Cyprus — neutral, data-led
              and strictly aligned with the investor’s mandate.
            </p>
            <p className="cmwp-body" style={{ color: '#8b8b8b' }}>
              Market analysis, asset evaluation, due diligence and transaction structuring, with
              active involvement from the earliest stages of each investment process.
            </p>
          </div>
        </article>

        <article data-service-row>
          <div data-service-meta>
            <p className="cmwp-note" style={{ color: '#fff' }}>DELIVERY</p>
            <h3 className="cmwp-h3" style={{ fontWeight: 400, color: '#fefefe' }}>
              Project Management
              <br />
              & Financial-Technical Monitoring
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body" style={{ color: '#fefefe' }}>
              Managing the full project lifecycle and delivering independent oversight to owners,
              lenders and investors.
            </p>
            <p className="cmwp-body" style={{ color: '#8b8b8b' }}>
              From brief through design, procurement, construction and handover. We also provide
              independent monitoring — tracking budgets, progress, quality compliance and reporting
              throughout development.
            </p>
          </div>
        </article>

        <article data-service-row>
          <div data-service-meta>
            <p className="cmwp-note" style={{ color: '#fff' }}>WORKPLACE</p>
            <h3 className="cmwp-h3" style={{ fontWeight: 400, color: '#fefefe' }}>
              Workplace Strategy
            </h3>
          </div>
          <div data-service-body>
            <p className="cmwp-body" style={{ color: '#fefefe' }}>
              Helping organisations define and create their ideal working environment, translating
              business strategy into workspace.
            </p>
            <p className="cmwp-body" style={{ color: '#8b8b8b' }}>
              Portfolio strategy, space standards, hybrid work models, change management and design
              brief development — from concept to operational workplace.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
