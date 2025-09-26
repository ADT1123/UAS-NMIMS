import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      icon: "fa-pencil-square-o",
      title: "We Design",
      description: "The design determines the quality of the end product by considering all the related factors.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: "fa-code", 
      title: "We Develop",
      description: "Development being the most crucial stage has to be done with the right set of tools and skills both.",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: "fa-lightbulb-o",
      title: "We Collaborate",
      description: "Our expertise lets us impart knowledge and collaborate with those who need help in the field.",
      gradient: "from-orange-500 to-yellow-400"
    }
  ];

  // Mouse follow cursor [web:134][web:137]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(".section-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Section line animation
      gsap.fromTo(".section-line",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-line",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // About text animation
      gsap.fromTo(".about-text p",
        { opacity: 0, x: -50, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature cards crazy stagger animation
      gsap.fromTo(".feature-card",
        { 
          opacity: 0, 
          y: 100,
          rotationX: -20,
          scale: 0.8,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Icon animation inside cards
      gsap.fromTo(".feature-icon i",
        { 
          scale: 0,
          rotation: 180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.75)",
          delay: 0.5,
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card tilt effect [web:135][web:141]
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLDivElement) => {
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center"
    });

    // Cursor grows on card hover [web:143]
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 3,
        duration: 0.3
      });
    }
  };

  const handleCardMouseLeave = (cardRef: HTMLDivElement) => {
    gsap.to(cardRef, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Cursor back to normal [web:140]
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3
      });
    }
  };

  // Interactive background particles [web:131]
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const particles = document.querySelectorAll('.bg-particle');
    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.02;
      const x = e.clientX * speed;
      const y = e.clientY * speed;
      
      gsap.to(particle, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    });
  };

  return (
    <>
      {/* Custom Cursor */}


      <section 
        ref={sectionRef}
        className="about-section min-h-screen py-20 px-4 relative overflow-hidden"
        id="about"
        onMouseMove={handleSectionMouseMove}
      >
        {/* Interactive Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-particle absolute w-2 h-2 bg-blue-400/20 rounded-full top-1/4 left-1/4"></div>
          <div className="bg-particle absolute w-1 h-1 bg-purple-400/30 rounded-full top-3/4 left-3/4"></div>
          <div className="bg-particle absolute w-3 h-3 bg-cyan-400/10 rounded-full top-1/2 right-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-header text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
              About Our <span className="text-blue-500">Team</span>
            </h2>
            <div className="section-line h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-xs"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Content */}
            <div ref={contentRef} className="about-left">
              <div className="about-text space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed cursor-pointer hover:text-white transition-colors duration-300">
                  Team UAS NMIMS is a student group that aims at developing and fabricating Unmanned Aerial Systems. Through detailed studies and practical experience in the field, we believe in researching and developing highly advanced systems by integrating advanced modules.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed cursor-pointer hover:text-white transition-colors duration-300">
                  <strong className="text-orange-400 hover:text-orange-300 transition-colors duration-300">BlackPeafowl (hexacopter)</strong> being our UAV for the 16th AUVSI's SUAS International Competition secured <strong className="text-green-400 hover:text-green-300 transition-colors duration-300">5th rank</strong> worldwide out of 70+ teams that participated from all over the world.
                </p>
              </div>
            </div>

            {/* Interactive Feature Cards */}
            <div className="about-right">
              <div className="feature-cards space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    ref={el => {
                      if (el) {
                        el.onmousemove = (e) => handleCardMouseMove(e, el);
                        el.onmouseleave = () => handleCardMouseLeave(el);
                      }
                    }}
                    className="feature-card group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-start gap-4 relative">
                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 blur-xl`}></div>
                      
                      <div className={`feature-icon w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                        <i className={`fa ${feature.icon} text-white text-xl group-hover:scale-110 transition-transform duration-300`}></i>
                      </div>
                      
                      <div className="feature-content relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1">
                          {feature.description}
                        </p>
                      </div>

                      {/* Interactive corner indicators */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-2 left-16 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="ripple absolute w-0 h-0 bg-white/20 rounded-full group-active:w-full group-active:h-full transition-all duration-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
