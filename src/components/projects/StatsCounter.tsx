import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatsCounterProps {
    value: number;
    label: string;
    suffix?: string;
    className?: string;
    color?: string; // Optional custom color for the number
}

const StatsCounter = ({ value, label, suffix = '', className = '', color }: StatsCounterProps) => {
    const [count, setCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create animation function for reuse
        const animate = () => {
            const obj = { val: count }; // Start from current count to animate smoothly
            gsap.fromTo(obj,
                { val: 0 }, // Always start from 0 for clear "data refresh" effect, or remove this line to animate from current. 
                // User requested "counter will change to number", implies counting up/down. 
                // Let's count from 0 to feel like a "refresh".
                {
                    val: value,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        setCount(Math.floor(obj.val));
                    },
                    onComplete: () => {
                        setCount(value);
                    },
                }
            );
        };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 85%',
            onEnter: () => {
                animate();
            },
        });

        // If we are already ensuring the trigger is recreated on value change, 
        // ScrollTrigger checks position immediately. 
        // If element is in view, onEnter fires. 

        return () => trigger.kill();
    }, [value]);

    return (
        <div
            ref={containerRef}
            className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow ${className}`}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline mb-2">
                    <span
                        className={`text-4xl md:text-5xl font-bold font-serif tracking-tight ${color ? '' : 'text-primary'}`}
                        style={color ? { color } : undefined}
                    >
                        {count}
                    </span>
                    {suffix && <span className="text-2xl md:text-3xl font-bold text-secondary ml-1">{suffix}</span>}
                </div>
                <span className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-wide">
                    {label}
                </span>
            </div>
        </div>
    );
};

export default StatsCounter;
