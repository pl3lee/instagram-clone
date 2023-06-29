import Navbar from "./components/Navbar";
import AuthProvider from "./contexts/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram Clone",
  description: "A clone of Instagram built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
