import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SourceDashboardProps {
  rowWater: any;
}

export function SourceDashboard({
  rowWater,
}: SourceDashboardProps) {
  return (
    <div className="p-10">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TODAY ROW WATER FROM SOURCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rowWater._sum.quantity} m3
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
