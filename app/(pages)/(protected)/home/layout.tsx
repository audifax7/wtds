interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* <BreadcrumbHome /> */}
      <div className="p-6">{children}</div>
    </div>
  );
}
