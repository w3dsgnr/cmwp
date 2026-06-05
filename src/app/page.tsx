import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RevealManager from '@/components/RevealManager';
import ServicesSection from '@/components/ServicesSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <RevealManager />
    </>
  );
}
