import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RSBDashboardProps {
  pendingSample: number;
}

export function RSBDashboard({
  pendingSample,
}: RSBDashboardProps) {
  return (
    <div className="p-10">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">STAFF ACCOUNT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingSample}
            </div>
          </CardContent>
        </Card>
       
      </div>
    </div>
  );
}
