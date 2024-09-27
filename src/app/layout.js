import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import NextTopLoader from "nextjs-toploader";

const inter = Baloo_Da_2({ subsets: ["bengali"] });

const FooterNav = dynamic(() => import("../components/FooterNav.jsx"), {
  ssr: false,
});

export const metadata = {
  title: "Oroonno",
  description: "Stay Green Stay Trusted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${inter.className} bg-[#F5F6F7]`}>
          <Toaster />

          <Header />
          <NextTopLoader
            color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
            height={5}
          />
          <AntdRegistry>{children}</AntdRegistry>

          <FooterNav />
        </body>
      </StoreProvider>
    </html>
  );
}
