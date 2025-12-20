import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Linkedin, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating particles
    gsap.to('.footer-particle', {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href === '#') {
      scrollToTop();
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-20 overflow-hidden border-t border-border/30"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle absolute w-2 h-2 rounded-full bg-secondary/40 top-1/4 left-1/4" />
        <div className="footer-particle absolute w-3 h-3 rounded-full bg-primary/30 top-1/3 right-1/3" />
        <div className="footer-particle absolute w-1.5 h-1.5 rounded-full bg-neon-cyan/40 bottom-1/4 left-1/2" />
        <div className="footer-particle absolute w-2.5 h-2.5 rounded-full bg-accent/30 top-1/2 right-1/4" />
        <div className="footer-particle absolute w-2 h-2 rounded-full bg-secondary/30 bottom-1/3 left-1/3" />
      </div>

      {/* Glow */}
      <div className="glow-orb w-[400px] h-[400px] -bottom-60 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="footer-content container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold tracking-tight mb-2">CMSR</div>
            <div className="text-sm text-muted-foreground">
              Social Impact Consultancy
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-secondary/50 hover:text-secondary transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-secondary/50 hover:text-secondary transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@cmsrconsultants.com"
              className="p-3 rounded-full border border-border/50 hover:border-secondary/50 hover:text-secondary transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CMSR Consultants. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-foreground transition-colors duration-300 group"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
