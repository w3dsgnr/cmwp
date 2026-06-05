'use client';

import Image from 'next/image';

import { asset } from '@/lib/asset';

export default function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" aria-labelledby="contact-heading" data-contact-section>
      <div data-contact-inner>
        <div data-contact-intro data-reveal>
          <h2 id="contact-heading" className="cmwp-title">
            Start a conversation.
            <br />
            We’ll take it from there.
          </h2>
        </div>

        <div data-contact-stage>
          <div aria-hidden="true" data-contact-bg>
            <Image
              src={asset('/images/Frame%20120.webp')}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>

          <div data-contact-card data-reveal>
            <article data-contact-block>
              <div data-contact-label-stack>
                <p className="cmwp-note text-c-dark">OFFICE</p>
                <p className="cmwp-headline">
                  Nicosia, Cyprus
                </p>
              </div>
              <p className="cmwp-body text-c-dark">{`Grigori Afxentiou, 42A, Egkomi 2407, Lefkosia, Cy`}</p>
            </article>

            <article data-contact-block>
              <div data-contact-label-stack>
                <p className="cmwp-note text-c-dark">Mail</p>
                <a className="tap-target cmwp-headline" href="mailto:hello@cmwp.eu">
                  hello@cmwp.eu
                </a>
              </div>
              <p className="cmwp-body text-c-dark">Reply within 1 business day · English</p>
            </article>

            <article data-contact-block>
              <div data-contact-label-stack>
                <p className="cmwp-note text-c-dark">DIRECT</p>
                <a className="tap-target cmwp-headline" href="tel:+35796769786">
                  +357 96 769 786
                </a>
              </div>
              <p className="cmwp-body text-c-dark">Monday to Friday, 09:00 - 18:00 EET · English</p>
            </article>
          </div>
        </div>

        <footer data-contact-footer-bar data-reveal>
          <p className="cmwp-footer-tiny">© {year} CMWP</p>
          <a data-contact-footer-logo className="tap-target" href="#main" aria-label="CMWP home">
            <img data-logo-full src={asset('/images/logo%20full.svg')} alt="CMWP" />
          </a>
          <p className="cmwp-footer-tiny">All rights reserved</p>
        </footer>
      </div>
    </section>
  );
}
