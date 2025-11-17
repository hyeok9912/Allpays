import "./globals.css";
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
          <main className="bg-slate-100">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
