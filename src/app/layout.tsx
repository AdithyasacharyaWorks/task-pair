import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { AppWrapper } from "@/lib/userContextProvder";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management App",
  description: "Project Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <main className="">
          <AppWrapper>
            <Navbar />
            {children}
          </AppWrapper>
        </main>
      </body>
    </html>
  );
}
