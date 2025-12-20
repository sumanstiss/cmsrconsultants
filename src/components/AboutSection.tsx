import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  Heart,
  Lightbulb,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Globe, label: 'Research' },
  { icon: Users, label: 'Communication' },
  { icon: TrendingUp, label: 'Strategy' },
  { icon: BookOpen, label: 'Training' },
  { icon: Heart, label: 'Social Impact' },
  { icon: Lightbulb, label: 'Innovation' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    // Image animation
    gsap.fromTo(
      image,
      { opacity: 0, x: -100, rotate: -5 },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content animation
    gsap.fromTo(
      content,
      { opacity: 0, x: 100, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Skills stagger animation
    gsap.fromTo(
      '.skill-icon',
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 right-0 opacity-30" />
      <div className="glow-orb glow-orb-gold w-[300px] h-[300px] bottom-20 -left-20 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative">
              {/* Glassmorphic frame */}
              <div className="glass-card p-4 rounded-full aspect-square max-w-md mx-auto overflow-hidden group">
                <img
                  src="https://cmsrconsultants.com/img/slider1.jpg"
                  alt="CMSR Team at work"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 -m-4 border-2 border-secondary/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-0 -m-8 border border-primary/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>

            {/* Stats badge */}
            <div className="absolute -bottom-4 -right-4 glass-card px-6 py-4">
              <div className="text-3xl font-bold text-secondary">25+</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <div className="inline-block mb-6">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-secondary">
                About CMSR
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Creating a Better-Informed{' '}
              <span className="text-gradient-neon">World</span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg">
              <p>
                <span className="text-foreground font-semibold">Vision:</span> To
                create a better-informed, educated, and aware world.
              </p>
              <p>
                <span className="text-foreground font-semibold">Mission:</span> To
                catalyse the power of research and communication for social equity
                and progressive change.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 gap-4 mt-12">
              {skills.map((skill, index) => (
                <div
                  key={skill.label}
                  className="skill-icon glass-card p-4 text-center group cursor-pointer opacity-0"
                >
                  <skill.icon className="w-8 h-8 mx-auto mb-2 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
