import Footer from "@/components/footer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://deezer-stats.tomheaton.dev"),
  title: "deezer-stats",
  description: "View your Deezer music stats!",
  authors: {
    name: "Tom Heaton",
    url: "https://tomheaton.dev",
  },
  twitter: {
    title: "deezer-stats",
    description: "View your Deezer music stats!",
    card: "summary",
    creator: "@tomheaton_",
  },
  openGraph: {
    title: "deezer-stats",
    description: "View your Deezer music stats!",
    type: "website",
    url: "https://deezer-stats.tomheaton.dev",
    locale: "en_GB",
    siteName: "deezer-stats",
  },
  keywords:
    "deezer stats, deezer, stats, music, history, favourites, top artists, top tracks",
  themeColor: "#a855f7",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
