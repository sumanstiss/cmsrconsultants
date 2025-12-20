import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

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

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background with Spline Iframe */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/futuristicmapinterface-nhKt2kLYqLfhoij6ViFC32cj/"
          frameBorder="0"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="3D Background"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Floating Orbs */}
      <div className="hero-orb glow-orb w-[400px] h-[400px] -top-20 -left-20 opacity-60" />
      <div className="hero-orb glow-orb glow-orb-accent w-[300px] h-[300px] top-1/4 -right-10 opacity-50" />
      <div className="hero-orb glow-orb glow-orb-gold w-[200px] h-[200px] bottom-1/4 left-1/4 opacity-40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Tag */}
          <div className="inline-block mb-6">
            <span className="glass-card px-6 py-2 text-xs font-medium tracking-[0.2em] uppercase text-secondary inline-block">
              Social Impact Consultancy
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 opacity-0"
          >
            At CMSR We Deliver{' '}
            <span className="text-gradient-accent">Best in Class</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0"
          >
            Catalyzing the power of research and communication for social equity and progressive change.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-card hover:border-secondary/40 px-10 py-5 text-lg font-medium cursor-pointer opacity-0 group inline-flex items-center gap-3"
          >
            Contact Us
            <span className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
