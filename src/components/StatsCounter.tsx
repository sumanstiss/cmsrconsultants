import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, suffix, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to({}, {
          duration: 2,
          delay: delay,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            setCount(Math.floor(progress * value));
          },
          onComplete: () => setCount(value),
        });
      },
    });

    return () => trigger.kill();
  }, [value, delay]);

  return (
    <div 
      ref={ref}
      className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-transform duration-500"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-500">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.stat-item'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const stats = [
    { icon: <Calendar size={28} />, value: 14, suffix: '+', label: 'Years of Experience', delay: 0 },
    { icon: <MapPin size={28} />, value: 25, suffix: '+', label: 'States Covered', delay: 0.1 },
    { icon: <Users size={28} />, value: 100, suffix: '+', label: 'Partners', delay: 0.2 },
    { icon: <Heart size={28} />, value: 300, suffix: 'K+', label: 'Individuals Engaged', delay: 0.3 },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Creating Lasting Change
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <StatItem {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
