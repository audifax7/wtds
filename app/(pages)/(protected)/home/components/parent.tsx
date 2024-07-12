import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberWithFamily, YearWithContributions } from "@/types";
import { MemberFundDashboard } from "./member-fund";

interface ParentDashboardProps {
  data: YearWithContributions;
  currentYear: any;
  member: MemberWithFamily;
}

export function ParentDashboard({
  data,
  currentYear,
  member,
}: ParentDashboardProps) {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="fund" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fund">My Overview</TabsTrigger>
          <TabsTrigger value="famly">Family</TabsTrigger>
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
