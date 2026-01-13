import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, MessageSquare, GraduationCap, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OurThinking = () => {
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

  const insights = [
    {
      title: 'Research-Driven Approach',
      description: 'We believe in evidence-based solutions. Every project begins with rigorous research to understand the context, challenges, and opportunities.',
      icon: BarChart3,
    },
    {
      title: 'Communication for Change',
      description: 'Effective communication is the bridge between research and impact. We craft compelling narratives that drive action and inspire change.',
      icon: MessageSquare,
    },
    {
      title: 'Capacity Building',
      description: 'Sustainable change requires empowered communities. We invest in building local capacity to ensure long-term impact beyond project timelines.',
      icon: GraduationCap,
    },
    {
      title: 'Partnership Model',
      description: 'We work collaboratively with clients, communities, and partners, fostering relationships built on trust, transparency, and shared values.',
      icon: Handshake,
    },
  ];

  const principles = [
    {
      title: 'Social Equity',
      description: 'Every solution we design prioritizes inclusivity and addresses systemic barriers to create equitable outcomes.',
    },
    {
      title: 'Innovation',
      description: 'We continuously explore new methodologies, technologies, and approaches to enhance our impact and effectiveness.',
    },
    {
      title: 'Sustainability',
      description: 'Our interventions are designed for long-term sustainability, ensuring positive change endures beyond project completion.',
    },
    {
      title: 'Local Context',
      description: 'We recognize that solutions must be contextual. Our work is deeply rooted in understanding local realities and needs.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
              OUR THINKING
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Our Philosophy
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The principles and approaches that guide our work towards creating meaningful social impact
            </p>
          </div>

          {/* Core Insights */}
          <div className="mb-20 animate-in">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">
              Core Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div
                    key={index}
                    className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                      {insight.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {insight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guiding Principles */}
          <div className="mb-20 animate-in">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">
              Guiding Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-slate-200 hover:border-secondary transition-colors duration-300 shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 text-primary font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Approach Section */}
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-white animate-in shadow-2xl relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Approach</h2>
              <p className="text-lg md:text-xl leading-relaxed mb-12 text-white/90">
                We combine rigorous research methodologies with innovative communication strategies and comprehensive capacity building to create holistic solutions that drive sustainable social change.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="group">
                  <div className="text-5xl font-bold mb-4 text-secondary/40 group-hover:text-secondary transition-colors duration-300">01</div>
                  <div className="text-xl font-bold mb-2">Research</div>
                  <div className="text-white/70">
                    Understanding context and evidence
                  </div>
                </div>
                <div className="group">
                  <div className="text-5xl font-bold mb-4 text-secondary/40 group-hover:text-secondary transition-colors duration-300">02</div>
                  <div className="text-xl font-bold mb-2">Communicate</div>
                  <div className="text-white/70">
                    Crafting compelling narratives
                  </div>
                </div>
                <div className="group">
                  <div className="text-5xl font-bold mb-4 text-secondary/40 group-hover:text-secondary transition-colors duration-300">03</div>
                  <div className="text-xl font-bold mb-2">Empower</div>
                  <div className="text-white/70">
                    Building capacity for lasting impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurThinking;
