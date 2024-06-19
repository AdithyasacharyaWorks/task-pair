import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { AppWrapper } from "@/lib/userContextProvder";
import { getUserSession } from "@/lib/session";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management App",
  description: "Project Management Dashboard",
};


export default async  function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserSession()
  console.log(user)

  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <main className="">
          <AppWrapper>
            {user!== undefined && <Navbar />}
            {children}
          </AppWrapper>
        </main>
      </body>
    </html>
  );
}
