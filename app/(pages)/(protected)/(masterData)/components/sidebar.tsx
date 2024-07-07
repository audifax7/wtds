import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MasterDataSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MasterDataSidebar({ className }: MasterDataSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            MASTER DATA
          </h2>
          <div className="space-y-1">
            <Link href={"/province"}>
              <Button variant="ghost" className="w-full justify-start">
                Provinces
              </Button>
            </Link>
            <Link href={"/district"}>
              <Button variant="ghost" className="w-full justify-start">
                Districts
              </Button>
            </Link>
            <Link href={"/sector"}>
              <Button variant="ghost" className="w-full justify-start">
                Sectors
              </Button>
            </Link>
            <Link href={"/cell"}>
              <Button variant="ghost" className="w-full justify-start">
                Cells
              </Button>
            </Link>
            <Link href={"/village"}>
              <Button variant="ghost" className="w-full justify-start">
                Villages
              </Button>
            </Link>
            <Link href={"/services"}>
              <Button variant="secondary" className="w-full justify-start">
                Services
              </Button>
            </Link>
            <Link href={"/chemical"}>
              <Button variant="ghost" className="w-full justify-start">
                Chemicals
              </Button>
            </Link>

            <Link href={"/line"}>
              <Button variant="ghost" className="w-full justify-start">
                Lines
              </Button>
            </Link>
            <Link href={"/source"}>
              <Button variant="ghost" className="w-full justify-start">
                Water source
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
