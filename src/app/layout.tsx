import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "./_components/TopNav";
import { ClerkProvider } from "@clerk/nextjs";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "sonner";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "T3 Gallery",
  description: "Generated by me",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />

          <body className={`font-sans ${GeistSans.variable} dark`}>
            <div className="flex h-screen flex-col">
              <TopNav />
              <main className="h-full min-h-0 w-full flex-1 overflow-y-auto">
                {children}
              </main>
            </div>

            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
