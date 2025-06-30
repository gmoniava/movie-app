import "./globals.css";
import { Providers } from "../components/client/providers";
import { ClientOnly } from "@/components/client/client-only";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${roboto.className}`} suppressHydrationWarning>
      <body className="h-full default-bg default-text">
        {" "}
        <Providers>
          <ClientOnly>{children}</ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
