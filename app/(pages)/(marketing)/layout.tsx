import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "KWTP",
};

function LandingPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <div className="h-2"></div>
      <Footer />
    </>
  );
}

export default LandingPageLayout;