import type { Metadata, Viewport } from "next";
import "./globals.css";
import ZoomLock from "./components/ZoomLock";

export const metadata: Metadata = {
  title: "Jethro & Francisca — Wedding Invitation",
  description:
    "You are cordially invited to the wedding celebration of Jethro & Francisca",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ZoomLock />
        {children}
      </body>
    </html>
  );
}
