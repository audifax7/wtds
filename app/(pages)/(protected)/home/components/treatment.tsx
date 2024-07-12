import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TreatmentDashboardProps {
  treatment: any;
}

export function TreatmentDashboard({
  treatment,
}: TreatmentDashboardProps) {

  return (
    <div className="p-10">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROW WATER TREATMENT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatment._sum.rowWater}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TREATED WATER </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatment._sum.treatedWater}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
