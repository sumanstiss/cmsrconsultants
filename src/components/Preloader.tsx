import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.to(
      progressBarRef.current,
      {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          setPercent(progress);
        },
      },
      '-=0.3'
    );

    // Fade out sequence
    tl.to(logoRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power2.in',
    });

    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          onComplete();
        },
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] -top-40 -left-40 animate-glow-pulse" />
        <div className="glow-orb glow-orb-accent w-[500px] h-[500px] -bottom-32 -right-32 animate-glow-pulse animation-delay-400" />
        <div className="glow-orb glow-orb-gold w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse animation-delay-200" />
      </div>

      {/* Logo & Progress */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <div className="mb-12">
          <div className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-foreground">CMSR</span>
          </div>
          <div className="text-sm md:text-base text-muted-foreground tracking-[0.3em] mt-2 text-center">
            CONSULTANTS
          </div>
        </div>

        {/* Progress Container */}
        <div className="w-64 md:w-80">
          {/* Progress Bar Background */}
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--neon-cyan)) 100%)',
              }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-4 text-center">
            <span
              ref={percentRef}
              className="text-2xl md:text-3xl font-light text-muted-foreground tabular-nums"
            >
              {percent}%
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 tracking-widest uppercase">
        Loading Experience
      </div>
    </div>
  );
};

export default Preloader;
