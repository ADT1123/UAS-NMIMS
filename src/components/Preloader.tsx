import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const CleanPreloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.fromTo(logoRef.current,
      { 
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)"
      }
    )

    // Connection line drawing
    .fromTo(pathRef.current,
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      { strokeDashoffset: "0", duration: 2.5, ease: "power2.out" },
      0.5
    )

    // Progress counter animation
    .to({}, {
      duration: 3,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    }, 0.8)

    // Exit animation
    .to([logoRef.current, '.connection-line', counterRef.current], {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.in"
    }, "+=0.5")

    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => onComplete()
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
<div 
  ref={preloaderRef}
  className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900"

>

      {/* Logo */}
      <img 
        ref={logoRef}
        src="/logo-Photoroom.png" 
        alt="Team UAS Logo" 
        className="h-24 md:h-32 mb-12 filter drop-shadow-lg"
      />

      {/* Progress Counter */}
      <div 
        ref={counterRef}
        className="text-center"
      >
        <div className="text-6xl md:text-7xl font-bold text-white mb-2 font-mono tracking-wider">
          {progress}%
        </div>
        <div className="text-white/70 text-lg tracking-wide">
          Preparing website...
        </div>
      </div>
    </div>
  );
};

export default CleanPreloader;
