import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import indiaMap from '@/assets/India_map.svg';

gsap.registerPlugin(ScrollTrigger);

const OurPresence = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section header
    gsap.fromTo(
      sectionRef.current.querySelector('.section-header'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Animate map
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // Animate counter
    gsap.fromTo(
      counterRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  // Counter animation
  useEffect(() => {
    if (!counterRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to({}, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            setCount(Math.floor(progress * 25));
          },
          onComplete: () => setCount(25),
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Our Reach
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Presence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expanding our impact across India, one state at a time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Section */}
          <div ref={mapRef} className="relative">
            <div className="glass-card p-8 rounded-3xl overflow-hidden">
              <div className="relative w-full aspect-square">
                <img
                  src={indiaMap}
                  alt="India Map - Our Presence"
                  className="w-full h-full object-contain transition-all duration-500"
                  style={theme === 'light' ? { 
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(194deg) brightness(104%) contrast(97%)'
                  } : {}}
                />
                {/* Overlay glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Counter Section */}
          <div ref={counterRef} className="flex flex-col items-center lg:items-start">
            <div className="glass-card p-8 md:p-12 text-center lg:text-left max-w-md">
              <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <MapPin size={32} />
              </div>
              <div className="text-6xl md:text-7xl font-bold text-foreground mb-4">
                {count}+
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-2">
                States Covered
              </div>
              <p className="text-muted-foreground text-base mt-4">
                Our extensive network spans across multiple states, enabling us to create meaningful social impact nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPresence;
