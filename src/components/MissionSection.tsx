import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import img1 from '@/assets/mission_carousel_1.jpg';
import img2 from '@/assets/mission_carousel_2.jpg';
import img3 from '@/assets/mission_carousel_3.jpg';
import img4 from '@/assets/mission_carousel_4.jpg';
import img5 from '@/assets/mission_carousel_5.jpg';
import img6 from '@/assets/mission_carousel_6.jpg';

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [img1, img2, img3, img4, img5, img6];

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = textRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden" id="mission">
      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-20 top-0 bottom-0 w-px bg-primary/10" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={textRef} className="max-w-7xl mx-auto ml-4 md:ml-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Left Column: Narrative */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-12 bg-secondary" />
                  <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Mission</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                  Driving <span className="text-secondary">Impact</span> Through Evidence & Action
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-sans">
                  <p>
                    Established in <strong className="text-primary font-bold">2011</strong>, CMSR Consultants bridges the gap between policy and people. We combine rigorous research with storytelling to amplify the voices of marginalized communities.
                  </p>
                  <p>
                    Our innovative, data-driven approach ensures that development interventions are not just theoretically sound, but practically effective where it matters most—at the grassroots.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-primary/10">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors duration-300">
                  <div className="text-3xl font-bold text-primary mb-1">24+</div>
                  <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">States Covered</div>
                </div>
                <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-colors duration-300">
                  <div className="text-3xl font-bold text-secondary mb-1">2.5L+</div>
                  <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Lives Touched</div>
                </div>
                <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors duration-300">
                  <div className="text-3xl font-bold text-accent mb-1">25K+</div>
                  <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Stakeholders</div>
                </div>
              </div>

              <div className="pt-4">
                <a href="/what-we-do" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300 group">
                  Explore Our Expertise <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Story */}
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl bg-primary">
                {/* Carousel */}
                {carouselImages.map((src, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={src}
                      alt={`CMSR Field Work ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent mix-blend-multiply" />
                  </div>
                ))}

                {/* Overlay Quote */}
                <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                  <p className="text-xl md:text-2xl font-serif italic font-light leading-relaxed">
                    "Data is just a number until it tells a story."
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pattern-dots opacity-20 z-0" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

