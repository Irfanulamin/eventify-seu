import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommonNavbar } from "@/components/common/CommonNavbar";
import CircularText from "@/components/ui/circle_text";
import Beams from "@/components/ui/beams";

export default function Banner() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Beams
          beamWidth={2}
          beamHeight={18}
          beamNumber={26}
          speed={3}
          lightColor="#0096FF"
          noiseIntensity={1.5}
          scale={0.2}
          rotation={40}
        />
      </div>
      <CommonNavbar />
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Experience Where Events Come Alive
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 text-pretty">
            Connect with clubs, explore events, and never miss what’s happening
            around you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#mission">
              <Button variant="glow">Learn More</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline_glow">Register</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-12 right-12">
        <CircularText
          text="*UNIFIED*STUDENT*JOURNEY"
          onHover="speedUp"
          spinDuration={20}
          className="text-xs text-black"
        />
      </div>
    </div>
  );
}
