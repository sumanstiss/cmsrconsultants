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

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.client-card'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  // Infinite scroll animation
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll('.client-card');
    const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth + 24, 0) / 2;

    gsap.to(carousel, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="section-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Trusted Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Clients
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Partnering with leading organizations to create meaningful social impact
          </p>
        </div>

        {/* Frosted glass carousel container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden py-4">
            <div ref={carouselRef} className="flex gap-6" style={{ width: 'max-content' }}>
              {/* Double the items for seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="client-card glass-card p-6 w-40 h-40 flex items-center justify-center group hover:scale-105 transition-all duration-500"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
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
