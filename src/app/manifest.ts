import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
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
        sizes: "1440x1407",
        type: "image/png",
      },
    ],
  };
}
