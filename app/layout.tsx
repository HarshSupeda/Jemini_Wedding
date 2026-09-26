import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jemini & Tejendra — Wedding Invitation",
  description: "The Tej of her love, the Jem of his heart; Bound together, never to part"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
