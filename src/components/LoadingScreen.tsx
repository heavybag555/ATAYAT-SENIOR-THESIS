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
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "fixed inset-0",
        "w-screen h-screen",
        "overflow-hidden",
        "cursor-pointer",
        "transition-opacity duration-300",
        isExiting && "opacity-0"
      )}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/landingscreen.png"
          alt="Landing Screen Background"
          fill
          className="object-cover w-full h-full"
          priority
          quality={100}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col items-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1
            className={clsx(
              "font-['Cordata']",
              "text-green-400",
              "text-center",
              "tracking-[0.2em]",
              "relative"
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
              "mt-[10px]",
              "relative"
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
            "text-green-400/50",
            "text-sm",
            "tracking-[0.2em]",
            "absolute",
            "bottom-8"
          )}
        >
          &lt;click anywhere on the screen to enter&gt;
        </div>
      </div>
    </div>
  );
}
