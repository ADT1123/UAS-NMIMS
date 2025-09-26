import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (isOpen) {
      gsap.fromTo('.mobile-menu', 
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="hover:scale-105 transition-transform duration-300"
            >
              <img src="/logo-Photoroom.png" alt="Logo" className="h-10 md:h-12" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <List size={24} className="text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="mobile-menu absolute right-0 top-0 h-full w-80 max-w-full glass-card rounded-l-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold gradient-text">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <X size={24} className="text-primary" />
              </button>
            </div>

            <nav className="space-y-6">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="mobile-nav-item block text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="mt-12 pt-8 border-t border-border/20">
              <p className="text-sm text-muted-foreground">
                Let's create something amazing together
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;