import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AccountSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccountSidebar({ className }: AccountSidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            ACCOUNT
          </h2>
          <div className="space-y-1">
            <Link href={"/account/staff"}>
              <Button variant="ghost" className="w-full justify-start">
                Staff
              </Button>
            </Link>

            <Link href={"/account/customers"}>
              <Button variant="ghost" className="w-full justify-start">
                Customer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
