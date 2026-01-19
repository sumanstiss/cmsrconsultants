import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, MessageSquareText, Zap } from 'lucide-react';
import cmsrLogo from '@/assets/CMSR_Logo.png';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      // Desktop Setup
      runAnimation(160);
    });

    mm.add("(max-width: 639px)", () => {
      // Mobile Setup
      runAnimation(112);
    });

    function runAnimation(gap: number) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onComplete
          });
        }
      });

      // Initial setup: Logo faded out
      gsap.set('.header-logo', { opacity: 0, y: -20 });

      // Items setup: All hidden initially
      gsap.set(itemsRef.current, { opacity: 0, scale: 0.5 });

      // Animation Sequence

      // 1. Logo Enter
      tl.to('.header-logo', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // 2. Evidence (Item 0) Enters Center (at +gap)
      gsap.set(itemsRef.current[0], { x: gap, opacity: 0, scale: 0 });
      // Show Evidence (Centered) at Scale 1
      tl.to(itemsRef.current[0], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, 'sequenceStart'); // Start together

      // Wait a bit
      tl.to({}, { duration: 0.5 });

      // Slide Evidence Left (to 0) AND Shrink to 75%
      tl.to(itemsRef.current[0], {
        x: 0,
        scale: 0.75,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 'slide1');

      // Insight appears at Center (natural position 0) at 100% scale
      gsap.set(itemsRef.current[1], { x: 0, opacity: 0, scale: 0 });
      tl.to(itemsRef.current[1], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, 'slide1+=0.3');

      // Insight shrinks to 75%
      tl.to(itemsRef.current[1], {
        scale: 0.75,
        duration: 0.4,
        ease: 'power2.inOut'
      });

      // Wait
      tl.to({}, { duration: 0.5 });

      // Impact appears at Right (natural position 0) at 100% scale
      gsap.set(itemsRef.current[2], { x: 0, opacity: 0, scale: 0 });
      tl.to(itemsRef.current[2], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      // Impact shrinks to 75%
      tl.to(itemsRef.current[2], {
        scale: 0.75,
        duration: 0.4,
        ease: 'power2.inOut'
      });

      // Hold final state
      tl.to({}, { duration: 1 });

      // Exit Up
      tl.to('.header-logo', { y: -20, opacity: 0, duration: 0.4 }, 'exit');
      tl.to(itemsRef.current, { y: -20, opacity: 0, stagger: 0.1, duration: 0.4 }, 'exit');
    }

    return () => {
      // mm.revert() is called automatically? 
      // It's good practice to revert matchMedia on unmount.
      mm.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      {/* Header Logo */}
      <div className="header-logo absolute top-10 sm:top-1/4 opacity-0">
        <img
          src={cmsrLogo}
          alt="CMSR Consultants"
          className="w-auto h-16 sm:h-20 object-contain"
        />
      </div>



      {/* Items Container */}
      <div className="flex items-center justify-center gap-8 sm:gap-16 mt-20 sm:mt-0">

        {/* Evidence */}
        <div ref={el => { itemsRef.current[0] = el; }} className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-900 flex items-center justify-center text-white shadow-lg">
            <Search size={40} strokeWidth={1.5} />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-blue-900 tracking-wide">Evidence</span>
        </div>

        {/* Insight */}
        <div ref={el => { itemsRef.current[1] = el; }} className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-900 flex items-center justify-center text-white shadow-lg">
            <MessageSquareText size={40} strokeWidth={1.5} />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-blue-900 tracking-wide">Insight</span>
        </div>

        {/* Impact */}
        <div ref={el => { itemsRef.current[2] = el; }} className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-900 flex items-center justify-center text-white shadow-lg">
            <Zap size={40} strokeWidth={1.5} />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-blue-900 tracking-wide">Impact</span>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
