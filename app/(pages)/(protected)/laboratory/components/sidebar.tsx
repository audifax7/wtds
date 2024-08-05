import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LaboratorySidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LaboratorySidebar({ className }: LaboratorySidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            LABORATORY OPERATION
          </h2>
          <div className="space-y-1">
            <Link href={"/laboratory/source"}>
              <Button variant="ghost" className="w-full justify-start">
                WATER FROM SOURCE
              </Button>
            </Link>

            <Link href={"/laboratory/treatement"}>
              <Button variant="ghost" className="w-full justify-start">
               VIEW WTP TREATEMENT
              </Button>
            </Link>

            <Link href={"/laboratory/inventory"}>
              <Button variant="ghost" className="w-full justify-start">
                INVENTORY
              </Button>
            </Link>

            <Link href={"/laboratory/equipment"}>
              <Button variant="ghost" className="w-full justify-start">
                EQUIPMENT STATUS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
