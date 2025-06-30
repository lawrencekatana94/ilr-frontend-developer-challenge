import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/layouts/Sidebar';
import Header from "@/components/layouts/Header";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contract Management System",
  description: "Dashboard for contract management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              
              <main className="flex-1 flex flex-col overflow-auto">
                <Header />
                <div className="flex-1 p-4 md:p-6 overflow-auto bg-muted/40 dark:bg-muted/20">
                  {children}
                </div>
              </main>
            </div>
          </ThemeProvider>
        
      </body>
    </html>
  );
}
