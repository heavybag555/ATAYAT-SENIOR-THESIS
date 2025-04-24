"use client";

import Link from "next/link";
import { clsx } from "clsx/lite";

export default function LoadingScreen() {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        "bg-black",
        "flex flex-col items-center justify-center",
        "min-h-screen w-full"
      )}
    >
      <h1
        className={clsx(
          "font-['Paradise132']",
          "text-green-400",
          "text-center",
          "tracking-[0.2em]"
        )}
        style={{
          fontSize: "36pt",
          textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
        }}
      >
        A TALE AS YOUNG AS TIME
      </h1>

      <div className="flex gap-4 mt-8">
        <Link
          href="/grid" // Updated to correct grid route path
          className={clsx(
            "px-6 py-2",
            "border border-green-400",
            "text-green-400",
            "hover:bg-green-400 hover:text-black",
            "transition-colors duration-200",
            "tracking-[0.2em]"
          )}
        >
          GALLERY
        </Link>

        <Link
          href="/feed"
          className={clsx(
            "px-6 py-2",
            "border border-green-400",
            "text-green-400", 
            "hover:bg-green-400 hover:text-black",
            "transition-colors duration-200",
            "tracking-[0.2em]"
          )}
        >
          FEED
        </Link>
      </div>
    </div>
  );
}
