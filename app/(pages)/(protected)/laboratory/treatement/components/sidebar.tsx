import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IssuesSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function IssuesSidebar({ className }: IssuesSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            ISSUES
          </h2>
          <div className="space-y-1">
            <Link href={"/issues"}>
              <Button variant="secondary" className="w-full justify-start">
                Issues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
