import "./globals.css";
import { Providers } from "../components/client/providers";
import { ClientOnly } from "@/components/client/client-only";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full default-bg default-text">
        {" "}
        <Providers>
          <ClientOnly>{children}</ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
