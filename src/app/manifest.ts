import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/app",

    name: "30 Day Me",
    short_name: "30-Me",
    description: "An app to help you track your 30 days of progress",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    orientation: "portrait-primary",
    dir: "auto",
    lang: "en",
    scope: "/",
    prefer_related_applications: false,
    related_applications: [],
    categories: ["productivity", "habit-tracking", "30-day-challenge"],
  };
}
