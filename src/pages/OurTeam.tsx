import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll('.animate-in'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const [openTeams, setOpenTeams] = useState<string[]>([]);

  const toggleTeam = (teamName: string) => {
    setOpenTeams(prev =>
      prev.includes(teamName)
        ? prev.filter(t => t !== teamName)
        : [...prev, teamName]
    );
  };

  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Strategic Direction',
      description: 'Our leadership team brings decades of combined experience in research, communication, and social development.',
      members: [
        { name: 'Gajendra Rai', position: 'Director', email: 'gajendra@cmsrconsultants.com' },
        { name: 'E.C Beena', position: 'Senior Advisor', email: 'beena@cmsrconsultants.com' },
      ],
    },
    {
      name: 'Research Team',
      role: 'Evidence Generation',
      description: 'A diverse team of researchers, evaluators, and analysts committed to generating high-quality evidence.',
      members: [
        { name: 'Suman Sourav', position: 'Research Associate', email: 'suman@cmsrconsultants.com' },
        { name: 'Amrita Mazumdar', position: 'Senior Research Associate', email: 'amrita@cmsrconsultants.com' },
        { name: 'Roshini Suparna Diwakar', position: 'Research Analyst', email: 'roshini@cmsrconsultants.com' },
      ],
    },
    {
      name: 'Communication Team',
      role: 'Storytelling & Production',
      description: 'Creative professionals who transform research into compelling narratives and impactful communications.',
      members: [
        { name: 'Talari Shashira', position: 'Communication Specialist', email: 'shashira@cmsrconsultants.com' },
      ],
    },
    {
      name: 'Training Team',
      role: 'Capacity Building',
      description: 'Expert trainers and facilitators who design and deliver contextual, hands-on learning experiences.',
      members: [
        { name: 'Training Coordinator', position: 'Lead Trainer', email: 'training@cmsrconsultants.com' },
      ],
    },
  ];

  const values = [
    'Diversity & Inclusion',
    'Collaboration',
    'Excellence',
    'Innovation',
    'Integrity',
    'Impact-Driven',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
              OUR TEAM
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A diverse group of professionals united by a shared commitment to creating positive social impact
            </p>
          </div>

          {/* Team Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {teamMembers.map((team, index) => {
              const isOpen = openTeams.includes(team.name);
              return (
                <Collapsible
                  key={index}
                  open={isOpen}
                  onOpenChange={() => toggleTeam(team.name)}
                  className={`p-8 hover:scale-[1.01] transition-all duration-300 animate-in rounded-2xl border ${isOpen ? 'bg-primary border-primary shadow-2xl' : 'bg-white border-slate-200 hover:border-primary/30 shadow-sm'
                    }`}
                >
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm ${isOpen ? 'bg-white/10 text-white' : 'bg-slate-100 text-primary'
                          }`}>
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className={`text-2xl font-serif font-bold mb-1 ${isOpen ? 'text-white' : 'text-primary'}`}>
                            {team.name}
                          </h3>
                          <div className={`font-semibold text-sm tracking-wide uppercase ${isOpen ? 'text-secondary' : 'text-slate-500'}`}>
                            {team.role}
                          </div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-white" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <p className={`leading-relaxed text-lg ${isOpen ? 'text-white/80' : 'text-slate-600'}`}>
                      {team.description}
                    </p>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-8 pt-8 border-t border-white/10">
                    <div className="space-y-4">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-secondary inline-block"></span>
                        Key Members
                      </h4>
                      {team.members.map((member, memberIndex) => (
                        <div
                          key={memberIndex}
                          className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white text-lg">{member.name}</div>
                              <div className="text-sm text-secondary">{member.position}</div>
                            </div>
                            <a
                              href={`mailto:${member.email}`}
                              className="text-white/60 hover:text-white text-sm bg-white/5 py-1.5 px-3 rounded-full hover:bg-white/10 transition-colors"
                            >
                              Contact
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          {/* Team Values */}
          <div className="bg-slate-50 rounded-3xl p-12 mb-16 animate-in border border-slate-100">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">
              What Unites Us
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl text-center shadow-sm border border-slate-100 hover:border-secondary hover:shadow-md transition-all duration-300"
                >
                  <div className="text-primary font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center animate-in overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mt-32" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mb-32" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Join Our Team</h2>
              <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
                We're always looking for passionate individuals who share our commitment to creating positive social change.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center space-x-2 bg-secondary text-primary px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>View Open Positions</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurTeam;
