'use client';

import type { ReactNode } from 'react';

const stats = [
  {
    headline: 'EU',
    caption: 'Regulatory and capital markets reach',
  },
  {
    headline: '15+',
    caption: (
      <>
        Years of combined real estate experience
        <br />
        across international markets
      </>
    ),
  },
  {
    headline: '100%',
    caption: (
      <>
        Independent advisory.
        <br />
        No brokerage conflicts
      </>
    ),
  },
  {
    headline: 'CY',
    caption: (
      <>
        On-the-ground delivery
        <br />
        across Cyprus
      </>
    ),
  },
] satisfies Array<{
  headline: string;
  caption: ReactNode;
}>;

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" data-about-section>
      <div data-about-copy data-reveal>
        <h2 id="about-heading" className="cmwp-headline">
          Independent thinking.
          <br />
          Local execution.
        </h2>
        <p className="cmwp-body">
          CMWP is an independent commercial real estate advisory firm based in Cyprus. We combine
          international best practice with on-the-ground market intelligence — advising landowners,
          investors, corporate occupiers and institutional clients across the full project
          lifecycle.
        </p>
      </div>

      <div data-stats-row>
        {stats.map(({ headline, caption }) => (
          <div key={headline} data-stat-cell data-reveal>
            <p className="cmwp-stat-num">{headline}</p>
            <p className="cmwp-note text-c-dark">{caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
