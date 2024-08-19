import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ReportSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ReportSidebar({ className }: ReportSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            WTP REPORTS
          </h2>
          <div className="space-y-1">
            <Link href={"/report/treatement"}>
              <Button variant="ghost" className="w-full justify-start">
                Laboratory Treatment
              </Button>
            </Link>

            <Link href={"/report/distribution"}>
              <Button variant="ghost" className="w-full justify-start">
                Water Distribution Summary
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
