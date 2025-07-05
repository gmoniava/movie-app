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
      <body className="h-full bg-[#f4f4f9] dark:text-white dark:bg-[#111827]">
        {" "}
        <Providers>
          <ClientOnly>{children}</ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
