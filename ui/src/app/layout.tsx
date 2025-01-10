import type { Metadata } from "next";

import AppWrapper from "@/components/AppWrapper";

import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <div className="flex flex-col w-full min-h-screen h-screen pb-[60px] items-center">
            {children}
          </div>
          {/* <FloatingUi /> */}
          <Toaster toastOptions={{ duration: 8000 }} />
        </AppWrapper>
      </body>
    </html>
  );
}
