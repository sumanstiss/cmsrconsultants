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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6">
              OUR TEAM
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                  className="glass-card p-8 hover:scale-[1.02] transition-all duration-300 animate-in"
                >
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-background text-2xl font-bold">
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">
                            {team.name}
                          </h3>
                          <div className="text-secondary font-semibold">
                            {team.role}
                          </div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-secondary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-secondary" />
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {team.description}
                    </p>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-6 pt-6 border-t border-border/50">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground mb-3">Team Members</h4>
                      {team.members.map((member, memberIndex) => (
                        <div
                          key={memberIndex}
                          className="glass-card p-4 hover:scale-[1.01] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-foreground">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.position}</div>
                            </div>
                            <a
                              href={`mailto:${member.email}`}
                              className="text-secondary hover:underline text-sm"
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
          <div className="glass-card p-12 mb-16 animate-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              What Unites Us
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-secondary font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="glass-card p-12 bg-gradient-to-r from-secondary/20 to-accent/20 text-center animate-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Join Our Team</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              We're always looking for passionate individuals who share our commitment to creating positive social change.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center space-x-2 glass-card px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              <span>View Open Positions</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurTeam;
