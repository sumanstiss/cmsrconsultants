import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import cmsrLogo from '@/assets/CMSR Logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMouseAtTop, setIsMouseAtTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const SCROLL_THRESHOLD = 200; // High threshold - scroll 200px before hiding

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Show navigation if scrolled to top
      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show navigation if mouse is at top
      if (isMouseAtTop) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide navigation when scrolling down past threshold
      if (currentScrollY > SCROLL_THRESHOLD && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } 
      // Show navigation when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is in top 100px of viewport
      if (e.clientY < 100) {
        setIsMouseAtTop(true);
        setIsVisible(true);
      } else {
        setIsMouseAtTop(false);
        // Only hide if scrolled down past threshold and not scrolling up
        if (window.scrollY > SCROLL_THRESHOLD && window.scrollY > lastScrollY) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, isMouseAtTop]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.mobile-menu',
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.mobile-link',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Our Thinking', href: '/our-thinking' },
    { name: 'Projects', href: '/projects' },
    { name: 'Careers', href: '/careers' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Contact', href: '/location' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
      // Scroll to top when navigating to a new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled ? 'glass-nav-strong py-3' : 'glass-nav py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={cmsrLogo} 
              alt="CMSR Consultants" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isActive ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
            <Link
              to="/location"
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

          {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
          <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`mobile-link text-3xl font-light transition-colors duration-300 ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-800 hover:text-primary'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/location"
              onClick={() => setIsOpen(false)}
              className="mobile-link px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-4"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
