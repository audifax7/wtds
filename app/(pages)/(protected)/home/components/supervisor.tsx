"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreatmentDashboard } from "./treatment";
import { DistributionDashboardDashboard } from "./distribution-dashboard";
import { CustomerDashboardDashboard } from "./customer-dashboard";

interface SupervisorDashboardProps {
  todayTreatement: any
  distributedLine: any
  distributedLineQuantityToday: any
  distributedLineQuantity: any
  totalIssue: any
  todayIssue: any
  totalResponseIssue: any
  todayFeedback: any
  totalFeedback: any
}

export function SupervisorDashboard({
  todayTreatement, distributedLine, distributedLineQuantity, distributedLineQuantityToday, todayFeedback, todayIssue, totalFeedback, totalIssue, totalResponseIssue
}: SupervisorDashboardProps) {

  return (
    <div className="p-10">

      <Tabs defaultValue="laboratory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="laboratory">Laboratory</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>
        <TabsContent value="laboratory" className="space-y-4">
          <TreatmentDashboard
            treatment={todayTreatement}
          />
        </TabsContent>
        <TabsContent value="distribution" className="space-y-4">
          <DistributionDashboardDashboard
            distributedLine={distributedLine}
            distributedLineQuantity={distributedLineQuantity}
            distributedLineQuantityToday={distributedLineQuantityToday}
          />
        </TabsContent>
        <TabsContent value="customer" className="space-y-4">
          <CustomerDashboardDashboard
            todayFeedback={todayFeedback}
            todayIssue={todayIssue}
            totalFeedback={totalFeedback}
            totalIssue={totalIssue}
            totalResponseIssue={totalResponseIssue}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
