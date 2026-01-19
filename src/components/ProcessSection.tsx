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



    return null;
};

export default ProcessSection;
