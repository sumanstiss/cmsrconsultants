import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/Hero_Gajendra.png';
import heroInterview from '@/assets/Hero_Interview.jpg';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    id: 1,
    title: 'Excellence',
    subtitle: 'We empower organizations with rigorous data, human-centric stories, and actionable insights to drive sustainable social change.',
    gradient: 'from-secondary to-neon-gold',
    zIndex: 'z-30',
    image: heroImage
  },
  {
    id: 2,
    title: 'Change',
    subtitle: 'Partnering with visionaries to transform improved livelihoods and build resilient communities for a better future.',
    gradient: 'from-purple-400 to-pink-400',
    zIndex: 'z-20',
  }
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Use a strictly defined type for the ref array to allow GSAP access
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%', // Scroll distance = 1x height for 2 slides (1 transition)
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animation: Peel off Slide 1

      // Slide 1 moves up (full duration)
      tl.to(slidesRef.current[0], {
        yPercent: -50,
        duration: 1,
        ease: 'none'
      }, 0);

      // Slide 1 fades out (starts at 70%)
      tl.to(slidesRef.current[0], {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.3,
        ease: 'none'
      }, 0.7);

      // Slide 2 stays (it's the last one)

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToMission = () => {
    // Scroll past the pinned section
    const mission = document.querySelector('#mission');
    if (mission) {
      mission.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Scroll Down Indicator (Fixed relative to the container) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <button
          onClick={scrollToMission}
          className="flex flex-col items-center gap-3 text-[#1e3a8a]/80 hover:text-[#1e3a8a] transition-colors duration-300 pointer-events-auto cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium drop-shadow-md">Scroll</span>
          <div className="p-2 border border-[#1e3a8a]/30 rounded-full bg-[#1e3a8a]/5 backdrop-blur-sm">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>

      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          ref={el => { slidesRef.current[index] = el; }}
          className={`absolute inset-0 w-full h-full flex items-center justify-center ${slide.zIndex} bg-cover bg-center`}
        >
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6">
            {slide.id === 2 ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 h-full">
                {/* Video Section - Left 1/3 */}
                <div className="w-full md:w-1/3 flex flex-col gap-4 order-2 md:order-1 animate-fade-in-up">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 backdrop-blur-sm">
                    <iframe
                      src="https://www.youtube.com/embed/dpb4AGT684U?si=boHibtCe4ShYbBsP"
                      title="CMSR Consultants Video"
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-[#1e3a8a] text-sm font-medium tracking-wide bg-white/50 backdrop-blur-md p-3 rounded-lg border border-[#1e3a8a]/10">
                    Driving social impact through data-driven strategies.
                  </p>
                </div>

                {/* Text Content - Right */}
                <div className="w-full md:w-1/2 order-1 md:order-2 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="h-px w-12 bg-secondary" />
                      <span className="text-secondary font-bold tracking-widest uppercase text-sm">About CMSR Consultants</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1e3a8a] leading-tight">
                      Driving <span className="text-secondary">Impact</span> Through Evidence & Action
                    </h2>

                    <div className="space-y-6 text-lg text-[#1e3a8a]/80 leading-relaxed font-sans text-justify">
                      <p>
                        Established in <strong className="text-[#1e3a8a] font-bold">2011</strong>, CMSR Consultants is a leading research and communication
                        consultancy dedicated to creating positive social impact. We combine rigorous research methodologies with innovative communication strategies to drive meaningful change. With pan-India presence and a network of 100+ production partners, we have successfully delivered projects across 25+ states and union territories, engaging over 3 lakh individuals and training more than 30,000 stakeholders.
                      </p>
                    </div>

                    {/* Vision Section */}
                    <div className="pt-4 border-t border-[#1e3a8a]/10">
                      <h3 className="text-xl font-bold text-[#1e3a8a] mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                        Vision
                      </h3>
                      <p className="text-[#1e3a8a]/80 text-lg leading-relaxed pl-4 border-l-2 border-secondary/20 font-light italic">
                        "To create a better-informed, educated, and aware world."
                      </p>
                    </div>

                    {/* Mission Section */}
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-[#1e3a8a] mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                        Mission
                      </h3>
                      <p className="text-[#1e3a8a]/80 text-lg leading-relaxed pl-4 border-l-2 border-secondary/20 font-light italic">
                        "To catalyse the power of research and communication for social equity and progressive change."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Layout for Slide 1 */
              <div className="max-w-4xl ml-auto text-right">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8 text-[#1e3a8a] drop-shadow-2xl">
                  At CMSR we deliver{' '}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient}`}>
                    {slide.title}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-[#1e3a8a] max-w-2xl ml-auto mb-12 leading-relaxed font-light drop-shadow-md">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <div className="flex justify-end">
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-4 bg-secondary/90 text-primary text-lg font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-md"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
