import Link from "next/link";
import { Button } from "@/components/ui/button";

import Beams from "@/components/ui/beams";
import { CommonNavbar } from "@/components/common/CommonNavbar";

export default function Banner() {
  return (
    <div className="relative w-full h-screen font-sans overflow-x-hidden">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Beams
          beamWidth={1.5}
          beamHeight={18}
          beamNumber={26}
          lightColor="#0000D0"
          speed={3}
          noiseIntensity={1}
          scale={0.2}
          rotation={20}
        />
      </div>

      {/* Transparent Navbar */}
      <CommonNavbar />
      {/* Banner Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Experience Where Events Come Alive
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 text-pretty">
            Connect, discover, and experience the pulse of every club in one
            place.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Link href="#mission">
              <Button variant="default">Learn More</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
