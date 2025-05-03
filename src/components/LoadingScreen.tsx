"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to grid view
    router.push("/grid");
  }, [router]);

  // Return null (no UI)
  return null;
}
