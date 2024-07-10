import Logo from "./components/logo";
import { MainNav } from "./components/menu";
import { UserNav } from "./components/user-nav";
import { Sidebar } from "./components/sidebar";
import { currentRole, currentUser } from "@/lib/auth";
import { use } from "react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Protected Routes",
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const role = await currentRole();
  if(!user){
    redirect('/')
  }
  return (
    <div className="hidden md:block">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo />
          <MainNav role={role} className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav user={user} />
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="bg-background">{children}</div>
      </div>
    </div>
  );
}
