"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdministrationProps {
  allFamily: any[];
  claims: number;
}

export const AdministrationDashboard = ({
  allFamily,
  claims,
}: AdministrationProps) => {
  let membersFundData: any[] = [];

  let totalMember: number = 0;

  allFamily?.forEach((family) => (totalMember += family.member));

  allFamily.forEach(async (family) => {
    family.members.forEach(function (member: any) {
      let sum: number = 0;

      member.years.forEach(function (year: any) {
        // was missing a )
        year.contributions.forEach(function (contribution: any) {
          if (parseFloat(contribution.amount) === null) {
            sum = 0;
          }
          sum += parseFloat(contribution.amount);
        });
      });
      membersFundData.push({
        code: member.code,
        names: member.names,
        email: member.email,
        telephone: member.phone,
        family: family.names,
        plan: 36000,
        received: sum,
        perctange: ((sum * 100) / 36000).toFixed(2),
      });
    });
  });

  membersFundData.sort((a, b) => b.perctange - a.perctange);

  const contributedMember = membersFundData.filter(
    (member) => member.received > 0
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ALL FAMILY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allFamily.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ALL MEMBER</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMember}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ACTIVE MEMBER</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> {membersFundData.length}</div>
          </CardContent>
        </Card>{" "}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              INACTIVE MEMBER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              {totalMember - membersFundData.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              CONTRIBUTED MEMBER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              {contributedMember.length}
            </div>
          </CardContent>
        </Card>
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
