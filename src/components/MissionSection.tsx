import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/hooks/use-theme';
import { ArrowRight, BarChart3, MessageSquare, GraduationCap, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 's1',
    title: 'Research & Evaluation',
    subtitle: 'Evidence-driven decisions',
    short: 'Independent & policy research, evaluations, M&E, baselines, feasibility studies and market research.',
    long: 'Research and Evaluation constitute one of the core areas of CMSR Consultants. We provide broad based consultancy in the domains of Social Research, Policy Research, Market Research, Communication Research, Formative Research, Surveys,  Exit Polls, etc. Additionally, CMSR is well-equipped to conduct independent research, with experts in quantitative and qualitative research methods, as well as a robust network of surveyors and data collectors across the country. We are updated with the latest technologies in social research, and use CAPI, SPSS, STATA, ATLASti, etc. in our research, based on the project’s requirements.',
    icon: BarChart3,
  },
  {
    id: 's2',
    title: 'Integrated Communications',
    subtitle: 'From concept to impact',
    short: 'IEC/BCC campaigns, audio-visual production, documentation and strategic storytelling for behaviour change.',
    long: 'We offer innovative and integrated communication solutions matched by a provocative approach and irresistible creative work. Over the years, the team has worked on several pan-India studies and campaigns launched by national and international organisations. We have an in-house design and branding team to deliver quality work in a time-bound manner. Additionally, more than 50 production houses are empanelled with us for audio-visual material production viz corporate films, documentaries, project documentation, radio and tv campaigns, etc.',
    icon: MessageSquare,
  },
  {
    id: 's3',
    title: 'Training & Capacity Building',
    subtitle: 'Contextual, hands-on learning',
    short: 'Sector-specific training, stakeholder engagement, and practical workshops for officials, frontline workers, and communities.',
    long: 'CMSR Consultants has a team of senior technical trainers, consultants and advisors to carry out training and capacity building sessions and workshops on a variety of subjects in both rural and urban areas. Through our extensive work on ground and engagement of stakeholders, we are well positioned to provide logistic, creative and documentation support to organize advocacy events, workshops, seminars and consultation forums.',
    icon: GraduationCap,
  },
  {
    id: 's4',
    title: 'Project Management',
    subtitle: 'Adaptive & accountable delivery',
    short: 'Project planning, stakeholder coordination, monitoring frameworks and adaptive management.',
    long: 'Our expertise spans end-to-end project planning, stakeholder coordination, monitoring frameworks, and adaptive management approaches. We combine analytical rigor with on-ground agility to deliver sustainable and scalable impact.',
    icon: Settings,
  },
];

const carouselImages = [
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800', // Women meeting
  'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800', // Group discussion
  'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5afa?auto=format&fit=crop&q=80&w=800', // Rural field work
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800', // Meeting
];

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { theme } = useTheme();

  // Carousel Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header animation
    gsap.fromTo(
      section.querySelector('.mission-header'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // Content fade in
    gsap.fromTo(
      section.querySelectorAll('.fade-in-up'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = activeService.icon;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">

          {/* LEFT COLUMN: Services Interface (75% Width) */}
          <div className="lg:w-3/4 flex flex-col">
            <div className="mission-header mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-secondary"></span>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                End-to-end solutions from  <br className="hidden md:block" />
                <span className="text-secondary">research to communication and training</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 flex-1">
              {/* Service List (Buttons) */}
              <div className="md:w-1/3 flex flex-col gap-3 fade-in-up">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`text-left p-5 rounded-xl transition-all duration-300 border hover:shadow-md ${activeServiceId === service.id
                      ? 'bg-primary text-white border-primary translate-x-2'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-slate-50'
                      }`}
                  >
                    <div className="font-bold text-lg mb-1 font-serif">{service.title}</div>
                    <div className={`text-xs ${activeServiceId === service.id ? 'text-blue-200' : 'text-slate-400'}`}>
                      {service.subtitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Service Details Box */}
              <div className="md:w-2/3 fade-in-up">
                <div className="h-full bg-white rounded-2xl p-8 border border-slate-100 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                        <ActiveIcon size={32} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-primary mb-3">
                        {activeService.title}
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        {activeService.long}
                      </p>
                    </div>

                    <Link
                      to="/what-we-do"
                      className="inline-flex items-center text-secondary font-bold hover:gap-2 transition-all duration-300 group/link"
                    >
                      Explore Details <ArrowRight size={18} className="ml-2 group-hover/link:ml-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Carousel (25% Width) */}
          <div className="lg:w-1/4 relative lg:pl-6 fade-in-up">
            <div className="h-[500px] w-full relative rounded-2xl overflow-hidden shadow-2xl bg-primary">
              {/* Carousel */}
              {carouselImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={src}
                    alt="CMSR Field Work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                </div>
              ))}

              {/* Overlay Quote */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                <p className="text-lg font-serif italic font-light leading-relaxed">
                  "There is nothing we can't do."
                </p>
              </div>
            </div>

            {/* Stats underneath carousel */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-secondary">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">States Covered</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-primary">
                <div className="text-3xl font-bold text-primary">14+</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Years of Impact</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionSection;
