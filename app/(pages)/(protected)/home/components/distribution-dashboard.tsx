/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DistributionDashboardDashboardProps {
  distributedLine: any
  distributedLineQuantityToday: any
  distributedLineQuantity: any
}

export function DistributionDashboardDashboard({
  distributedLine, distributedLineQuantity, distributedLineQuantityToday
}: DistributionDashboardDashboardProps) {

  return (
    <div className="p-10">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TODAY'S SERVED LOCATIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributedLine}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TODAY'S WATER QUANTITY DISTRIBUTED</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributedLineQuantityToday._sum.quantity}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            ALL WATER QUANTITY DISTRIBUTED</CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributedLineQuantity._sum.quantity}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
