import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'UNICEF', logo: 'https://www.itu.int/net4/wsis/ungis/Content/img/logos/uniform/unicef.png' },
  { name: 'Save the Children', logo: 'https://pbs.twimg.com/profile_images/1556932384280510464/ylD3BMs5_400x400.jpg' },
  { name: 'GIZ', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYHEdI1djJYk83Is_VOdyDTTcX-yO8_lkWTmFvOwH2tabpFI3YzU_oaRshwA6QdF8_iE&usqp=CAU' },
  { name: 'CARE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/CARE_Logo_Orange.png/960px-CARE_Logo_Orange.png' },
  { name: 'AIF', logo: 'https://du8ef2qvb6oy7.cloudfront.net/media/images/29d7acef-9a01-443d-87dd-d07ffc5b1068/aiflogo2x.png?fm=jpg&q=80&fit=max&crop=%2C%2C%2C&w=1000' },
  { name: 'HDFC Bank Parivartan', logo: 'https://programs.t-hub.co/wp-content/uploads/2024/02/Untitled-design-18-1-1.png' },
  { name: 'World Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/2560px-The_World_Bank_logo.svg.png' },
  { name: 'USAID', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/USAID-Identity.svg/1200px-USAID-Identity.svg.png' },
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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
  }, []);

  // Infinite scroll animation
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll('.client-logo');
    // Calculate width carefully
    const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth + 48, 0) / 2;

    gsap.to(carousel, {
      x: -totalWidth,
      duration: 40, // Slower, more elegant
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-6 relative z-10">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Trusted by Global Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Partnering with premier organizations to drive scalable social impact.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden py-8">
            <div ref={carouselRef} className="flex gap-12 items-center" style={{ width: 'max-content' }}>
              {/* Double the items for seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="client-logo flex items-center justify-center w-48 h-24 px-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
