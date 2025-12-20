import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
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
              WHO WE ARE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About CMSR Consultants
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fostering Sustainable Partnership through research, communication, and capacity building
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="glass-card p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  CMSR Consultants is a leading research and communication consultancy dedicated to creating positive social impact. We combine rigorous research methodologies with innovative communication strategies to drive meaningful change.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With a pan-India presence and a network of 50+ production partners, we have successfully delivered projects across 24+ states and union territories, engaging over 2.5 lakh individuals and training more than 25,000 stakeholders.
                </p>
              </div>
            </div>

            <div className="animate-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Integrity & Excellence',
                    description: 'We maintain the highest standards in all our work',
                  },
                  {
                    title: 'Social Equity',
                    description: 'Committed to creating inclusive and equitable solutions',
                  },
                  {
                    title: 'Innovation',
                    description: 'Leveraging cutting-edge methodologies and technologies',
                  },
                  {
                    title: 'Partnership',
                    description: 'Building lasting relationships with clients and communities',
                  },
                ].map((value, index) => (
                  <div key={index} className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0 group-hover:bg-secondary group-hover:text-background transition-all duration-300">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="animate-in glass-card p-12 mb-16 bg-gradient-to-r from-secondary/20 to-accent/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">24+</div>
                <div className="text-xl text-muted-foreground">States & UTs</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">2.5L+</div>
                <div className="text-xl text-muted-foreground">Individuals engaged</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">25K+</div>
                <div className="text-xl text-muted-foreground">Stakeholders trained</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
