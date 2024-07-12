import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminDashboardProps {
  customers: number;
  staffs: number;
}

export function AdminDashboard({
  customers,
  staffs,
}: AdminDashboardProps) {
  return (
    <div className="p-10">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">STAFF ACCOUNT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staffs}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CUSTOMER ACCOUNT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
