import Logo from "@/app/(pages)/(protected)/components/logo";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center justify-center">
        <Logo/>
      </div>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
