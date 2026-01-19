import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import cmsrLogo from '@/assets/CMSR_Logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const SCROLL_THRESHOLD = 200;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Show navigation if scrolled to top
      if (currentScrollY < 20) {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    { name: 'About Us', href: '/our-thinking' },
    { name: 'Our Services', href: '/what-we-do' },
    { name: 'Projects', href: '/projects' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Resources', href: '/careers' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-gray-100'
            : 'bg-white/50 backdrop-blur-sm py-4'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
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
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`text-sm font-medium transition-colors duration-300 relative group font-sans ${isActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              );
            })}

            <Link
              to="/location"
              className="px-6 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-40 md:hidden bg-white">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
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
                  className={`mobile-link text-2xl font-serif transition-colors duration-300 ${isActive ? 'text-primary font-bold' : 'text-gray-800 hover:text-primary'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/location"
              onClick={() => setIsOpen(false)}
              className="mobile-link px-8 py-3 bg-secondary text-primary rounded-full text-lg font-bold hover:bg-secondary/90 transition-transform duration-300 hover:scale-105 mt-4"
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

