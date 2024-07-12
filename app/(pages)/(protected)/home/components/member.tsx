import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberWithFamily, YearWithContributions } from "@/types";
import { MemberFundDashboard } from "./member-fund";

interface MemberDashboardProps {
  data: YearWithContributions;
  currentYear: any;
  member: MemberWithFamily;
}

export function MemberDashboard({
  data,
  currentYear,
  member,
}: MemberDashboardProps) {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
 
      </div>
      <Tabs defaultValue="fund" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fund">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="fund" className="space-y-4">
          <MemberFundDashboard
            data={data}
            currentYear={currentYear}
            member={member}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
