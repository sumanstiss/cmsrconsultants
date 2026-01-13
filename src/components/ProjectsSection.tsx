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
      { opacity: 0, y: 30 },
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
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-scroll',
          start: 'top 80%',
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
      className="relative py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Thematic Areas
            </h2>
            <p className="text-muted-foreground text-lg">
              Delivering high-impact solutions across key social development sectors.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-4 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Next projects"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="projects-scroll flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory pt-4 px-1"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-none w-[340px] md:w-[420px] snap-start opacity-0"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 group">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm shadow-sm">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    {/* Project Details - Collapsible */}
                    {project.details && project.details.length > 0 && (
                      <div className="mb-6 border-t border-gray-100 pt-4">
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
                          className="flex items-center justify-between w-full text-sm font-semibold text-primary/80 mb-2 hover:text-primary transition-colors"
                        >
                          <span>Key Interventions</span>
                          {expandedCards.has(project.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {expandedCards.has(project.id) && (
                          <ul className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            {project.details.map((detail, index) => (
                              <li key={index} className="text-sm text-slate-500 flex items-start leading-snug">
                                <span className="text-secondary mr-2 mt-1 flex-shrink-0">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <button className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-wider group/btn hover:underline decoration-2 underline-offset-4">
                      Explore Projects
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
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
