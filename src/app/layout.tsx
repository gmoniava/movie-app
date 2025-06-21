import "./globals.css";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-bg-default text-text-primary">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
