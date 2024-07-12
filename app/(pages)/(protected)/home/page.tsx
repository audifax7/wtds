import { Metadata } from "next";
import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";
import { AdminDashboard } from "./components/admin";
import { SupervisorDashboard } from "./components/supervisor";
import { UserRole } from "@prisma/client";
import { TreatmentDashboard } from "./components/treatment";
import { DistributionDashboardDashboard } from "./components/distribution-dashboard";
import { CustomerDashboardDashboard } from "./components/customer-dashboard";
import { RSBDashboard } from "./components/rsb";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const currentYear = new Date().getFullYear();
  const year = "" + currentYear;
  const role: any = await currentRole();
  const user: any = await currentUser();

  const staffs: any = await db.user.count({
    where: {
      NOT: {
        role: UserRole.CUSTOMER,
      },
    },
  });

  const customers: any = await db.user.count({
    where: {
      role: UserRole.CUSTOMER,
    },
  });

  let today = new Date()

  const distributedLine = await db.distribution.count({
    where: {
      scheduleDate: {
        equals: today.toISOString()
      }
    },
  });

  const distributedLineQuantityToday = await db.distribution.aggregate({
    where: {
      scheduleDate: {
        equals: today.toISOString()
      }
    },
    _sum: {
      quantity: true
    }
  });
  const distributedLineQuantity = await db.distribution.aggregate({
    _sum: {
      quantity: true
    }
  });

  const totalIssue = await db.issue.count()
  const todayIssue = await db.issue.count({
    where: {
      createdAt: {
        equals: today.toISOString()
      }
    },
  })

  const totalResponseIssue = await db.issue.count({
    where: {
      NOT: {
        response: null
      }
    }
  })
  const todayFeedback = await db.feedback.count({
    where: {
      createdAt: {
        equals: today.toISOString()
      }
    },
  })

  const totalFeedback = await db.feedback.count()

  const myTotalIssue = await db.issue.count({
    where: {
      customerId: user.id
    }
  })
  const myTodayIssue = await db.issue.count({
    where: {
      createdAt: {
        equals: today.toISOString(),
      },
      customerId: user.id,
    },
  })

  const myTotalResponseIssue = await db.issue.count({
    where: {
      NOT: {
        response: null
      },
      customerId: user.id
    }
  })
  const myTodayFeedback = await db.feedback.count({
    where: {
      createdAt: {
        equals: today.toISOString()
      },
      userId: user.id
    },
  })

  const myTotalFeedback = await db.feedback.count({
    where: {
      userId: user.id
    }
  })

  const todayTreatement = await db.treatment.aggregate({
    where: {
      createdAt: {
        equals: today.toISOString()
      }
    },
    _sum: {
      rowWater: true,
      treatedWater: true
    }
  })

  const pendingSample = await db.treatment.count({
    where: {
      NOT: {
        rsbRecommandation: null
      },
    }
  })





  const isSupervisor: boolean = role === UserRole.SUPERVISOR;
  const isLab: boolean = role === UserRole.LABORATOR;
  const isDistributor: boolean = role === UserRole.DISTRIBUTOR;
  const isCustomer: boolean = role === UserRole.CUSTOMER;
  const isRSB: boolean = role === UserRole.RSB;
  const isAdmin: boolean = role === UserRole.ADMIN;



  return (
    <>
      <div className="flex items-center justify-between space-y-2 pl-10">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      </div>
      {isAdmin ? (
        <AdminDashboard
          customers={customers}
          staffs={staffs}
        />
      ) : null}
      {isSupervisor ? (
        <SupervisorDashboard
          todayTreatement={todayTreatement}
          distributedLine={distributedLine}
          distributedLineQuantity={distributedLineQuantity}
          distributedLineQuantityToday={distributedLineQuantityToday}
          todayFeedback={todayFeedback}
          todayIssue={todayIssue}
          totalFeedback={totalFeedback}
          totalIssue={totalIssue}
          totalResponseIssue={totalResponseIssue}
        />
      ) : null
      }
      {isLab ? (
        <TreatmentDashboard
          treatment={todayTreatement}
        />
      ) : null}

      {isDistributor ? (
        <DistributionDashboardDashboard
          distributedLine={distributedLine}
          distributedLineQuantity={distributedLineQuantity}
          distributedLineQuantityToday={distributedLineQuantityToday}
        />
      ) : null}

      {isCustomer ? (
        <CustomerDashboardDashboard
          todayFeedback={myTodayFeedback}
          todayIssue={myTodayFeedback}
          totalFeedback={myTodayFeedback}
          totalIssue={myTodayIssue}
          totalResponseIssue={myTotalResponseIssue}
        />
      ) : null}
      {isRSB ? (
        <RSBDashboard
          pendingSample={pendingSample}
        />
      ) : null}

    </>
  );
}
