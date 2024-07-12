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
          <Link href={"/services"}>
              <Button variant="ghost" className="w-full justify-start">
                SERVICES
              </Button>
            </Link>
            <Link href={"/chemical"}>
              <Button variant="ghost" className="w-full justify-start">
                CHEMICAL
              </Button>
            </Link>

            <Link href={"/line"}>
              <Button variant="ghost" className="w-full justify-start">
                LINES
              </Button>
            </Link>
            <Link href={"/source"}>
              <Button variant="ghost" className="w-full justify-start">
                WATER SOURCE
              </Button>
            </Link>
            <Link href={"/province"}>
              <Button variant="ghost" className="w-full justify-start">
                PROVINCES
              </Button>
            </Link>
            <Link href={"/district"}>
              <Button variant="ghost" className="w-full justify-start">
                DISTRICTS
              </Button>
            </Link>
            <Link href={"/sector"}>
              <Button variant="ghost" className="w-full justify-start">
                SECTORS
              </Button>
            </Link>
            <Link href={"/cell"}>
              <Button variant="ghost" className="w-full justify-start">
                CELLS
              </Button>
            </Link>
            <Link href={"/village"}>
              <Button variant="ghost" className="w-full justify-start">
                VILLAGES
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
