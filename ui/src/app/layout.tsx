import type { Metadata } from "next";

import AppWrapper from "@/components/AppWrapper";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TopBar } from "@/components/TopBar";
import FloatingUi from "@/components/modals/FloatingUi";

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
          {/** Main Content */}
          <div className="flex flex-col items-center w-full h-screen min-h-screen">
            <div className="max-w-[1200px] w-full h-full p-4 flex flex-col gap-4">
              <TopBar />
              <div className="flex flex-col w-full pb-4 grow">{children}</div>
            </div>
          </div>

          {/** Floating Content */}
          <FloatingUi />
          <Toaster toastOptions={{ duration: 8000 }} />
        </AppWrapper>
      </body>
    </html>
  );
}
