"use client";

import { Button } from "@/components/ui/button";

export default function LearnMoreButton() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="transform border-2 text-lg font-semibold shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      onClick={scrollToFeatures}
    >
      Learn More
    </Button>
  );
}
