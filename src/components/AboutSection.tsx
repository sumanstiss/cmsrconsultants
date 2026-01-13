import { useEffect, useRef, useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Globe,
    label: 'Research',
    title: 'RESEARCH, MONITORING & EVALUATION',
    content: `Research and Monitoring & Evaluation constitute one of the core areas of CMSR Consultants. We provide broad based consultancy in the domains of Social Research, Policy Research, Market Research, Communication Research, Formative Research, Surveys and exit polls etc. The Core Research team comes from diverse disciplines – Sociology, Economics, Agriculture, Geography, Disaster Management etc. There is an extensive network of field executives, supervisors and managers to conduct any large scale research or evaluation study in any part of the country.`,
    services: [
      'Evaluation Studies',
      'Impact Assessment',
      'Baseline/ Midline/Endline Surveys',
      'Process Monitoring',
      'Formative Research',
      'Feasibility Studies',
      'Need Assessment'
    ]
  },
  {
    icon: Users,
    label: 'Communication',
    title: 'COMMUNICATION AND BRANDING',
    content: `CMSR Consultants offer Innovative and integrated communication solutions matched by a provocative approach and irresistible creative work. Over the years, the team has worked on several pan-India studies and campaigns launched by national and international organizations. We have an in-house design and branding team to deliver quality work in a time-bound manner. In addition, more than 50 production houses are empanelled with us for audio-visual material production viz corporate films, documentaries, project documentation, radio and tv campaigns etc.`,
    services: [
      'Pre-testing of development communication concepts and material',
      'Developing IEC / BCC campaigns and communication material',
      'Documentation of projects and Best Practices',
      'Production of audio-visual communication material',
      'Translation and Transcription'
    ]
  },
  {
    icon: TrendingUp,
    label: 'Strategy',
    title: 'STRATEGY & CONSULTING',
    content: `CMSR Consultants provides strategic consulting services to help organizations achieve their goals through evidence-based decision making and innovative approaches. Our strategy team combines research insights with practical implementation frameworks.`,
    services: [
      'Strategic Planning',
      'Policy Development',
      'Program Design',
      'Stakeholder Engagement',
      'Impact Strategy'
    ]
  },
  {
    icon: BookOpen,
    label: 'Training',
    title: 'TRAINING & CAPACITY BUILDING',
    content: `Capacity Building, Training and Skills Development forms an integral part of any organizational or programmatic plan. CMSR Consultants has a team of senior technical trainers, consultants and advisors to carry out training and capacity building sessions and workshops on a variety of subjects in both rural and urban areas.`,
    services: [
      'Media (National and Regional)',
      'PRI representatives, anganwadi workers, frontline health workers',
      'Community Based Organisations (CBOs) and Non- Governmental Organisations',
      'NGOs working in water and sanitation, rural development, child rights and related sectors',
      'State, district and block level government officials',
      'Development communication professionals'
    ]
  },
  {
    icon: Heart,
    label: 'Social Impact',
    title: 'SOCIAL IMPACT & OUTREACH',
    content: `CMSR Consultants provides logistic, creative and documentation support to organize advocacy events, workshops, seminars and Consultation Forums. We provide event management support on Pan-India basis.`,
    services: [
      'Media Advocacy Programmes',
      'Consultation meets with PRI representatives, anganwadi workers, frontline health workers',
      'Consultation meets with Community Based Organisations (CBOs) and Non- Governmental Organisations',
      'Round Tables with State, district and block level government officials',
      'Open Forums with farmers, youth, women groups and school children'
    ]
  },
  {
    icon: Lightbulb,
    label: 'Innovation',
    title: 'INNOVATION & EVENT MANAGEMENT',
    content: `CMSR Consultants provides logistic, creative and documentation support to organize advocacy events, workshops, seminars and Consultation Forums. We provide event management support on Pan-India basis.`,
    services: [
      'Event Management support for Media Advocacy Programmes',
      'Workshops and Seminars',
      'Consultation Forums',
      'Creative Documentation',
      'Logistic Support'
    ]
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


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
                Our Expertise
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Solutions for{' '}
              <span className="text-gradient-neon">Social Impact</span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg mb-12">
              <p>
                We bring together a multi-disciplinary team of researchers, strategists, and communicators to deliver holistic solutions across the development spectrum.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 gap-4 mt-12">
              {skills.map((skill, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={skill.label}
                    className="skill-icon glass-card text-center group cursor-pointer opacity-0 relative overflow-hidden transition-all duration-300"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div className="p-4">
                      <skill.icon className="w-8 h-8 mx-auto mb-2 text-secondary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs font-medium text-foreground block mb-2">
                        {skill.label}
                      </span>
                    </div>

                    {/* Hover Preview - Quarter way expansion */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isHovered ? '100px' : '0px',
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <div className="px-4 pb-3 text-left border-t border-border/20 pt-2">
                        <p className="text-[9px] leading-relaxed text-muted-foreground line-clamp-3">
                          {skill.content.substring(0, 120)}...
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Popup Dialog */}
            <Dialog open={!!selectedSkill} onOpenChange={(open) => {
              if (!open) {
                setSelectedSkill(null);
              }
            }}>
              <DialogContent
                className="max-w-2xl max-h-[85vh] overflow-y-auto glass-card border-border/50 cursor-default"
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  willChange: 'auto',
                }}
              >
                {selectedSkill && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-secondary/20">
                          <selectedSkill.icon className="w-6 h-6 text-secondary" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-foreground">
                          {selectedSkill.title}
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {selectedSkill.content}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-foreground">Services:</h4>
                        <ul className="space-y-2">
                          {selectedSkill.services.map((service, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-secondary mr-2 mt-1 flex-shrink-0">•</span>
                              <span className="leading-relaxed">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
