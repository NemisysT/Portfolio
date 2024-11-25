import React from "react";
import { Meteors } from "./meteors"; // Assuming Meteors component is located here

export function SoftSkillsDemo() {
  return (
    <div className="space-y-12">
      {/* Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {/* Public Speaking */}
        <div className="w-full relative max-w-xs">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>

            <h1 className="font-bold text-xl text-white mb-4 relative z-50">Public Speaking</h1>
            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              I had the privilege of hosting Investiture 2022, where I addressed over 750 people, maintaining a positive, energetic atmosphere throughout.
            </p>

            {/* Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>

        {/* Leadership */}
        <div className="w-full relative max-w-xs">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>

            <h1 className="font-bold text-xl text-white mb-4 relative z-50">Leadership</h1>
            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              As the leader during Investiture 2022, I coordinated teams, delegated tasks, and ensured everything ran smoothly to deliver a successful event.
            </p>

            {/* Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>

        {/* Event Hosting */}
        <div className="w-full relative max-w-xs">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>

            <h1 className="font-bold text-xl text-white mb-4 relative z-50">Event Hosting</h1>
            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              I successfully organized Ideathon&apos;24, managing speakers, schedules, and participant engagement, ensuring everything ran seamlessly.
            </p>

            {/* Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
