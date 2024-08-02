import { currentUser } from "@/lib/auth";
import { RegulationSidebar } from "./components/sidebar";
import { UserRole } from "@prisma/client";

export const metadata = {
  title: "Protected Routes",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid lg:grid-cols-5">
      <RegulationSidebar className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
