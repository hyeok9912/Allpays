"use client";
import "./globals.css";
import Header from "./layoutComponents/Header";
import QueryProvider from "./layoutComponents/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main className="bg-slate-100 min-h-screen max-w-[1440px] mx-auto">
            <Header />
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
