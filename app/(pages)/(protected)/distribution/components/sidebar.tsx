import { Button } from "@/components/ui/button";
import { currentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import Link from "next/link";

interface DistributionLineSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> { }

export async function DistributionLineSidebar({
  className,
}: DistributionLineSidebarProps) {
  const role = await currentRole();
  const isSupervisor= role=== UserRole.SUPERVISOR;
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            WASAC DISTRIBUTION
          </h2>
          <div className="space-y-1">
            {isSupervisor ?
             <Link href={"/distribution/schedule"}>
             <Button variant="ghost" className="w-full justify-start">
             MAKE/CREAT A DISTRIBUTION SCHEDULE
             </Button>
           </Link>:
            <Link href={"/distribution/schedule"}>
            <Button variant="ghost" className="w-full justify-start">
              VIEW and OPEN DISTRIBUTION SCHEDULE
            </Button>
          </Link>
            }
           
            <Link href={"/distribution/open"}>
              <Button variant="ghost" className="w-full justify-start">
                OPENED
              </Button>
            </Link>

            <Link href={"/distribution/close"}>
              <Button variant="ghost" className="w-full justify-start">
              SEE ALL CLOSED LOCATIONS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
