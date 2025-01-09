// src/app/layout.jsx

import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import ClientLayout from "@/components/ClientLayout";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etale Tech",
  description: "Blogs about tech and a touch of finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
