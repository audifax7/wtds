import type { Metadata } from "next";
import { Roboto_Mono as Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const mono = Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | WASAC WTDS",
    default: "WASAC WTDS",
  },
  description:
    "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    // className="dark"
    >
      <body className={mono.className}>{children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
