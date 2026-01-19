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
      { opacity: 0, y: 30 },
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
      { opacity: 0, scale: 0.95 },
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
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
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
          duration: 2.5,
          ease: 'power1.out',
          onUpdate: function () {
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
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#093C73 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-secondary/10 text-secondary mb-4">
            Our Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Our Presence
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Expanding our impact across India, delivering real-time intelligence from the grassroots to drive meaningful change.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Map Section */}
          <div ref={mapRef} className="relative group">
            <div className="relative z-10 p-4 bg-white rounded-3xl shadow-xl border border-gray-100 transition-shadow duration-500 group-hover:shadow-2xl">
              <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                <img
                  src={indiaMap}
                  alt="India Map - Our Presence"
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    // Filter to match #093C73 (Deep Blue) approximately
                    filter: 'invert(18%) sepia(35%) saturate(3665%) hue-rotate(198deg) brightness(92%) contrast(93%)'
                  }}
                />
              </div>
            </div>
            {/* Decorative blob behind map */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-[2.5rem] blur-2xl -z-10" />
          </div>

          {/* Counter Section */}
          <div ref={counterRef} className="flex flex-col items-center lg:items-start space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl rounded-tl-none border border-slate-100 w-full max-w-md hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/20 group">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/5 group-hover:bg-primary/10 shadow-sm flex items-center justify-center text-primary shrink-0 transition-colors">
                  <MapPin size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-7xl font-bold text-primary tracking-tight font-serif drop-shadow-sm">
                      {count}
                    </span>
                    <span className="text-4xl font-bold text-secondary">+</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mt-2">States Covered</h3>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our extensive network spans across the nation, enabling us to gather local insights and implement scalable solutions in diverse environments.
                </p>
              </div>
            </div>

            {/* Additional Stat or Callout */}
            <div className="flex items-center gap-4 text-primary/80 font-medium">
              <div className="h-px w-12 bg-secondary" />
              <span>Pan-India Network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPresence;
