import { Inter } from "next/font/google";
import cx from "clsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Major Scale Practice Sheet",
  description: "Major scale exercise designed by Tim Johnson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen">
      <body className={cx(inter.className, "h-screen")}>{children}</body>
    </html>
  );
}
