import "@/styles/globals.css";

import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://deezer-stats.tomheaton.dev"),
  title: {
    template: "%s | Deezer Stats",
    default: "Deezer Stats",
  },
  description: "View your Deezer music stats!",
  authors: {
    name: "Tom Heaton",
    url: "https://tomheaton.dev",
  },
  twitter: {
    title: "Deezer Stats",
    description: "View your Deezer music stats!",
    card: "summary",
    creator: "@tomheaton_",
  },
  openGraph: {
    title: "Deezer Stats",
    description: "View your Deezer music stats!",
    type: "website",
    url: "https://deezer-stats.tomheaton.dev",
    locale: "en_GB",
    siteName: "Deezer Stats",
  },
  keywords:
    "deezer stats, deezer, stats, music, history, favourites, top artists, top tracks",
};

export const viewport: Viewport = {
  height: "device-height",
  width: "device-width",
  initialScale: 1,
  themeColor: "#a855f7",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
