import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unseen",
  description: "Turn real-life experience into structured career proof",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
