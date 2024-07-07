import { MasterDataSidebar } from "./components/sidebar";

export const metadata = {
  title: "SERVICE",
};

export default async function MasterDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-5">
      <MasterDataSidebar className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
