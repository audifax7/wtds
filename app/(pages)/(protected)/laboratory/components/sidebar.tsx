import { Button } from "@/components/ui/button";
import { currentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import Link from "next/link";

interface LaboratorySidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export async function LaboratorySidebar({ className }: LaboratorySidebarProps) {

  const role = await currentRole();
  const isSup = role === UserRole.SUPERVISOR;
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            LABORATORY OPERATION
          </h2>
          <div className="space-y-1">
            {/* <Link href={"/laboratory/source"}>
              <Button variant="ghost" className="w-full justify-start">
                WATER FROM SOURCE
              </Button>
            </Link> */}
            {isSup ? <Link href={"/laboratory/treatement"}>
              <Button variant="ghost" className="w-full justify-start">
                LAB TECHNICIAN WTP SUMMARY
              </Button>
            </Link> : <Link href={"/laboratory/treatement"}>
              <Button variant="ghost" className="w-full justify-start">
                ADD CHEMICALS
              </Button>
            </Link>}


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
