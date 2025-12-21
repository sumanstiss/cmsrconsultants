import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
      'Baseline Study: Mobilizing MGNREGA - A High Impact Collaborative Water Security Programme in Jharkhand (PRADAN, WOTR, SPWD, supported by Welthungerhilfe)',
      'Value Chain Gap Analysis: Three Agri-Commodities (Seasonal Pulses, Moringa, Backyard Poultry) in Kalahandi District, Odisha',
      'Baseline Study: "Shakti" Project in Kalahandi district, Odisha - Climate resilience for marginalized rural women',
      'Feasibility Study: Climate resilient farming systems in Purulia, West Bengal',
      'Micro Planning: Cluster level planning in Bathinda (Punjab), Chhota Udepur (Gujarat) and Damoh (Madhya Pradesh)',
      'Endline Evaluation: Climate Change Adaptation of Women Smallholders and Cotton Producers from Vidarbha Region, Maharashtra',
      'Impact Tracking & Tracer Study: Maharashtra Agri-skilling Programme (MASP) in 12 districts',
      'End-line Study: Community-based Adaptation Project "Where the Rain Falls" in Chhattisgarh and Maharashtra',
      'Documentation: Climate Change Adaptation and Cotton Production (CCACP) Project in Buldhana, Maharashtra',
      'Data Collection: Animal Protein Consumption Study in Rajasthan, MP, Maharashtra and Assam',
      'Impact Assessment: Godhan Program in 14 districts of Maharashtra, Bihar and Uttar Pradesh',
      'Development: FFBS Manual & Toolkit for CARE India Pathways Project',
      'Community Mobilisation: Household and Livelihood survey for Slum Redevelopment Program under RAY in Bihar',
      'Thematic Study: Community Based Adaptation (CBA) Project in Chhattisgarh',
      'Consumer Survey: Improved Pigeon Pea Varieties for Bern University, Switzerland',
      'Baseline & End-line Study: Pathways Program in Kalahandi and Kandhamal Districts, Odisha',
      'Impact Assessment: Reliance Nutrition Gardens under RJMCHNM program in Maharashtra',
      'Community Nutrition Gardens: Process Documentation and Conceptualisation of CNGs Model for ERADA in Madhya Pradesh'
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    tags: ['Research', 'Training', 'Market Development', 'Value Chain Analysis', 'Evaluation'],
  },
  {
    id: 2,
    title: 'Environment & Climate Change',
    description: 'Addressing environmental challenges through sustainable development initiatives. We focus on air pollution, renewable energy, climate adaptation, and sustainable transportation solutions.',
    details: [
      'Baseline Study: Knowledge, Attitude & Behaviour on Delhi Women Construction Workers + Air Pollution (Mahila Housing Trust & Purpose India)',
      'Scoping Study: Campaigns on Renewable (Solar) Energy in Farm and Health Care Centres in 6 Districts of Bihar',
      'Livelihood Cyclists Survey: "Cycle Chalegi, Dilli Badhegi!" initiative in Delhi',
      'Perception Survey: Air Quality in 17 Cities of 12 States (5000 respondents)',
      'Rapid Assessment: Exploring Opportunities to Promote Electricity-Consuming Enterprises in Rural Areas of Bihar and Uttar Pradesh',
      'Baseline Study: Improved Cook Stoves (ICS) Project in Bengaluru, Karnataka (360 households)'
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    tags: ['Policy', 'Advocacy', 'Research', 'Air Quality', 'Renewable Energy'],
  },
  {
    id: 3,
    title: 'Health and Nutrition',
    description: 'Improving health outcomes through evidence-based research and strategic communication. Our programs focus on maternal and child nutrition, adolescent health, community nutrition gardens, and health systems assessment.',
    details: [
      'Process Documentation: Community Nutrition Gardens (CNGs) Model for ERADA in Madhya Pradesh',
      'Endline Evaluation: Kanya Sampurna Project (KSP) in Cuddalore District, Tamil Nadu (89,242 individuals reached)',
      'Assessment: Pradhan Mantri Arogya Mitra (PMAM) under PMJAY Scheme in 9 States (5680 exit interviews, 192 hospitals)',
      'Impact Assessment: Reliance Nutrition Gardens (RNGs) under RJMCHNM program in Maharashtra (12000 AWCs, 16 districts)',
      'Sitapur Eye Hospital Survey: Patient and non-patient survey in UP and Uttarakhand for Deloitte',
      'Study: Prevention and Control of Anemia among Adolescent Girls in Sitamarhi and Vaishali Districts, Bihar',
      'Pre-testing: Pictorial health warning for Cigarettes, Bidis and Smokeless Tobacco to test effectiveness'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    tags: ['Research', 'Strategy', 'Communication', 'Evaluation', 'Nutrition'],
  },
  {
    id: 4,
    title: 'Gender',
    description: 'Promoting gender equality and women\'s empowerment through research, advocacy, and capacity building programs. We work on gender diversity, value chain analysis, and women\'s empowerment in agriculture.',
    details: [
      'Gender Diversity Survey: Diagnostic study for JCB at Ballabhgarh, Jaipur and Pune (Haryana, Maharashtra, Rajasthan)',
      'Gender Analysis: Red Chilli Value Chains in Kerala, Tamil Nadu and Telangana',
      'Study: Analysis and Recommendations to Improve Gender Equality in Barley Value Chains for CARE Consulting (USA Team)',
      'Baseline Study: Scope for Women Empowerment and Resilience in Red Chilli Supply Chain in Telangana',
      'Baseline Study: Gender Roles in Rice Value Chain in Selected Districts of Haryana (Mars Food)',
      'Baseline Study: Improved Cook Stoves (ICS) Project in Bengaluru, Karnataka (Gender centric lens, 360 households)'
    ],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    tags: ['Research', 'Advocacy', 'Training', 'Value Chain Analysis', 'Gender Mainstreaming'],
  },
  {
    id: 5,
    title: 'Education & Skill Development',
    description: 'Building capacities for a skilled and educated workforce through innovative learning solutions. Our programs include early childhood development, youth livelihood programs, skill development, and education quality improvement.',
    details: [
      'Endline Evaluation: Kanya Sampurna Project (KSP) in Cuddalore District, Tamil Nadu - Multi-sectoral intervention for girls/women (0-35 years)',
      'Baseline Study: "Neev" Project in 100 AWCs of Udham Singh Nagar District, Uttarakhand (United Way Delhi)',
      'End-line Study: School Support Program (SSP) in Gurugram, Haryana',
      'Baseline Study: "Born Learning" Program in Rudrapur, Uttarakhand (20 Anganwadi centers)',
      'Market Assessment: Magic Bus\' Youth Livelihood Programme (Patna, Lucknow, Gurgaon, Manesar, Baddi)',
      'Impact Evaluation: J.P.Morgan - Don Bosco Academy for Skills in 8 States (639 trained candidates)',
      'Evaluation: Magic Bus\' Livelihood Program in Delhi - "Sports for Change"',
      'Study: Perception of ICDS in Selected Districts in Rajasthan and Andhra Pradesh',
      'Baseline Study: Youth Resource Center in Ghaziabad',
      'KAP Study: Digital Learning Centre Project in Delhi (Plan India)',
      'Process Documentation: Innovation & Best Practices of Child Centred Community Development Program in Bihar'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    tags: ['Communication', 'Capacity Building', 'Training', 'Evaluation', 'ECD'],
  },
  {
    id: 6,
    title: 'Child Rights',
    description: 'Protecting and promoting children\'s rights through research, advocacy, and program implementation. We focus on child protection, education rights, child participation, and disaster resilience for children.',
    details: [
      'Media Collective for Child Rights (MCCR): Collaborative effort with UNICEF State Office, Chhattisgarh - Promoting Child Rights through media workshops, field visits, mentorship and training',
      'Study: Chennai Floods and Children\'s Resiliency - Understanding impact of climatic disaster on vulnerable urban children',
      'Analysis: Assembly Questions during 2013-15 for UNICEF - Analysis of questions on child rights in Chhattisgarh Vidhan Sabha',
      'Process Documentation: Innovation & Best Practices of Child Centred Community Development Program in Bihar (Plan India)',
      'End-line Evaluation: Child Rights studies in three districts of Uttar Pradesh (Jaunpur, Mirzapur, Sonbhadra) - Creating protective environment for children'
    ],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    tags: ['Research', 'Advocacy', 'Implementation', 'Media Engagement', 'Disaster Resilience'],
  },
  {
    id: 7,
    title: 'WASH',
    description: 'Water, Sanitation and Hygiene programs for community health and wellbeing. We implement behavior change campaigns, infrastructure upgrades, water quality monitoring, and WASH programs for specific communities.',
    details: [
      'End-line Assessment: Project "Improving Water and Environmental Sanitation" in Delhi - 133 PORTA toilets in 14 schools, benefitting 10000+ students (United Way Delhi)',
      'Evaluation: Truckers Engagement Project "Suhana Safar" - Road safety and WASH training for containerised truck drivers at Dadri and Tughlaqabad Depots (455 truck drivers interviewed)',
      'Qualitative Rapid Assessment: Women + Water Project in Maharashtra and Madhya Pradesh - Cluster and SHG Mapping in 7 districts to identify 20,000 functional SHGs for life skill training program'
    ],
    image: 'https://images.unsplash.com/photo-1541544741670-1b8ee8b86a30?w=800&q=80',
    tags: ['Implementation', 'Training', 'Communication', 'Evaluation', 'School WASH'],
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
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  {project.details && project.details.length > 0 && (
                    <div className="mb-4 max-h-[300px] overflow-y-auto">
                      <h4 className="text-xs font-semibold text-foreground mb-2">Projects:</h4>
                      <ul className="space-y-1.5 pr-2">
                        {project.details.map((detail, index) => (
                          <li key={index} className="text-[10px] text-muted-foreground flex items-start">
                            <span className="text-secondary mr-1.5 mt-0.5 flex-shrink-0">•</span>
                            <span className="leading-tight">{detail}</span>
                          </li>
                        ))}
                      </ul>
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
