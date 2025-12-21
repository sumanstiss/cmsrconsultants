import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  details?: string[];
  image: string;
  tags: string[];
}

const projects = [
  {
    id: 1,
    title: 'Agriculture & Livelihood',
    description: 'Empowering rural communities through sustainable agricultural practices and livelihood enhancement programs. Our comprehensive work includes baseline studies, value chain analysis, climate-smart farming initiatives, feasibility studies, and market linkages for smallholders across multiple states.',
    details: [
      'Baseline Study: Mobilizing MGNREGA - A High Impact Collaborative Water Security Programme in Jharkhand',
      'Value Chain Gap Analysis: Three Agri-Commodities in Kalahandi District, Odisha',
      'Impact Assessment: Godhan Program in 14 districts of Maharashtra, Bihar and Uttar Pradesh',
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    tags: ['Research', 'Training', 'Market Development', 'Value Chain Analysis', 'Evaluation'],
  },
  {
    id: 2,
    title: 'Environment & Climate Change',
    description: 'Addressing environmental challenges through sustainable development initiatives. We focus on air pollution, renewable energy, climate adaptation, and sustainable transportation solutions.',
    details: [
      'Perception Survey: Air Quality in 17 Cities of 12 States (5000 respondents)',
      'Scoping Study: Campaigns on Renewable (Solar) Energy in Farm and Health Care Centres in 6 Districts of Bihar',
      'Baseline Study: Knowledge, Attitude & Behaviour on Delhi Women Construction Workers + Air Pollution',
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    tags: ['Policy', 'Advocacy', 'Research', 'Air Quality', 'Renewable Energy'],
  },
  {
    id: 3,
    title: 'Health and Nutrition',
    description: 'Improving health outcomes through evidence-based research and strategic communication. Our programs focus on maternal and child nutrition, adolescent health, community nutrition gardens, and health systems assessment.',
    details: [
      'Endline Evaluation: Kanya Sampurna Project (KSP) in Cuddalore District, Tamil Nadu (89,242 individuals reached)',
      'Assessment: Pradhan Mantri Arogya Mitra (PMAM) under PMJAY Scheme in 9 States',
      'Impact Assessment: Reliance Nutrition Gardens (RNGs) under RJMCHNM program in Maharashtra',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    tags: ['Research', 'Strategy', 'Communication', 'Evaluation', 'Nutrition'],
  },
  {
    id: 4,
    title: 'Gender',
    description: 'Promoting gender equality and women\'s empowerment through research, advocacy, and capacity building programs. We work on gender diversity, value chain analysis, and women\'s empowerment in agriculture.',
    details: [
      'Gender Diversity Survey: Diagnostic study for JCB at Ballabhgarh, Jaipur and Pune',
      'Gender Analysis: Red Chilli Value Chains in Kerala, Tamil Nadu and Telangana',
      'Study: Analysis and Recommendations to Improve Gender Equality in Barley Value Chains',
    ],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    tags: ['Research', 'Advocacy', 'Training', 'Value Chain Analysis', 'Gender Mainstreaming'],
  },
  {
    id: 5,
    title: 'Education & Skill Development',
    description: 'Building capacities for a skilled and educated workforce through innovative learning solutions. Our programs include early childhood development, youth livelihood programs, skill development, and education quality improvement.',
    details: [
      'Impact Evaluation: J.P.Morgan - Don Bosco Academy for Skills in 8 States',
      'Baseline Study: "Neev" Project in 100 AWCs of Udham Singh Nagar District, Uttarakhand',
      'Market Assessment: Magic Bus\' Youth Livelihood Programme',
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    tags: ['Communication', 'Capacity Building', 'Training', 'Evaluation', 'ECD'],
  },
  {
    id: 6,
    title: 'Child Rights',
    description: 'Protecting and promoting children\'s rights through research, advocacy, and program implementation. We focus on child protection, education rights, child participation, and disaster resilience for children.',
    details: [
      'Media Collective for Child Rights (MCCR): Collaborative effort with UNICEF State Office, Chhattisgarh',
      'Study: Chennai Floods and Children\'s Resiliency',
      'End-line Evaluation: Child Rights studies in three districts of Uttar Pradesh',
    ],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    tags: ['Research', 'Advocacy', 'Implementation', 'Media Engagement', 'Disaster Resilience'],
  },
  {
    id: 7,
    title: 'WASH',
    description: 'Water, Sanitation and Hygiene programs for community health and wellbeing. We implement behavior change campaigns, infrastructure upgrades, water quality monitoring, and WASH programs for specific communities.',
    details: [
      'End-line Assessment: Project "Improving Water and Environmental Sanitation" in Delhi',
      'Evaluation: Truckers Engagement Project "Suhana Safar"',
      'Qualitative Rapid Assessment: Women + Water Project in Maharashtra and Madhya Pradesh',
    ],
    image: 'https://images.unsplash.com/photo-1541544741670-1b8ee8b86a30?w=800&q=80',
    tags: ['Implementation', 'Training', 'Communication', 'Evaluation', 'School WASH'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

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
              Thematic Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-gradient-accent">Projects</span>
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
              <div className="glass-card overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Project Details - Collapsible */}
                  {project.details && project.details.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedCards);
                          if (newExpanded.has(project.id)) {
                            newExpanded.delete(project.id);
                          } else {
                            newExpanded.add(project.id);
                          }
                          setExpandedCards(newExpanded);
                        }}
                        className="flex items-center justify-between w-full text-xs font-semibold text-foreground mb-2 hover:text-secondary transition-colors"
                      >
                        <span>Key Projects:</span>
                        {expandedCards.has(project.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      {expandedCards.has(project.id) && (
                        <ul className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                          {project.details.map((detail, index) => (
                            <li key={index} className="text-[11px] text-muted-foreground flex items-start">
                              <span className="text-secondary mr-1.5 mt-0.5 flex-shrink-0">•</span>
                              <span className="leading-tight">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

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
