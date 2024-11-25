'use client'; // Ensure this runs as a client-side component
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<
    { left: string; animationDelay: string; animationDuration: string }[]
  >([]);

  useEffect(() => {
    const styles = new Array(number || 20).fill(true).map(() => ({
      left: Math.floor(Math.random() * 800 - 400) + "px", // Randomize left position
      animationDelay: (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2) + "s", // Random delay
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s", // Random duration
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-0 left-1/2 h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: "0",
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        ></span>
      ))}
    </>
  );
};
