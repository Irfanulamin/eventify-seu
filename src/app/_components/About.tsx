"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const missionTitleRef = useRef<HTMLHeadingElement>(null);
  const studentFriendlyRef = useRef<HTMLDivElement>(null);
  const seamlessAppsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollDefaults = {
        start: "top 70%",
        toggleActions: "play none none reverse",
        ease: "power2.out",
      };

      const fadeInUp = (el: any, delay = 0) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay,
            scrollTrigger: { ...scrollDefaults, trigger: el },
          }
        );

      const fadeInLeft = (el: any, delay = 0) =>
        gsap.fromTo(
          el,
          { opacity: 0, x: 100, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.5,
            delay,
            scrollTrigger: { ...scrollDefaults, trigger: el },
          }
        );

      fadeInUp(sectionTitleRef.current);
      gsap.utils.toArray(".bento-item").forEach((item: any, i) => {
        fadeInUp(item, i * 0.05);

        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.03,
            filter: "brightness(1.1)",
            duration: 0.3,
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, { scale: 1, filter: "brightness(1)", duration: 0.3 });
        });
      });

      fadeInUp(missionTitleRef.current);
      fadeInLeft(studentFriendlyRef.current);
      fadeInLeft(seamlessAppsRef.current, 0.1);
      fadeInUp(ctaRef.current);
    }, bentoRef.current as any);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="about"
      className="bg-gradient-to-b from-slate-950 via-gray-950 to-black text-white py-16 lg:py-32 overflow-hidden"
    >
      <div ref={sectionTitleRef} className="mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
          Why Choose Eventify SEU?
        </h1>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Eventify SEU brings together all 15+ clubs and organizations of
          Southeast University in one platform. No more following scattered
          Facebook groups or messy messenger updates — get every event, update,
          and application opportunity in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/15 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <p className="text-2xl font-bold text-white">15+</p>
            <p>Active Clubs</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/15 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <p className="text-2xl font-bold text-white">1000+</p>
            <p>Students Connected</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-blue-900/15 border border-blue-700/50 backdrop-blur-md hover:border-blue-500/70 transition-all duration-300">
            <p className="text-2xl font-bold text-white">Unlimited</p>
            <p>Opportunities to Join</p>
          </div>
        </div>
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
                className="w-full h-full object-cover transition-transform duration-300 aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/05 to-black/80"></div>
            </div>
          ))}
        </div>
      </section>

      <div id="mission" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                ref={missionTitleRef}
                className="text-3xl md:text-4xl font-bold mb-6 text-white bg-primary/5 backdrop-blur-md rounded-lg p-4"
              >
                Our Mission
              </h2>
              <div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
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
                    Register
                  </span>{" "}
                  — no confusing steps, no scattered forms. Eventify SEU ensures
                  every SEUian can register for workshops, competitions, and
                  events in seconds.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="mt-16 text-center bg-slate-900/10 backdrop-blur-3xl rounded-2xl p-8 border border-slate-700"
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
            <Link
              href="https://forms.gle/f6PCbuLjjg5VfBCF9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="cta-button">
                Leave a Review
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
