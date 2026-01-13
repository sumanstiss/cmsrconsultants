import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MessageSquare, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.process-step', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });

            gsap.from('.connector', {
                scaleX: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            number: '01',
            title: 'Research',
            description: 'Rigorous data collection to understand context and evidence.',
            icon: Search,
            color: 'text-secondary',
            bg: 'bg-secondary/10',
            border: 'border-secondary/20'
        },
        {
            number: '02',
            title: 'Communicate',
            description: 'Crafting compelling narratives that drive action.',
            icon: MessageSquare,
            color: 'text-accent',
            bg: 'bg-accent/10',
            border: 'border-accent/20'
        },
        {
            number: '03',
            title: 'Empower',
            description: 'Building capacity for lasting, sustainable impact.',
            icon: Zap,
            color: 'text-primary',
            bg: 'bg-primary/10',
            border: 'border-primary/20'
        }

    ];

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary mb-4">
                        How We Work
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">The Cycle of Impact</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We don't just study problems; we build the path to solutions.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[80px] left-[16%] right-[16%] h-[2px] bg-border connector origin-left z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="process-step relative z-10">
                                <div className={`glass-card p-8 h-full hover:scale-105 transition-all duration-300 border ${step.border} group`}>
                                    <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all`}>
                                        <Icon size={32} />
                                    </div>

                                    <div className="flex items-baseline gap-3 mb-3">
                                        <span className={`text-4xl font-bold ${step.color} opacity-20`}>{step.number}</span>
                                        <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow for mobile flow */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center py-4 text-muted-foreground/30">
                                        <ArrowRight size={32} className="rotate-90" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
