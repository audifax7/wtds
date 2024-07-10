import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ClientSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ClientSidebar({ className }: ClientSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            CLIENT PORTAL
          </h2>
          <div className="space-y-1">
            <Link href={"/client/issues"}>
              <Button variant="ghost" className="w-full justify-start">
                ISSUES
              </Button>
            </Link>

            <Link href={"/client/feedbacks"}>
              <Button variant="ghost" className="w-full justify-start">
                FEEDBACKS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
