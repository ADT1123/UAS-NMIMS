import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Hero content animations
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 100, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
      );
      
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
      
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );

      // Floating animations for background elements
      gsap.to(".float-orb-1", {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".float-orb-2", {
        y: 20,
        x: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".float-orb-3", {
        y: -20,
        x: 25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-feaDKB6PYpk6XioqoBwpRu70/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Background floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="float-orb-1 absolute top-1/4 left-1/6 w-40 h-40 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="float-orb-2 absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="float-orb-3 absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-neon-cyan/10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Team UAS NMIMS{' '}
          <span className="gradient-text"></span>
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl"></span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Developing cutting edge Drone Technologies.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg font-semibold pulse-glow"
          >
            Follow us
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="glass border-primary/30 hover:border-primary/60 px-8 py-6 text-lg"
          >
            View Work
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;