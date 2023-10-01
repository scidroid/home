import Image from "next/image";

import headshot from "@/public/headshot.jpg";
import { NowPlaying } from "./NowPlaying";
import { HealthData } from "./Health";

export function Profile() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white p-8 m-4 max-w-xl mx-auto shadow-2xl rounded-xl">
      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-lg mb-6">
          <Image
            src={headshot}
            className="absolute inset-0"
            alt="A selfie of Juan Almanza"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Juan Almanza
        </h1>
        <h2 className="text-2xl font-bold text-gray-600 mb-4">
          High School Junior
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Passionate High School student with solid leadership and engineering
          skills. Focused on creating solutions for rural populations and
          advocating for STEM education, gender equality, and climate crisis.
        </p>
        <NowPlaying />
        <HealthData />
      </div>
    </div>
  );
}
