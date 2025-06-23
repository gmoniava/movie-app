import "./globals.css";
import { Providers } from "../components/client/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-default-bg text-default-text">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
