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
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
              CAREERS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Be part of a team that's creating meaningful social impact through research, communication, and capacity building
            </p>
          </div>

          {/* Open Positions */}
          <div className="mb-16 animate-in">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-primary/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                          <Briefcase size={14} className="text-secondary" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                          <MapPin size={14} className="text-secondary" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                          <Clock size={14} className="text-secondary" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button className="shrink-0 bg-primary text-white hover:bg-secondary hover:text-primary font-bold shadow-md transition-all duration-300">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16 animate-in bg-slate-50 rounded-3xl p-12 border border-slate-100">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 text-center group hover:scale-105 transition-all duration-300 rounded-xl shadow-sm border border-slate-100 hover:shadow-md"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-primary/90">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="animate-in mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-[2rem] left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />

              {['Submit Application', 'Initial Review', 'Interview Process', 'Onboarding'].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 relative z-10">
                    {index + 1}
                  </div>
                  {step === 'Submit Application' ? (
                    <Link
                      to="/location"
                      className="font-bold text-lg text-primary hover:text-secondary transition-colors cursor-pointer block"
                    >
                      {step}
                    </Link>
                  ) : (
                    <div className="font-bold text-lg text-primary">{step}</div>
                  )}
                  <p className="text-sm text-slate-500 mt-2">Step {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="animate-in bg-primary rounded-3xl p-12 md:p-16 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                Don't see a position that fits?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                We're always interested in connecting with talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Link
                to="/location"
                className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
