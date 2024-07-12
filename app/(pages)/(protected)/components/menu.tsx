import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {
  role: UserRole;
}

export function MainNav({ role, className, ...props }: MainNavProps) {
  const isAdmin: boolean = role === UserRole.ADMIN;
  const isCustomer: boolean = role === UserRole.CUSTOMER;
  const isSource: boolean = role === UserRole.SOURCE;
  const isLab: boolean = role === UserRole.LABORATOR;
  const isSupervisor: boolean = role === UserRole.SUPERVISOR;
  const isRSB: boolean = role === UserRole.RSB;
  const isDistribution: boolean = role === UserRole.DISTRIBUTOR;
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/home"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        DASHBOARD
      </Link>
      {isAdmin ? (
        <>
          <Link
            href="/account/staff"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            ACCOUNT
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            MASTER DATA
          </Link>
        </>
      ) : null}

      {isSource ? (
        <Link
          href="/source/open"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          WATER SOURCE
        </Link>
      ) : null}

      {isCustomer ? (
        <>
          <Link
            href="/client/issues"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            MY ACCOUNT
          </Link>
        </>
      ) : null}

      {isLab || isSupervisor ? (
        <Link
          href="/laboratory/source"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          LABORATORY
        </Link>
      ) : null}

      {isRSB ? (
        <Link
          href="/regulation/rules"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          REGULATIONS
        </Link>
      ) : null}
      {isDistribution || isSupervisor ? (
        <Link
          href="/distribution/open"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          DISTRIBUTION
        </Link>
      ) : null}

      {isSupervisor ? (
        <Link
          href="/customer/issues"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          CUSTOMERS
        </Link>

      ) : null}
      {isSupervisor ? (
        <Link
          href="/report/treatement"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          REPORT
        </Link>
      ) : null}

    </nav>


  );
}
