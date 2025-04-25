"use client";

import { useRouter } from "next/navigation";
import { clsx } from "clsx/lite";
import { useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/grid');
    }, 300); // Match this with CSS transition duration
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "fixed inset-0 z-50",
        "flex flex-col items-center justify-between",
        "min-h-screen w-full",
        "cursor-pointer",
        "transition-opacity duration-300",
        "relative", // Added for proper layering
        isExiting && "opacity-0"
      )}
    >
      {/* Background Image Layer */}
      <Image
        src="/landingscreen.png"
        alt="Landing Screen Background"
        fill
        className="object-cover"
        priority
        quality={100}
        width={1920} // Add this
        height={1080} // Add this
      />

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <h1
          className={clsx(
            "font-['Cordata']",
            "text-green-400",
            "text-center",
            "tracking-[0.2em]"
          )}
          style={{
            fontSize: "36pt",
            lineHeight: "30pt",
            textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
          }}
        >
          A TALE AS YOUNG AS TIME
        </h1>

        <h2
          className={clsx(
            "text-green-400",
            "text-center",
            "tracking-[0.2em]",
            "mt-[10px]"
          )}
          style={{
            fontSize: "18pt",
            textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
          }}
        >
          A BUM DIARY PHOTO ARCHIVE AND CAPSULE
        </h2>
      </div>

      <div
        className={clsx(
          "relative z-10", // Added for proper layering
          "text-green-400/50",
          "text-sm",
          "tracking-[0.2em]",
          "mb-8"
        )}
      >
        &lt;click anywhere on the screen to enter&gt;
      </div>
    </div>
  );
}
