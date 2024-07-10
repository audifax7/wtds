import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RegulationSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegulationSidebar({ className }: RegulationSidebarProps) {
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
                RULES & REGULATION
              </Button>
            </Link>

            <Link href={"/regulation/treatement"}>
              <Button variant="ghost" className="w-full justify-start">
                WASAC TREATEMENT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
