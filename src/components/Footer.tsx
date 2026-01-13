import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-primary text-primary-foreground pt-20 pb-10 overflow-hidden"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 footer-content">

          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-tight">CMSR Consultants</h2>
            <p className="text-primary-foreground/80 leading-relaxed max-w-xs">
              Catalyzing social equity and progressive change through rigorous research and strategic communication.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@cmsrconsultants.com"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Our Services', href: '/what-we-do' },
                { name: 'Our Projects', href: '/projects' },
                { name: 'Our Team', href: '/our-team' },
                { name: 'Careers', href: '/careers' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Expertise</h3>
            <ul className="space-y-4">
              {[
                'Social Impact Assessment',
                'Monitoring & Evaluation',
                'CSR Strategy',
                'Policy Research',
                'Capacity Building',
              ].map((service) => (
                <li key={service} className="text-primary-foreground/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>
                  New Delhi, India<br />
                  (Headquarters)
                </span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+91 XX XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>contact@cmsrconsultants.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} CMSR Consultants. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
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
