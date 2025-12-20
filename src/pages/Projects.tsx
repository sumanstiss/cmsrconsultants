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
  'Agriculture & Livelihoods',
  'Education & Skill Development',
  'Health & Nutrition',
  'Environment & Climate Change',
  'WASH',
  'Sustainable Transportation',
  'Urban Planning & Public Policy',
];

const SAMPLE_PROJECTS = [
  // Agriculture & Livelihoods (3)
  {
    id: 'agr-1',
    title: 'Climate-Smart Farming Initiative',
    category: 'Agriculture & Livelihoods',
    location: 'Rajasthan, India',
    year: 2023,
    summary: 'Built farmer capacity for climate-resilient practices, introduced drought-tolerant seeds and market linkages for 2,000 households.',
    results: ['2,000 households reached', 'Yield +18%', 'Market linkages for 600 farmers'],
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80'],
    partners: ['AIF', 'NIUA'],
    budget: 'INR 2.1 Cr',
    duration: '18 months',
    contact: 'gajendra@cmsrconsultants.com',
    fullText: 'Strengthened climate resilience in smallholder systems through demonstrations, trainings and market facilitation with SHGs and extension staff.',
  },
  {
    id: 'agr-2',
    title: 'Livelihoods Recovery Post-Floods',
    category: 'Agriculture & Livelihoods',
    location: 'Assam, India',
    year: 2022,
    summary: 'Cash-for-work and input distribution after floods; supported adoption of kitchen gardening and small-scale livestock rearing.',
    results: ['3,500 beneficiaries', '100 demonstration plots'],
    images: ['https://images.unsplash.com/photo-1522527203850-3f80f2b9b6c7?w=1200&q=80'],
    partners: ['CARE'],
    budget: 'INR 1.2 Cr',
    duration: '12 months',
    contact: 'info@cmsrconsultants.com',
    fullText: 'Rapid livelihoods recovery using community labour, seed/tool kits, and market linkages to restore incomes and food security.',
  },
  {
    id: 'agr-3',
    title: 'Market Linkages for Smallholders',
    category: 'Agriculture & Livelihoods',
    location: 'Madhya Pradesh, India',
    year: 2021,
    summary: 'Developed aggregation models and buyer engagement to increase farmer incomes for horticulture producers.',
    results: ['800 farmers onboarded', 'Avg. income +22%'],
    images: ['https://images.unsplash.com/photo-1547555993-2a8f1f4d0d35?w=1200&q=80'],
    partners: ['Palladium'],
    budget: 'INR 95 Lakh',
    duration: '14 months',
    contact: 'market@cmsrconsultants.com',
    fullText: 'Implemented aggregation hubs, quality protocols, and buyer meet events that helped farmers access better value-chains.',
  },
  // Education & Skill Development (3)
  {
    id: 'edu-1',
    title: 'Skill-Linked Vocational Training',
    category: 'Education & Skill Development',
    location: 'Uttar Pradesh, India',
    year: 2024,
    summary: 'Provided market-oriented short courses (digital skills, tailoring) to 1,200 youth with placement support.',
    results: ['1,200 trainees', 'Placement rate 62%'],
    images: ['https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80'],
    partners: ['TATA Trusts'],
    budget: 'INR 85 Lakh',
    duration: '9 months',
    contact: 'training@cmsrconsultants.com',
    fullText: 'Short vocational courses designed with employers, with internships and post-training support to increase employability.',
  },
  {
    id: 'edu-2',
    title: 'Early Grade Reading Program',
    category: 'Education & Skill Development',
    location: 'Bihar, India',
    year: 2022,
    summary: 'Classroom coaching and learning materials improved reading outcomes in grades 1–3 across 120 schools.',
    results: ['Reading proficiency +28%', '120 schools engaged'],
    images: ['https://images.unsplash.com/photo-1529070538774-1853cb3265df?w=1200&q=80'],
    partners: ['UNICEF'],
    budget: 'INR 1.1 Cr',
    duration: '12 months',
    contact: 'edu@cmsrconsultants.com',
    fullText: 'Teacher training, remedial modules and community reading drives led to measurable improvements in foundational literacy.',
  },
  {
    id: 'edu-3',
    title: 'Digital Classroom Pilot',
    category: 'Education & Skill Development',
    location: 'Karnataka, India',
    year: 2023,
    summary: 'Piloted low-cost digital content and teacher support in remote schools to enhance maths outcomes.',
    results: ['Pilot in 40 schools', 'Teacher satisfaction 78%'],
    images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80'],
    partners: ['Cornell University'],
    budget: 'INR 48 Lakh',
    duration: '8 months',
    contact: 'digital@cmsrconsultants.com',
    fullText: 'Combined offline-first digital modules with teacher coaching and community engagement for scalable learning improvements.',
  },
  // Health & Nutrition (3)
  {
    id: 'health-1',
    title: 'Community Nutrition & Micronutrients',
    category: 'Health & Nutrition',
    location: 'Bihar, India',
    year: 2021,
    summary: 'Behavior-change communication and home fortification program reaching pregnant women and infants.',
    results: ['Improved exclusive breastfeeding rates', '2,400 households engaged'],
    images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80'],
    partners: ['UNICEF'],
    budget: 'INR 65 Lakh',
    duration: '12 months',
    contact: 'health@cmsrconsultants.com',
    fullText: 'Counselling, distribution of micronutrient supplements and community sessions to improve maternal and child nutrition.',
  },
  {
    id: 'health-2',
    title: 'Mobile Health Camps',
    category: 'Health & Nutrition',
    location: 'Odisha, India',
    year: 2022,
    summary: 'Mobile camps providing screening, referrals and health education across remote habitations.',
    results: ['6,500 screenings', 'Referral linkage 1,200'],
    images: ['https://images.unsplash.com/photo-1580281657521-5c0b7c2b6b9b?w=1200&q=80'],
    partners: ['CARE'],
    budget: 'INR 72 Lakh',
    duration: '10 months',
    contact: 'mhc@cmsrconsultants.com',
    fullText: 'Integrated screening and referral model with local facilities strengthened continuity of care for rural populations.',
  },
  {
    id: 'health-3',
    title: 'Adolescent Health & Hygiene',
    category: 'Health & Nutrition',
    location: 'Jharkhand, India',
    year: 2023,
    summary: 'School-based sessions coupled with community outreach focused on adolescent nutrition and menstrual health.',
    results: ['40 schools reached', 'Peer educator network formed'],
    images: ['https://images.unsplash.com/photo-1526676035374-4b9b1a4b2d6f?w=1200&q=80'],
    partners: ['Save the Children'],
    budget: 'INR 38 Lakh',
    duration: '9 months',
    contact: 'adolescent@cmsrconsultants.com',
    fullText: 'Peer-led sessions and sanitary product pilots improved knowledge and school attendance among adolescent girls.',
  },
  // Environment & Climate Change (3)
  {
    id: 'env-1',
    title: 'Urban Greening & Watershed',
    category: 'Environment & Climate Change',
    location: 'Pune, India',
    year: 2023,
    summary: 'Green infrastructure framed to mitigate urban heat and improve local watershed management.',
    results: ['5 public spaces greened', 'Community stewardship groups formed'],
    images: ['https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&q=80'],
    partners: ['WRI India'],
    budget: 'INR 1.5 Cr',
    duration: '15 months',
    contact: 'env@cmsrconsultants.com',
    fullText: 'Integrated green corridors, recharge pits and community management to address urban heat and flooding risks.',
  },
  {
    id: 'env-2',
    title: 'Climate Resilience for Coastal Communities',
    category: 'Environment & Climate Change',
    location: 'Goa, India',
    year: 2022,
    summary: 'Mangrove restoration and local livelihood support to increase coastal resilience.',
    results: ['0.8 km coastline replanted', '200 households supported'],
    images: ['https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1200&q=80'],
    partners: ['GIZ'],
    budget: 'INR 55 Lakh',
    duration: '12 months',
    contact: 'coast@cmsrconsultants.com',
    fullText: 'Community-driven restoration plus alternative livelihoods reduced exposure and enhanced local stewardship.',
  },
  {
    id: 'env-3',
    title: 'Renewable Energy Adoption Study',
    category: 'Environment & Climate Change',
    location: 'Tamil Nadu, India',
    year: 2024,
    summary: 'Assessment and pilot subsidy mechanisms to accelerate household solar adoption in peri-urban areas.',
    results: ['Pilot: 400 installations', 'Feasibility toolkit produced'],
    images: ['https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80'],
    partners: ['Deloitte'],
    budget: 'INR 2.8 Cr',
    duration: '18 months',
    contact: 'energy@cmsrconsultants.com',
    fullText: 'Policy and market research led to a pilot financing mechanism to de-risk household solar investments.',
  },
  // WASH (3)
  {
    id: 'wash-1',
    title: 'Community WASH Behavior Change',
    category: 'WASH',
    location: 'Tamil Nadu, India',
    year: 2022,
    summary: 'IEC campaigns plus school WASH improvements; latrine adoption and handwashing increased across target villages.',
    results: ['10,000 people reached', '10 schools upgraded'],
    images: ['https://images.unsplash.com/photo-1542343638-ec6029b3f9e1?w=1200&q=80'],
    partners: ['CARE'],
    budget: 'INR 1.0 Cr',
    duration: '12 months',
    contact: 'wash@cmsrconsultants.com',
    fullText: 'Combined hardware upgrades and behaviour-change communication to improve sanitation and hygiene outcomes.',
  },
  {
    id: 'wash-2',
    title: 'School WASH Infrastructure Upgrade',
    category: 'WASH',
    location: 'Karnataka, India',
    year: 2021,
    summary: 'Upgraded water and sanitation facilities in rural schools with maintenance training for staff.',
    results: ['25 schools upgraded', 'Maintenance committees established'],
    images: ['https://images.unsplash.com/photo-1509395176048-3d2b8d8ff7b2?w=1200&q=80'],
    partners: ['HDFC Bank Parivartan'],
    budget: 'INR 68 Lakh',
    duration: '10 months',
    contact: 'schoolswash@cmsrconsultants.com',
    fullText: 'Focus on durable infrastructure with local ownership models and routine maintenance protocols.',
  },
  {
    id: 'wash-3',
    title: 'Water Quality Monitoring Pilot',
    category: 'WASH',
    location: 'Uttarakhand, India',
    year: 2023,
    summary: 'Community-based water testing and dashboard for village-level water quality reporting.',
    results: ['150 water sources tested', 'Dashboard launched'],
    images: ['https://images.unsplash.com/photo-1501000418895-4f6c2f2c3f0f?w=1200&q=80'],
    partners: ['NIUA'],
    budget: 'INR 34 Lakh',
    duration: '8 months',
    contact: 'water@cmsrconsultants.com',
    fullText: 'Trained local volunteers to conduct testing and to use simple remedial actions where contaminants were found.',
  },
  // Sustainable Transportation (3)
  {
    id: 'trans-1',
    title: 'Low-Emission Urban Shuttle Pilot',
    category: 'Sustainable Transportation',
    location: 'Gurugram, India',
    year: 2024,
    summary: 'Piloted electric shuttle routes with first/last-mile integration and ridership incentives.',
    results: ['Pilot ridership 5,000+', 'Carbon savings estimated'],
    images: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80'],
    partners: ['WRI India'],
    budget: 'INR 2.6 Cr',
    duration: '12 months',
    contact: 'transit@cmsrconsultants.com',
    fullText: 'Designed route optimization and pricing experiments to encourage modal shift to low-emission shared vehicles.',
  },
  {
    id: 'trans-2',
    title: 'Non-Motorised Transport Network',
    category: 'Sustainable Transportation',
    location: 'Pune, India',
    year: 2022,
    summary: 'Cycle-lane pilots and pedestrian priority zones to improve safety and promote active transport.',
    results: ['3 km cycle-lanes', 'Local cycling groups formed'],
    images: ['https://images.unsplash.com/photo-1509395176049-4a6c2f2c2d1a?w=1200&q=80'],
    partners: ['TATA Trusts'],
    budget: 'INR 72 Lakh',
    duration: '9 months',
    contact: 'active@cmsrconsultants.com',
    fullText: 'Combined design interventions with local promotion to demonstrate feasibility of safe walking and cycling networks.',
  },
  {
    id: 'trans-3',
    title: 'EV Charging Feasibility Study',
    category: 'Sustainable Transportation',
    location: 'Hyderabad, India',
    year: 2023,
    summary: 'Feasibility study and business model design for public EV charging infrastructure in peri-urban zones.',
    results: ['Business model report', '3 pilot sites identified'],
    images: ['https://images.unsplash.com/photo-1511918984145-48de785d4c4b?w=1200&q=80'],
    partners: ['Deloitte'],
    budget: 'INR 45 Lakh',
    duration: '6 months',
    contact: 'ev@cmsrconsultants.com',
    fullText: 'Market analysis and stakeholder consultations produced a bankable pilot plan for charging infrastructure.',
  },
  // Urban Planning & Public Policy (3)
  {
    id: 'urban-1',
    title: 'Participatory Urban Planning Toolkit',
    category: 'Urban Planning & Public Policy',
    location: 'Lucknow, India',
    year: 2023,
    summary: 'Co-created a planning toolkit with municipal staff and citizen groups to make budgets more inclusive.',
    results: ['Toolkit adopted by 3 wards', '20+ consultations held'],
    images: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80'],
    partners: ['NIUA'],
    budget: 'INR 55 Lakh',
    duration: '10 months',
    contact: 'urban@cmsrconsultants.com',
    fullText: 'Participatory budgeting and ward-level planning tools increased transparency and citizen participation.',
  },
  {
    id: 'urban-2',
    title: 'Inclusive Public Space Design',
    category: 'Urban Planning & Public Policy',
    location: 'Ahmedabad, India',
    year: 2022,
    summary: 'Design and pilot of inclusive public spaces prioritizing women, elderly and children.',
    results: ['2 public spaces redesigned', 'User satisfaction +40%'],
    images: ['https://images.unsplash.com/photo-1509395176047-6a66953bd231?w=1200&q=80'],
    partners: ['Palladium'],
    budget: 'INR 78 Lakh',
    duration: '11 months',
    contact: 'publicspace@cmsrconsultants.com',
    fullText: 'User-centric designs and co-production with communities encouraged shared stewardship of public assets.',
  },
  {
    id: 'urban-3',
    title: 'Urban Policy Review for Service Delivery',
    category: 'Urban Planning & Public Policy',
    location: 'Chennai, India',
    year: 2024,
    summary: 'Policy review and institutional strengthening to improve urban service delivery in medium-sized cities.',
    results: ['Policy recommendations delivered', 'Capacity building for 40 officials'],
    images: ['https://images.unsplash.com/photo-1509395176048-6a6695a3bd12?w=1200&q=80'],
    partners: ['Cornell University'],
    budget: 'INR 1.2 Cr',
    duration: '14 months',
    contact: 'policy@cmsrconsultants.com',
    fullText: 'Diagnostic and governance reform roadmap helped cities prioritize investments for equitable service delivery.',
  },
];

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
