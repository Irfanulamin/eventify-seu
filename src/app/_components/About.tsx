"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import CircularText from "@/components/ui/circle_text";
import Threads from "@/components/ui/thread";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const missionTitleRef = useRef<HTMLHeadingElement>(null);
  const missionTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const studentFriendlyRef = useRef<HTMLDivElement>(null);
  const seamlessAppsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Titles
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.3"
      );

      // Stats
      tl.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.2"
      );

      // Section Title
      gsap.fromTo(
        sectionTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionTitleRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bento Items
      gsap.utils.toArray(".bento-item").forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            delay: index * 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.02,
            filter: "blur(0px) brightness(1.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Mission Title
      gsap.fromTo(
        missionTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionTitleRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA (kept as fixed)
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Student Friendly
      gsap.fromTo(
        studentFriendlyRef.current,
        { opacity: 0, x: 100, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: studentFriendlyRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Seamless Apps
      gsap.fromTo(
        seamlessAppsRef.current,
        { opacity: 0, x: 100, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: seamlessAppsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, bentoRef.current as any);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const button = document.querySelector(".cta-button");
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const bentoItems = [
    {
      id: 1,
      image: "/1.jpg",
      alt: "Student Clubs Collaboration",
      size: "col-span-2 row-span-1",
    },
    {
      id: 2,
      image: "/2.jpg",
      alt: "Campus Updates",
      size: "col-span-1 row-span-1",
    },
    {
      id: 3,
      image: "/3.jpg",
      alt: "Growth and Activities",
      size: "col-span-1 row-span-1",
    },
    {
      id: 4,
      image: "/4.jpg",
      alt: "Creative Student Events",
      size: "col-span-2 row-span-1",
    },
    {
      id: 5,
      image: "/5.jpg",
      alt: "Club Diversity",
      size: "col-span-1 row-span-1",
    },
    {
      id: 6,
      image: "/6.jpg",
      alt: "Campus Community",
      size: "col-span-1 row-span-1",
    },
    {
      id: 7,
      image: "/7.jpg",
      alt: "Digital Hub",
      size: "col-span-1 row-span-1",
    },
    {
      id: 8,
      image: "/8.jpg",
      alt: "Innovation and Ideas",
      size: "col-span-1 row-span-1",
    },
    {
      id: 9,
      image: "/9.jpg",
      alt: "Technology for Students",
      size: "col-span-2 row-span-1",
    },
    {
      id: 10,
      image: "/10.jpg",
      alt: "Connected Campus",
      size: "col-span-2 row-span-1",
    },
    {
      id: 11,
      image: "/11.jpg",
      alt: "University Spirit",
      size: "col-span-2 row-span-1",
    },
  ];
  return (
    <div
      id="about"
      className="bg-gradient-to-b from-black to-slate-950 text-white py-16 overflow-hidden"
    >
      {/* Crown */}
      <div className="container mx-auto px-4 text-center mb-8">
        <div ref={sectionTitleRef}>
          <CircularText
            text="*UNIFIED*STUDENT*JOURNEY"
            onHover="speedUp"
            spinDuration={20}
            className="text-xs"
          />
        </div>
      </div>
      {/* Header */}
      <div ref={headerRef} className="container mx-auto px-4 text-center mb-16">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white"
        >
          Why Choose Eventify SEU?
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
        >
          Eventify SEU brings together all 15+ clubs and organizations of
          Southeast University in one platform. No more following scattered
          Facebook groups or messy messenger updates — get every event, update,
          and application opportunity in one place.
        </p>
        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-8 text-sm text-gray-400"
        >
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/30 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <span className="text-2xl font-bold text-white">15+</span>
            <span>Active Clubs</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/30 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <span className="text-2xl font-bold text-white">1000+</span>
            <span>Students Connected</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/30 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <span className="text-2xl font-bold text-white">Unlimited</span>
            <span>Opportunities to Join</span>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          color={[0, 0, 1]}
        />
      </div>
      <section
        ref={bentoRef}
        className="container mx-auto px-4 py-12 hidden md:block"
      >
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] max-w-7xl mx-auto">
          {bentoItems.map((item) => (
            <div
              key={item.id}
              className={`bento-item ${item.size} relative overflow-hidden shadow-lg rounded-xl transition-all duration-300 cursor-pointer`}
            >
              <Image
                src={item.image}
                width={400}
                height={400}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/05 to-black/80"></div>
            </div>
          ))}
        </div>
      </section>
      {/* Mission */}
      <div id="mission" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                ref={missionTitleRef}
                className="text-3xl md:text-4xl font-bold mb-6 text-white 
             bg-primary/10 backdrop-blur-md rounded-lg p-4"
              >
                Our Mission
              </h2>

              <div>
                <p
                  ref={missionTextRef}
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                >
                  This platform is built for Southeast University students — by
                  SEUians, for SEUians. Say goodbye to the hassle of scattered
                  announcements. No more jumping between Facebook, Messenger, or
                  random group chats — Eventify SEU centralizes every update so
                  thousands of SEUians stay informed in one place.
                </p>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Every announcement, every workshop, every competition — now
                comes straight to you, in one platform built by students, for
                students.
              </p>
            </div>

            <div className="space-y-6">
              <div
                ref={studentFriendlyRef}
                className="border-l-4 border-blue-500 pl-6 p-4 rounded-r-lg bg-slate-900"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-300">
                  Student Friendly
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Designed with students in mind, Eventify SEU makes it easier
                  than ever to explore opportunities, join clubs, and engage
                  with activities that truly matter to you. Simple, intuitive,
                  and built on real student needs.
                </p>
              </div>

              <div
                ref={seamlessAppsRef}
                className="border-l-4 border-green-500 pl-6 p-4 rounded-r-lg bg-slate-900"
              >
                <h3 className="text-xl font-semibold mb-3 text-green-300">
                  Seamless Applications
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Found an event that excites you? Just hit{" "}
                  <span className="font-medium border border-white px-2 py-1 rounded-full text-white text-sm">
                    Apply Now
                  </span>{" "}
                  — no confusing steps, no scattered forms. Eventify SEU ensures
                  every SEUian can register for workshops, competitions, and
                  events in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-16 text-center bg-slate-900 rounded-2xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Get Involved?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Eventify SEU makes it easy to discover, follow, and join student
              activities across Southeast University. Don’t miss your chance to
              be part of the action.
            </p>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm italic">
              Have a suggestion, feature idea, or review? Share your thoughts
              with us — your feedback helps shape the future of Eventify SEU.
            </p>
            <Button variant="outline" className="cta-button">
              Leave a Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
