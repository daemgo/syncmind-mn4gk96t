import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AppProvider } from "@/components/providers/app-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "syncMind CRM - 智能销售管理平台",
  description: "高效的客户关系管理和销售协作平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${notoSerif.variable} font-sans antialiased`}
      >
        <AppProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Header */}
              <Header />

              {/* Page content */}
              <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-6 py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </AppProvider>

        <Script id="nav-bridge" strategy="afterInteractive">{`
          (function() {
            if (window === window.parent) return;
            var notify = function() {
              window.parent.postMessage({
                type: 'preview-navigation',
                pathname: location.pathname,
                url: location.href
              }, '*');
            };
            // Notify on initial load
            notify();
            // Intercept pushState / replaceState
            var origPush = history.pushState;
            var origReplace = history.replaceState;
            history.pushState = function() {
              origPush.apply(this, arguments);
              notify();
            };
            history.replaceState = function() {
              origReplace.apply(this, arguments);
              notify();
            };
            // Intercept popstate (browser back/forward)
            window.addEventListener('popstate', notify);
            // Listen for commands from parent
            window.addEventListener('message', function(e) {
              if (e.data && e.data.type === 'preview-command') {
                if (e.data.command === 'back') history.back();
                if (e.data.command === 'forward') history.forward();
                if (e.data.command === 'navigate') {
                  window.location.href = e.data.url;
                }
              }
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
