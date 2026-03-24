import { AppClientProviders } from "@/components/Layout/AppClientProviders";
import { Sora } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  icons: {
    icon: "favicon/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className={sora.className}>
        <AppClientProviders>{children}</AppClientProviders>
      </body>
    </html>
  );
}
