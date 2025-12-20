import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const section = sectionRef.current;

    // Form inputs animation
    gsap.fromTo(
      '.contact-input',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Info cards animation
    gsap.fromTo(
      '.contact-info',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Button animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] -bottom-40 -left-40 opacity-30" />
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] top-0 right-0 opacity-20" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Let's Work <span className="text-gradient-accent">Together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-input opacity-0">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input"
                placeholder="Your name"
              />
            </div>

            <div className="contact-input opacity-0">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="contact-input opacity-0">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="glass-input resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn contact-input opacity-0 w-full glass-card px-8 py-5 font-medium flex items-center justify-center gap-3 hover:border-secondary/40 transition-all duration-300 disabled:opacity-50 group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info-container space-y-6">
            <div className="contact-info glass-card opacity-0">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">CMSR Location</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    CMSR Consultants, Gold Tower, Wave One,<br />
                    Noida Sector 18, Noida,<br />
                    Uttar Pradesh, 201301<br />
                    <span className="text-secondary font-medium">Plus Code: H89F+W5 Noida, Uttar Pradesh</span>
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=H89F%2BW5+Noida+Uttar+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary hover:underline text-xs mt-2"
                  >
                    <ExternalLink size={12} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info glass-card opacity-0">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a 
                    href="mailto:gajendra@cmsrconsultants.com"
                    className="text-secondary hover:underline text-sm"
                  >
                    gajendra@cmsrconsultants.com
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="contact-info opacity-0">
              <div className="glass-card p-4 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Find Us</h4>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=H89F%2BW5+Noida+Uttar+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary hover:underline text-xs"
                  >
                    <ExternalLink size={14} />
                    Open in Maps
                  </a>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=H89F%2BW5+Noida+Uttar+Pradesh&output=embed"
                    width="100%"
                    height="300"
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

            {/* Social Links */}
            <div className="contact-info opacity-0 pt-6">
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://in.linkedin.com/company/cmsr-consultants-pvt-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 hover:border-secondary/40 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-secondary transition-colors duration-300" />
                </a>
                <a
                  href="mailto:gajendra@cmsrconsultants.com"
                  className="glass-card p-4 hover:border-secondary/40 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 group-hover:text-secondary transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
