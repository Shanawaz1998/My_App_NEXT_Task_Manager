import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/CustomNavbar";
import AuthProvider from "@/helper/SessionProvider";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <CustomNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
