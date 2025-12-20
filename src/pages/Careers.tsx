import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Clock, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const positions = [
  {
    title: 'Senior Research Associate',
    department: 'Research & Evaluation',
    location: 'Delhi / Remote',
    type: 'Full-time',
  },
  {
    title: 'Communication Specialist',
    department: 'Integrated Communications',
    location: 'Mumbai / Remote',
    type: 'Full-time',
  },
  {
    title: 'Training Coordinator',
    department: 'Training & Capacity Building',
    location: 'Bangalore / Remote',
    type: 'Full-time',
  },
  {
    title: 'Project Manager',
    department: 'Operations',
    location: 'Delhi',
    type: 'Full-time',
  },
];

const benefits = [
  'Competitive compensation',
  'Professional development opportunities',
  'Health insurance',
  'Work-life balance',
  'Impactful work',
];

const Careers = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6">
              CAREERS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of a team that's creating meaningful social impact through research, communication, and capacity building
            </p>
          </div>

          {/* Open Positions */}
          <div className="mb-16 animate-in">
            <h2 className="text-3xl font-bold text-foreground mb-8">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="glass-card p-6 group hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="neon" className="shrink-0">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16 animate-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-300">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="animate-in glass-card p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Submit Application', 'Initial Review', 'Interview Process', 'Onboarding'].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-background text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  {step === 'Submit Application' ? (
                    <Link
                      to="/location"
                      className="font-semibold text-foreground hover:text-secondary transition-colors cursor-pointer"
                    >
                      {step}
                    </Link>
                  ) : (
                    <div className="font-semibold text-foreground">{step}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="animate-in glass-card p-12 bg-gradient-to-r from-secondary/20 to-accent/20 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Don't see a position that fits?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always interested in connecting with talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link
              to="/location"
              className="inline-flex items-center gap-2 glass-card px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
