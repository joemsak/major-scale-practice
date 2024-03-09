import { Inter } from "next/font/google";
import cx from "clsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Chord Progression Practice Sheet",
  description:
    "Major scale & chrod progression exercise designed by Tim Johnson ∙ Web Application by Joe Sak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen">
      <body className={cx(inter.className, "h-screen")}>{children}</body>
    </html>
  );
}
