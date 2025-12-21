import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';
import OurPresence from '@/components/OurPresence';
import ClientsSection from '@/components/ClientsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    });
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  return (
    <>
      <title>CMSR Consultants | Social Impact Consultancy</title>
      <meta
        name="description"
        content="CMSR Consultants - Catalyzing the power of research and communication for social equity and progressive change."
      />

      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      <div
        ref={mainRef}
        className={`min-h-screen ${isLoading ? 'opacity-0' : ''}`}
      >
        <Navigation />
        <main>
          <HeroSection />
          <StatsCounter />
          <AboutSection />
          <OurPresence />
          <ClientsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
