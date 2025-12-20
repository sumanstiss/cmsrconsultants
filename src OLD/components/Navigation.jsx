import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/who-we-are', label: 'Who we are' },
    { path: '/what-we-do', label: 'What we do' },
    { path: '/Projects', label: 'Our Projects' },
    { path: '/our-thinking', label: 'Our Thinking' },
    { path: '/our-team', label: 'Our team' },
    { path: '/careers', label: 'Careers' },
    { path: '/location', label: 'Location' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="https://cmsrconsultants.com/img/logo.png"
              alt="CMSR Consultants - Fostering Sustainable Partnership"
              className="h-10 sm:h-12 md:h-14 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
            <Link
              to="/location"
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium py-2 ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-primary text-white px-6 py-2 rounded-lg font-medium text-center mt-4"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

