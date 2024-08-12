import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import Link from "next/link";

interface RegulationSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export async function RegulationSidebar({ className }: RegulationSidebarProps) {
  const user = await currentUser();

  const isRSB = user.role === UserRole.RSB;

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            RSB REGULATION
          </h2>
          <div className="space-y-1">
            <Link href={"/regulation/rules"}>
              <Button variant="ghost" className="w-full justify-start">
                Current Water Quality standards
              </Button>
            </Link>
            {isRSB ?
              <Link href={"/regulation/treatement"}>
                <Button variant="ghost" className="w-full justify-start">
                 View WTP Sample
                </Button>
              </Link> : null}

          </div>
        </div>
      </div>
    </div>
  );
}
