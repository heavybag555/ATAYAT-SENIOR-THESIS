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
      router.push("/grid");
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
        "z-[9999]", // Increase z-index to ensure it's above everything
        "bg-black", // Add black background
        isExiting && "opacity-0"
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
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
              "text-[#78C0E0]",
              "text-center",
              "tracking-[0.2em]",
              "relative",
              "[text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]"
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
              "text-[#78C0E0]",
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

        <button
          className={clsx(
            "neon-button",
            "absolute",
            "bottom-8",
            "font-['Cordata']"
          )}
          style={{
            fontSize: "10pt",
            color: "rgb(120, 192, 224)",
            backgroundColor: "black",
            border: "1px solid rgb(120, 192, 224)",
            padding: "6px 12px 4px 12px",
            borderRadius: "20px",
            textDecoration: "none",
            display: "inline-block",
            margin: "0",
            letterSpacing: "2px",
            transition: "all 0.1s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "black";
            e.currentTarget.style.backgroundColor = "rgb(120, 192, 224)";
            e.currentTarget.style.color = "black";
            e.currentTarget.style.cursor = "pointer";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgb(120, 192, 224)";
            e.currentTarget.style.backgroundColor = "black";
            e.currentTarget.style.color = "rgb(120, 192, 224)";
          }}
        >
          ENTER-ARCHIVE
        </button>
      </div>
    </div>
  );
}
