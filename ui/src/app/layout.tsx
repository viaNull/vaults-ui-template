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

const SuppressConsoleErrors = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function() {
          var originalError = console.error;
          console.error = function() {
            const patterns = [
              /unexpected token.*Phantom.*valid JSON/i,
              /window\\.navigator\\.wallets is not an array/i,
              /Failed to execute 'observe' on 'MutationObserver'/i,
            ];

            // Check if any argument matches our patterns
            const shouldSuppress = Array.from(arguments).some(arg => 
              (typeof arg === 'string' && patterns.some(pattern => pattern.test(arg))) ||
              (arg instanceof Error && patterns.some(pattern => pattern.test(arg.message || arg.stack || '')))
            );

            if (shouldSuppress) {
              return;
            }

            originalError.apply(console, arguments);
          };
        })();
      `,
      }}
    />
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SuppressConsoleErrors />

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
