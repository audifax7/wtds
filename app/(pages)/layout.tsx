import { SessionProvider } from "next-auth/react";

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default PageLayout;
