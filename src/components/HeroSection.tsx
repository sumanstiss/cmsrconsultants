import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/community_gathering.jpg';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // CTA animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToMission = () => {
    document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Professional Overlay: Deep Blue Gradients */}
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-background" />
      </div>

      {/* Abstract Shapes for Depth */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-block mb-8">
            <span className="px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-white/10 text-secondary border border-white/20 backdrop-blur-sm">
              Social Impact Consultancy
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8 text-white opacity-0 drop-shadow-lg"
          >
            Real-Time Intelligence from the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-neon-gold">Grassroots</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 opacity-0 leading-relaxed font-light"
          >
            We empower organizations with rigorous data, human-centric stories, and actionable insights to drive sustainable social change.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-secondary text-primary text-lg font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl opacity-0"
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToMission}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 group cursor-pointer"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Discover</span>
        <div className="p-2 border border-white/20 rounded-full group-hover:border-white/50 transition-colors">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;

