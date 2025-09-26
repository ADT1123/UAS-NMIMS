import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Progress bar animation
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        setProgress(progress);
      }
    });

    // Name animation
    tl.fromTo(".preloader-name", 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
      0.5
    );

    // ...existing code...

    tl.to(".preloader", {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-accent/20 blur-3xl float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-neon-cyan/20 blur-3xl float"></div>
      </div>

      <div className="relative z-10 text-center">
      <div className="preloader-name mb-8 flex justify-center">
  <img src="/logo-Photoroom.png" alt="Preloader Logo" className="h-24 md:h-40" />
</div>
        
        <div className="w-64 h-1 bg-muted/20 rounded-full overflow-hidden">
          <div 
            className="preloader-progress h-full loading-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
};

export default Preloader;