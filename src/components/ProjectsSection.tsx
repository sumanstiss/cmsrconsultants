import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Agriculture & Livelihoods',
    description: 'Empowering rural communities through sustainable agricultural practices and livelihood enhancement programs.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    tags: ['Research', 'Training'],
  },
  {
    id: 2,
    title: 'Education & Skill Development',
    description: 'Building capacities for a skilled and educated workforce through innovative learning solutions.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    tags: ['Communication', 'Capacity Building'],
  },
  {
    id: 3,
    title: 'Health & Nutrition',
    description: 'Improving health outcomes through evidence-based research and strategic communication.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    tags: ['Research', 'Strategy'],
  },
  {
    id: 4,
    title: 'Environment & Climate',
    description: 'Addressing environmental challenges through sustainable development initiatives.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    tags: ['Policy', 'Advocacy'],
  },
  {
    id: 5,
    title: 'WASH Initiatives',
    description: 'Water, Sanitation and Hygiene programs for community health and wellbeing.',
    image: 'https://images.unsplash.com/photo-1541544741670-1b8ee8b86a30?w=800&q=80',
    tags: ['Implementation', 'Training'],
  },
  {
    id: 6,
    title: 'Urban Planning',
    description: 'Strategic urban development and public policy research for sustainable cities.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    tags: ['Research', 'Policy'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Header animation
    gsap.fromTo(
      '.projects-header',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cards stagger animation
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-scroll',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb glow-orb-accent w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-4 block">
              Our Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient-accent">Projects</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="glass-card p-4 hover:border-secondary/40 transition-all duration-300 group"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="glass-card p-4 hover:border-secondary/40 transition-all duration-300 group"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="projects-scroll flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-none w-[320px] md:w-[400px] snap-start opacity-0"
            >
              <div className="glass-card overflow-hidden group h-full">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass px-3 py-1 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <button className="flex items-center gap-2 text-sm font-medium text-secondary group/btn">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
