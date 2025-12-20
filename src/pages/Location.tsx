import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Globe, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll('.animate-in'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6">
              LOCATION & CONTACT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with us to discuss how we can work together to create positive social impact
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Details */}
            <div className="animate-in">
              <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="glass-card p-6 flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-300 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <div className="space-y-2">
                      <a 
                        href="mailto:gajendra@cmsrconsultants.com" 
                        className="block text-secondary hover:underline"
                      >
                        gajendra@cmsrconsultants.com
                      </a>
                      <a 
                        href="mailto:info@cmsrconsultants.com" 
                        className="block text-secondary hover:underline"
                      >
                        info@cmsrconsultants.com
                      </a>
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=gajendra@cmsrconsultants.com&su=Inquiry from CMSR Website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-secondary hover:underline text-sm"
                      >
                        <ExternalLink size={14} />
                        Send via Gmail
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-300 flex-shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Website</h3>
                    <a
                      href="https://cmsrconsultants.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      cmsrconsultants.com
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-300 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground mb-2">
                      CMSR Consultants, Gold Tower, Wave One,<br />
                      Noida Sector 18, Noida,<br />
                      Uttar Pradesh, 201301<br />
                      <span className="text-secondary font-medium">Plus Code: H89F+W5 Noida, Uttar Pradesh</span>
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=H89F%2BW5+Noida+Uttar+Pradesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-secondary hover:underline text-sm"
                    >
                      <ExternalLink size={14} />
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-all duration-300 flex-shrink-0">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Connect with Us</h3>
                    <a
                      href="https://in.linkedin.com/company/cmsr-consultants-pvt-ltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline flex items-center gap-1"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-in">
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              <form className="glass-card p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button variant="neon" className="w-full" type="submit">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* National Footprint */}
          <div className="animate-in glass-card p-12 mb-16 bg-gradient-to-r from-secondary/20 to-accent/20 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">National Footprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">24+</div>
                <div className="text-xl text-muted-foreground">States & UTs</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">2.5L+</div>
                <div className="text-xl text-muted-foreground">Individuals engaged</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground mb-2">25K+</div>
                <div className="text-xl text-muted-foreground">Stakeholders trained</div>
              </div>
            </div>
          </div>

          {/* Address & Map Section */}
          <div className="animate-in mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Visit Us</h2>
            <div className="glass-card p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Office Address</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  CMSR Consultants, Gold Tower, Wave One,<br />
                  Noida Sector 18, Noida,<br />
                  Uttar Pradesh, 201301<br />
                  <span className="text-secondary font-medium">Plus Code: H89F+W5 Noida, Uttar Pradesh</span>
                </p>
              </div>
              
              {/* Google Map */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Location Map</h4>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=H89F%2BW5+Noida+Uttar+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary hover:underline text-sm"
                  >
                    <ExternalLink size={14} />
                    Open in Maps
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=H89F%2BW5+Noida+Uttar+Pradesh&output=embed"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="CMSR Consultants Location - H89F+W5 Noida, Uttar Pradesh"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="animate-in text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/20 text-accent mb-6">
              PARTNERS
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-6">Selected Clients</h2>
            <p className="text-lg text-muted-foreground mb-8">
              AIF, UNICEF, Save the Children, GIZ, CARE, HDFC Bank Parivartan, NIUA, WRI India, Johns Hopkins BSPH, TATA Trusts, Deloitte, Palladium, Cornell University, and more.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Location;
