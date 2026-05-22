'use client';

import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767.98) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollYRef.current;
      const passedHeader = currentScrollY > 120;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);

      if (isMobileMenuOpen) {
        setIsHiddenOnScroll(false);
      } else if (delta > 6) {
        if (scrollingDown && passedHeader) {
          setIsHiddenOnScroll(true);
        } else {
          setIsHiddenOnScroll(false);
        }
      }

      if (currentScrollY < 24) {
        setIsHiddenOnScroll(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-site-header-wrap
      data-menu-open={isMobileMenuOpen}
      data-header-hidden={isHiddenOnScroll}
    >
      <div data-site-header-inner>
        <a data-site-logo className="tap-target" href="#main" aria-label="CMWP home">
          <img data-logo-full src="/images/logo%20full.svg" alt="CMWP" />
        </a>

        <nav data-site-header-nav aria-label="Primary">
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#about" onClick={handleNavClick}>
            About
          </a>
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#services" onClick={handleNavClick}>
            Services
          </a>
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#contact" onClick={handleNavClick}>
            Contact
          </a>
        </nav>

        <a className="tap-target site-cta" data-site-cta-desktop href="#contact" aria-label="Get in touch">
          <span className="cap-trim whitespace-nowrap">Get in touch</span>
          <span aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          className="tap-target"
          data-site-menu-toggle
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-header-panel"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span data-site-menu-toggle-icon aria-hidden="true">
            {isMobileMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      <div data-site-header-panel id="mobile-header-panel" aria-hidden={!isMobileMenuOpen}>
        <nav data-site-header-nav-mobile aria-label="Primary mobile">
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#about" onClick={handleNavClick}>
            About
          </a>
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#services" onClick={handleNavClick}>
            Services
          </a>
          <a className="cmwp-nav-link" style={{ color: '#171616' }} href="#contact" onClick={handleNavClick}>
            Contact
          </a>
        </nav>

        <a className="tap-target site-cta" data-site-cta-mobile href="#contact" aria-label="Get in touch">
          <span className="cap-trim whitespace-nowrap">Get in touch</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
