"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "./layoutComponents/Header";
import QueryProvider from "./layoutComponents/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideStaticRoutes = ["/addmerchants"];

  const isMerchantsDynamic =
    pathname.startsWith("/merchantslist/") && pathname !== "/merchantslist";

  const shouldHideHeader =
    hideStaticRoutes.includes(pathname) || isMerchantsDynamic;

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main className="bg-slate-100 min-h-screen max-w-[1440px] mx-auto">
            {!shouldHideHeader && <Header />}
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
