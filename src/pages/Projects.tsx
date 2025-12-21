import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Search, X, Mail, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LIST = [
  'All',
  'Agriculture & Livelihood',
  'Environment & Climate Change',
  'Health and Nutrition',
  'Gender',
  'Education & Skill Development',
  'Child Rights',
  'WASH',
];

// Thematic areas with project details
const THEMATIC_AREAS = [
  {
    category: 'Agriculture & Livelihood',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    projects: [
      {
        title: 'Baseline Study: Mobilizing MGNREGA - A High Impact Collaborative Water Security Programme in Jharkhand',
        description: 'Conducted baseline study to establish initial situation for improving food and nutrition security in drought-prone districts, channeling MGNREGA funds for irrigation infrastructure to enhance cropping intensity, diversity, and productivity. Project by PRADAN, WOTR, SPWD, supported by Welthungerhilfe.',
      },
      {
        title: 'Value Chain Gap Analysis: Three Agri-Commodities in Kalahandi District, Odisha',
        description: 'Analysis of Seasonal Pulses, Moringa, and Backyard Poultry value chains. Identified critical gaps preventing women farmers from increasing incomes and recommended solutions for effective value chain interventions.',
      },
      {
        title: 'Baseline Study: "Shakti" Project in Kalahandi district, Odisha',
        description: 'Climate resilience for marginalized rural women. The project aims to increase resilience to climate changes and capacitate women to take part in decision-making processes related to climate adaptation, food security and nutrition.',
      },
      {
        title: 'Feasibility Study: Climate resilient farming systems in Purulia, West Bengal',
        description: 'Evaluation of the first phase of project and review of concept for planned new project. Survey conducted among 364 households across 12 villages to analyze relevance, effectiveness, efficiency, and sustainability.',
      },
      {
        title: 'Micro Planning: Cluster level planning in Bathinda, Chhota Udepur and Damoh',
        description: 'Preparation of Cluster Level Micro Planning in Bathinda (Punjab), Chhota Udepur (Gujarat) and Damoh (Madhya Pradesh) for CARE. Deepened understanding on agriculture and livestock rearing practices, crop preferences, and natural resource management.',
      },
      {
        title: 'Endline Evaluation: Climate Change Adaptation of Women Smallholders and Cotton Producers from Vidarbha Region, Maharashtra',
        description: 'Evaluation of CARE India\'s "Environmentally Sound and Climate Resilient Cotton Production Practices" project in Buldhana district, Maharashtra (2018-2021). Focused on gathering evidence on quantitative and qualitative results and outcomes.',
      },
      {
        title: 'Impact Tracking & Tracer Study: Maharashtra Agri-skilling Programme (MASP)',
        description: 'Impact tracking study in 12 districts and tracer study in 6 districts of Maharashtra. Program aimed to train and certify 2,82,000 farmers in Group Farming Practice. Total of 3700 farmers interviewed across 12 districts.',
      },
      {
        title: 'End-line Study: Community-based Adaptation Project "Where the Rain Falls"',
        description: 'Project implemented by CARE India in Bagicha and Pathalgaon blocks of Jashpur district, Chhattisgarh since 2014. Aimed to increase climate resilience of 3000 tribal women and their households in 40 villages.',
      },
      {
        title: 'Documentation: Climate Change Adaptation and Cotton Production (CCACP) Project',
        description: 'Documentation of project learnings in Buldhana district, Maharashtra. Focused on developing environmentally sound and climate resilient cotton production model plots for demonstration on lands of traditionally cotton growing women smallholders.',
      },
      {
        title: 'Data Collection: Animal Protein Consumption Study',
        description: 'Study conducted in four states: Rajasthan, Madhya Pradesh, Maharashtra and Assam. Survey among 4704 households and representatives of Abattoirs, Retail Stores, HRI Sector, Dairy Companies, Poultry companies and wholesalers.',
      },
      {
        title: 'Impact Assessment: Godhan Program in 14 districts',
        description: 'Impact Assessment Study in 14 Project Districts of Maharashtra, Bihar and Uttar Pradesh under Godhan Program for BAIF Development Research Foundation. Large scale data collection with 3000 farmers and 1500 DIG members.',
      },
      {
        title: 'Development: FFBS Manual & Toolkit for CARE India Pathways Project',
        description: 'Preparation of Farmer\'s Field and Business School (FFBS) Manual and Toolkit for CARE India\'s Pathways Program. Adapted Pathways India Resource Material into a full-fledged FFBS Manual with participatory tools and methodologies.',
      },
      {
        title: 'Community Mobilisation: Household and Livelihood survey for Slum Redevelopment Program',
        description: 'Community Mobilisation, Household and Livelihood survey for Slum Redevelopment Program under RAY in Buxar and Ara districts of Bihar. Large scale data collection (25000 households) in slum households.',
      },
      {
        title: 'Thematic Study: Community Based Adaptation (CBA) Project in Chhattisgarh',
        description: 'Qualitative study and documentation in Jashpur district focusing on five thematic areas: Agriculture Collectivization, Soil & Water Conservation; Climate Resilient & Financial Services; Inclusive Governance and Gender.',
      },
      {
        title: 'Consumer Survey: Improved Pigeon Pea Varieties for Bern University, Switzerland',
        description: 'Value chain analysis and consumer survey in Delhi & Hyderabad for Indo-Swiss Collaboration in Biotechnology (ISCB) to ascertain market perception and preference of desired traits in improved pigeon pea cultivators.',
      },
      {
        title: 'Baseline & End-line Study: Pathways Program in Kalahandi and Kandhamal Districts, Odisha',
        description: 'Baseline survey at the beginning of Supplemental Grant Period and end-line assessment to establish quantitative and qualitative values. Measured progress made during the supplemental grant period and documented lessons learnt.',
      },
      {
        title: 'Impact Assessment: Reliance Nutrition Gardens under RJMCHNM program in Maharashtra',
        description: 'Impact Assessment of Reliance Nutrition Gardens established in almost 12000 Anganwadi Centres across 16 districts of Maharashtra. Evaluated role of RNGs in improving nutritional diversity in midday meals.',
      },
      {
        title: 'Community Nutrition Gardens: Process Documentation and Conceptualisation of CNGs Model',
        description: 'Process Documentation and Conceptualisation of Community Nutrition Gardens (CNGs) Model for ERADA in Madhya Pradesh. Documented learnings and success of the model, exploring integration of solar energy, aquaculture, and value-chain based models.',
      },
    ],
  },
  {
    category: 'Environment & Climate Change',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    projects: [
      {
        title: 'Baseline Study: Knowledge, Attitude & Behaviour on Delhi Women Construction Workers + Air Pollution',
        description: 'Study by Mahila Housing Trust and Purpose India to mobilize and power up women construction workers to understand the impact of air pollution on their and their children\'s health. Conducted in Bakkarwala, Gokulpuri, and Sawda Ghevra in Delhi.',
      },
      {
        title: 'Scoping Study: Campaigns on Renewable (Solar) Energy in Farm and Health Care Centres',
        description: 'Scoping study in 6 Districts of Bihar for Purpose India and CEED to raise public awareness and articulate demand for distributed renewable energy (DRE) in elections. Focused on farmers and healthcare workers.',
      },
      {
        title: 'Livelihood Cyclists Survey: "Cycle Chalegi, Dilli Badhegi!" initiative',
        description: 'Survey among "Livelihood Cyclists" in Delhi by ASAR, CEED and Purpose India. Purpose was to understand challenges faced by cyclists while cycling in intense traffic and general behavioural pattern of people towards them.',
      },
      {
        title: 'Perception Survey: Air Quality in 17 Cities of 12 States',
        description: 'Study to get insights from people about air pollution and understand their extent of knowledge regarding its implications. Covered 5000 respondents through both online and offline survey from 17 cities across 12 states.',
      },
      {
        title: 'Rapid Assessment: Exploring Opportunities to Promote Electricity-Consuming Enterprises',
        description: 'Study for CARE India to identify opportunities for expanding economic activities in underserved rural areas through electricity-consuming enterprises model in Bihar and Uttar Pradesh. Would enhance income and quality of life of people.',
      },
      {
        title: 'Baseline Study: Improved Cook Stoves (ICS) Project in Bengaluru, Karnataka',
        description: 'Baseline study with gender centric lens to establish benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. Based on interviews of 360 households using CAPI technique.',
      },
    ],
  },
  {
    category: 'Health and Nutrition',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    projects: [
      {
        title: 'Process Documentation: Community Nutrition Gardens (CNGs) Model for ERADA',
        description: 'Process Documentation and Conceptualisation of Community Nutrition Gardens (CNGs) Model for ERADA in Madhya Pradesh. Documented learnings and success of the model, exploring integration of solar energy, aquaculture, and value-chain based models.',
      },
      {
        title: 'Endline Evaluation: Kanya Sampurna Project (KSP) in Cuddalore District, Tamil Nadu',
        description: 'Multi-sectoral intervention focusing on advancing health, education, and economic opportunities for girls/women (0-35 years). Project reached 89,242 individuals through different interventions over five years (2017-2022).',
      },
      {
        title: 'Assessment: Pradhan Mantri Arogya Mitra (PMAM) under PMJAY Scheme',
        description: 'Large scale assignment in association with Deloitte to assess roles and performance of PMAM for operational and programmatic efficiency. Study done in 192 hospitals across 16 districts of 9 states. 5680 exit interviews conducted.',
      },
      {
        title: 'Impact Assessment: Reliance Nutrition Gardens (RNGs) under RJMCHNM program',
        description: 'Impact Assessment of Reliance Nutrition Gardens established in almost 12000 Anganwadi Centres across 16 districts of Maharashtra. Evaluated role of RNGs in improving nutritional diversity in midday meals served to children.',
      },
      {
        title: 'Sitapur Eye Hospital Survey in UP and Uttarakhand',
        description: 'Survey conducted with patient and non-patient respondents in three locations of Uttar Pradesh and two locations of Uttarakhand for Deloitte. Purpose was to find out awareness about eye care needs and health seeking behaviour.',
      },
      {
        title: 'Study: Prevention and Control of Anemia among Adolescent Girls',
        description: 'Study in Sitamarhi and Vaishali Districts of Bihar to understand barriers, social norm and behaviour related to nutrition and health among adolescent girls. Assessed understanding of anemia, its salience and consequences.',
      },
      {
        title: 'Pre-testing: Pictorial health warning for Tobacco products',
        description: 'Study for Centre for Communication and Change-India to pre-test pictorial health warnings for cigarettes, bidis and smokeless tobacco to test their effectiveness in conveying the message about health hazards.',
      },
    ],
  },
  {
    category: 'Gender',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    projects: [
      {
        title: 'Gender Diversity Survey for JCB',
        description: 'Diagnostic study on Gender Diversity for JCB at three locations – Ballabhgarh, Jaipur and Pune (Haryana, Maharashtra, Rajasthan). Purpose was to get insight of JCB staff and shop floor employees on gender diversity journey.',
      },
      {
        title: 'Gender Analysis: Red Chilli Value Chains',
        description: 'Study on "Gender Analysis in Red Chilli Value Chains" in Kerala, Tamil Nadu and Telangana. Aimed to find out current state of gender and livelihood in supply chain and determine roadmap for further actions.',
      },
      {
        title: 'Study: Gender Equality in Barley Value Chains for CARE Consulting',
        description: 'Analysis and Recommendations to Improve Gender Equality in Barley Value Chains for CARE Consulting (USA Team). Focused on mapping roles of women, identifying barriers, and recommending solutions for AB InBev\'s agriculture programming.',
      },
      {
        title: 'Baseline Study: Women Empowerment and Resilience in Red Chilli Supply Chain',
        description: 'Baseline study in Telangana to establish current status of women\'s empowerment and degree of resilience in supply chains with regards to their livelihoods. Assessed baseline values for key indicators related to women\'s empowerment.',
      },
      {
        title: 'Baseline Study: Gender Roles in Rice Value Chain',
        description: 'Baseline Study of Gender Roles in Basmati Rice Value Chain in Selected Districts of Haryana for Mars Food. Obtained data pertaining to identifying opportunities and constraints of men and women in Basmati Rice Value Chain.',
      },
      {
        title: 'Baseline Study: Improved Cook Stoves (ICS) Project - Gender Centric',
        description: 'Baseline study with gender centric lens in Bengaluru, Karnataka to establish benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. 360 households interviewed.',
      },
    ],
  },
  {
    category: 'Education & Skill Development',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    projects: [
      {
        title: 'Endline Evaluation: Kanya Sampurna Project (KSP)',
        description: 'Multi-sectoral intervention focusing on advancing health, education, and economic opportunities for girls/women (0-35 years) in Cuddalore District, Tamil Nadu. Project reached 89,242 individuals through different interventions over five years.',
      },
      {
        title: 'Baseline Study: "Neev" Project in 100 AWCs of Udham Singh Nagar District',
        description: 'Baseline study for United Way Delhi\'s Neev program in 100 anganwadi centers from three blocks of Udham Singh Nagar district, Uttarakhand. Aimed to improve development of children in 0-6 years age group.',
      },
      {
        title: 'End-line Study: School Support Program (SSP) in Gurugram, Haryana',
        description: 'Program to provide inclusive and quality education for all children. Established community-based Youth Resource Center providing youth with essential life skills, information about career opportunities and skill development avenues.',
      },
      {
        title: 'Baseline Study: "Born Learning" Program in Rudrapur, Uttarakhand',
        description: 'Baseline study for United Way Delhi\'s "Born Learning" program aimed at overall well-being and development of new born in formative years (0-6 years) in selected 20 Anganwadi centers of Rudrapur, Uttarakhand.',
      },
      {
        title: 'Market Assessment: Magic Bus\' Youth Livelihood Programme',
        description: 'Market assessment for Magic Bus India Foundation directed towards establishing relationship of likely youth needs and market factors in Patna, Lucknow, Gurgaon, Manesar and Baddi. Influenced placement and sustainability of Livelihood program.',
      },
      {
        title: 'Impact Evaluation: J.P.Morgan - Don Bosco Academy for Skills',
        description: 'Impact Evaluation of "J.P Morgan – Don Bosco Tech Academy for Skills" program in 8 states: Andhra Pradesh, Delhi, Jharkhand, Karnataka, Kerala, Odisha, Uttar Pradesh and West Bengal. Interviewed 639 trained candidates.',
      },
      {
        title: 'Evaluation: Magic Bus\' Livelihood Program in Delhi',
        description: 'Evaluation of Magic Bus\' Livelihood Program initiated with Comic Relief with envisaged Goal of "Sports for Change". Program aimed at providing disadvantaged youth with vocational training and support to achieve personal and professional goals.',
      },
      {
        title: 'Study: Perception of ICDS in Selected Districts',
        description: 'Study conducted in two districts each of Rajasthan and Andhra Pradesh (total 4 districts). Objectives were to assess current conditions of existing Anganwadi centers and type of services provided to beneficiaries.',
      },
      {
        title: 'Baseline Study: Youth Resource Center in Ghaziabad',
        description: 'Project intended to improve learning outcomes of children in school, sensitizing students towards conservation of environment and life skills. Community engagement and awareness generation activities with parents were also planned.',
      },
      {
        title: 'KAP Study: Digital Learning Centre Project in Delhi',
        description: 'Plan India launched Digital Learning Centre Project in West and South West Delhi to address learning crisis faced by girls after completing Class VIII. Aimed to curb school dropout, promote retention, and improve learning outcomes.',
      },
      {
        title: 'Process Documentation: Child Centred Community Development Program',
        description: 'Process Documentation – Innovation & Best Practices of Child Centred Community Development Program in Bihar. Plan India with support of five partner NGOs engaged in implementation in five districts of Bihar.',
      },
    ],
  },
  {
    category: 'Child Rights',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    projects: [
      {
        title: 'Media Collective for Child Rights (MCCR) for UNICEF State Office, Chhattisgarh',
        description: 'Collaborative effort of CMSR Foundation and UNICEF State Office, Chhattisgarh to focus on promoting Child Rights issues. Through media workshops, field visits, mentorship and training, aimed towards collective mobilization of media, civil society, government officials and elected representatives.',
      },
      {
        title: 'Study: Chennai Floods and Children\'s Resiliency',
        description: 'Study to understand the impact of sudden onset of climatic disaster on vulnerable urban children in context of floods which affected Chennai city in November-December, 2015. Objective was to understand risks of climate changes posed to children.',
      },
      {
        title: 'Analysis: Assembly Questions during 2013-15 for UNICEF',
        description: 'Analysis of questions raised by honourable members of Chhattisgarh Vidhan Sabha on child rights and related issues during all eight sessions from 2013-2015. Special focus on five broad areas including Reducing Neo Natal Deaths, Reducing Stunting, etc.',
      },
      {
        title: 'Process Documentation: Child Centred Community Development Program',
        description: 'Process Documentation – Innovation & Best Practices of Child Centred Community Development Program in Bihar. Plan India with support of five partner NGOs engaged in implementation in five districts focusing on improving status of children.',
      },
      {
        title: 'End-line Evaluation: Child Rights studies in three districts of Uttar Pradesh',
        description: 'Child Rights Project implemented by UNICEF in three districts – Jaunpur, Mirzapur and Sonbhadra (2010-2014) with aim to create protective environment for children, with particular emphasis on their right to education and protection.',
      },
    ],
  },
  {
    category: 'WASH',
    image: 'https://images.unsplash.com/photo-1541544741670-1b8ee8b86a30?w=800&q=80',
    projects: [
      {
        title: 'End-line Assessment: Project "Improving Water and Environmental Sanitation" in Delhi',
        description: 'United Way Delhi program in selected government schools of Delhi. Focused on providing PORTA Toilets to schools and behavioral change through workshops on WASH. 133 PORTA toilets installed in 14 schools, benefitting more than 10000 students.',
      },
      {
        title: 'Evaluation: Truckers Engagement Project "Suhana Safar"',
        description: 'Program funded by MAERSK and implemented by Development Alternatives for improving quality of life of containerised truck drivers through training & orientation about Road safety, and WASH at Dadri and Tughlaqabad Depots. Interviewed 455 Truck Drivers and Helpers.',
      },
      {
        title: 'Qualitative Rapid Assessment: Women + Water Project',
        description: 'QRA done to undertake Cluster and SHG Mapping in seven selected districts of Maharashtra and Madhya Pradesh to identify communities and women\'s groups where W+W project can be implemented. Identified 20,000 functional SHGs for life skill training program.',
      },
    ],
  },
];

// Convert thematic areas to individual project cards
const SAMPLE_PROJECTS = THEMATIC_AREAS.flatMap((area, areaIndex) =>
  area.projects.map((project, projectIndex) => ({
    id: `${area.category.toLowerCase().replace(/\s+/g, '-')}-${projectIndex + 1}`,
    title: project.title,
    category: area.category,
    location: 'Multiple Locations, India',
    year: new Date().getFullYear() - Math.floor(Math.random() * 5),
    summary: project.description,
    results: [],
    images: [area.image],
    partners: [],
    budget: '',
    duration: '',
    contact: 'info@cmsrconsultants.com',
    fullText: project.description,
  }))
);

const Projects = () => {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return SAMPLE_PROJECTS.filter(
      (p) =>
        (activeCategory === 'All' || p.category === activeCategory) &&
        (p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.summary.toLowerCase().includes(query.toLowerCase()))
    );
  }, [activeCategory, query]);

  const activeProject = useMemo(
    () => SAMPLE_PROJECTS.find((p) => p.id === id),
    [id]
  );

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll('.project-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeCategory, query]);

  // Detail view
  if (id && activeProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm text-secondary font-semibold">PROJECT</span>
                <h1 className="text-3xl font-bold text-foreground">{activeProject.title}</h1>
                <div className="text-sm text-muted-foreground">{activeProject.location} · {activeProject.year}</div>
              </div>
              <Link to="/projects">
                <Button variant="outline">Back to list</Button>
              </Link>
            </div>

            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-background/50 rounded-lg overflow-hidden mb-6">
                    {activeProject.images?.[0] ? (
                      <img src={activeProject.images[0]} alt={activeProject.title} className="w-full h-64 object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{activeProject.fullText || activeProject.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Results</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {activeProject.results?.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>

                <aside className="glass-card p-4 bg-secondary/5">
                  <div className="text-sm font-semibold text-secondary mb-3">Project facts</div>
                  <dl className="text-sm text-muted-foreground space-y-2">
                    <div>
                      <dt className="font-medium text-foreground">Partners</dt>
                      <dd>{(activeProject.partners || []).join(', ') || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Budget</dt>
                      <dd>{activeProject.budget || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Duration</dt>
                      <dd>{activeProject.duration || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Contact</dt>
                      <dd className="flex flex-col gap-2 mt-1">
                        <a 
                          href={`mailto:${activeProject.contact || 'gajendra@cmsrconsultants.com'}`}
                          className="text-secondary hover:underline flex items-center gap-1"
                        >
                          <Mail size={14} />
                          {activeProject.contact || 'gajendra@cmsrconsultants.com'}
                        </a>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${activeProject.contact || 'gajendra@cmsrconsultants.com'}&su=Inquiry about ${encodeURIComponent(activeProject.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:underline flex items-center gap-1 text-xs"
                        >
                          <ExternalLink size={12} />
                          Send via Gmail
                        </a>
                      </dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6">
              PROJECTS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              All Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Filter by theme or search titles & summaries
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-secondary text-background'
                      : 'glass-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10 pr-10 py-2 border border-border/50 rounded-lg text-sm bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-500 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.images?.[0] || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-secondary/90 text-background">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{project.summary}</p>
                  <Link to={`/projects/${project.id}`}>
                    <Button variant="neon" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
