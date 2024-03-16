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
    "Major scale & chord progression exercise designed by Tim Johnson ∙ Web Application by Joe Sak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={cx(
          inter.className,
          "grid py-8 justify-center items-start h-screen"
        )}
      >
        {children}
        <div className="fixed bottom-0 p-4 dark:bg-black">
          Major scale & chord progression exercise designed by{" "}
          <a
            href="https://tljii.com"
            className="text-blue-600 dark:text-blue-400"
          >
            Tim Johnson
          </a>{" "}
          ∙ Web Application by{" "}
          <a
            href="https://joesak.com"
            className="text-blue-600 dark:text-blue-400"
          >
            Joe Sak
          </a>
        </div>
      </body>
    </html>
  );
}
