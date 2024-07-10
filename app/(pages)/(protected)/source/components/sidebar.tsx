import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WaterSourceSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function WaterSourceSidebar({ className }: WaterSourceSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            WATER SOURCE OPERATION
          </h2>
          <div className="space-y-1">
            <Link href={"/source/open"}>
              <Button variant="ghost" className="w-full justify-start">
                OPENED
              </Button>
            </Link>

            <Link href={"/source/close"}>
              <Button variant="ghost" className="w-full justify-start">
                CLOSED
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
