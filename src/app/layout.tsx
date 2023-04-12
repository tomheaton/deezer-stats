import Footer from "@/components/footer";
import "@/styles/globals.css";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "deezer-stats",
  description: "deezer-stats",
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
