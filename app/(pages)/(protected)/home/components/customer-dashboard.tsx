import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerDashboardDashboardProps {
  totalIssue:any
  todayIssue:any
  totalResponseIssue:any
  todayFeedback:any
  totalFeedback:any
}

export function CustomerDashboardDashboard({
  todayFeedback,todayIssue,totalFeedback,totalIssue,totalResponseIssue
}: CustomerDashboardDashboardProps) {

  return (
    <div className="p-10">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL ISSUES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalIssue}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TODAY ISSUES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayIssue}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL RESPONSE ISSUES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalResponseIssue}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL FEEDBACK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalFeedback}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TODAY FEEDBACK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayFeedback}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
