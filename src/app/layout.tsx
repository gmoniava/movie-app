import "./globals.css";
import { Providers } from "../components/client/providers";
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
    <html lang="en" className={`h-full ${roboto.className}`}>
      <body className="h-full bg-(--bg-base) dark:text-white ">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
