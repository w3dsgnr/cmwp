'use client';

import Image from 'next/image';

export default function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" aria-labelledby="contact-heading" data-contact-section>
      <div data-contact-intro>
        <h2 id="contact-heading" className="cmwp-h3">
          Start a conversation.
          <br />
          We’ll take it from there.
        </h2>
      </div>

      <div aria-hidden="true" data-contact-bg-wrap>
        <Image
          src="/images/Frame%20120.png"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />
      </div>

      <div data-contact-card-wrap>
        <div data-contact-card>
          <article data-contact-block>
            <div data-contact-label-stack>
              <p className="cmwp-note" style={{ color: '#171616' }}>OFFICE</p>
              <p className="cmwp-h2" style={{ fontWeight: 600 }}>
                Nicosia, Cyprus
              </p>
            </div>
            <p className="cmwp-body" style={{ color: '#171616' }}>{`Grigori Afxentiou, 42A, 'Egkomi  2407, Lefkosia, Cy`}</p>
          </article>

          <article data-contact-block>
            <div data-contact-label-stack>
              <p className="cmwp-note" style={{ color: '#171616' }}>Mail</p>
              <a className="tap-target cmwp-h2" href="mailto:hello@cmwp.eu" style={{ fontWeight: 600 }}>
                hello@cmwp.eu
              </a>
            </div>
            <p className="cmwp-body" style={{ color: '#171616' }}>Reply within 1 business day · English</p>
          </article>

          <article data-contact-block>
            <div data-contact-label-stack>
              <p className="cmwp-note" style={{ color: '#171616' }}>DIRECT</p>
              <a className="tap-target cmwp-h2" href="tel:+35796769786" style={{ fontWeight: 600 }}>
                +357 96 769 786
              </a>
            </div>
            <p className="cmwp-body" style={{ color: '#171616' }}>Monday to Friday, 09:00 - 18:00 EET · English</p>
          </article>
        </div>
      </div>

      <footer data-contact-footer-bar>
        <p className="cmwp-footer-tiny">© {year} CMWP</p>
        <a data-contact-footer-logo className="tap-target" href="#main" aria-label="CMWP home">
          <img data-logo-full src="/images/logo%20full.svg" alt="CMWP" />
        </a>
        <p className="cmwp-footer-tiny">All rights reserved</p>
      </footer>
    </section>
  );
}
