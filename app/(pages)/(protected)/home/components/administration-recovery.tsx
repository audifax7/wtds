"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdministrationRecoveryProps {
  claims: number;
}

export const AdministrationRecoveryDashboard = ({
  claims,
}: AdministrationRecoveryProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              NOTIFICATION SMS FOR RECLAMATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> {claims}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
