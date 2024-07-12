"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterMoney } from "@/lib/utils";
import { MemberWithFamily, YearWithContributions } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Info } from "./info";

interface MemberFundProps {
  data: YearWithContributions;
  currentYear: any;
  member: MemberWithFamily;
}

export const MemberFundDashboard = ({
  data,
  currentYear,
  member,
}: MemberFundProps) => {
  let savingFund: any[] = [];
  let socialFund: any[] = [];
  let operationFund: any[] = [];
  let allFund: any[] = [];

  data?.contributions.forEach(function (contribution: any) {
    let savingSum: number = 0;
    let socialSum: number = 0;
    let operationSum: number = 0;
    let allSum: number = 0;
    if (parseFloat(contribution.amount) === null) {
      savingSum = 0;
      socialSum = 0;
      allSum = 0;
      operationSum = 0;
    }
    if (contribution.account === "SAVING") {
      savingSum += parseFloat(contribution.amount);
    }
    if (contribution.account === "SOCIAL") {
      socialSum += parseFloat(contribution.amount);
    }
    if (contribution.account === "GAERG_OPERATIONS") {
      operationSum += parseFloat(contribution.amount);
    }
    allSum += parseFloat(contribution.amount);
    savingFund.push({
      received: savingSum,
    });

    socialFund.push({
      received: socialSum,
    });
    operationFund.push({
      received: operationSum,
    });

    allFund.push({
      received: allSum,
    });
  });

  let saving = 0;
  let social = 0;
  let operation = 0;
  let all = 0;
  let plan = 0;

  savingFund.forEach((fund) => {
    saving += fund.received;
  });

  const savingData = {
    saving: saving,
    percentage: ((saving * 100) / 10080).toFixed(2),
  };

  socialFund.forEach((fund) => {
    social += fund.received;
  });

  const socialData = {
    social: social,
    percentage: ((social * 100) / 11880).toFixed(2),
  };

  operationFund.forEach((fund) => {
    operation += fund.received;
  });

  const operationData = {
    operation: operation,
    percentage: ((operation * 100) / 14040).toFixed(2),
  };

  allFund.forEach((fund) => {
    all += fund.received;
  });

  const allData = {
    all: all,
    plan: 36000,
    percentage: ((all * 100) / 36000).toFixed(2),
  };
  return (
    <>
      <Separator />
      <Info member={member} fund={allData.all} />
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PLANNED FUND</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatterMoney.format(allData.plan)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RECEIVED FUND</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatterMoney.format(allData.all)}
            </div>
            <p className="text-xs text-muted-foreground">
              {allData.percentage}% from January {currentYear}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SOCIAL FUND</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatterMoney.format(socialData.social)}
            </div>
            <p className="text-xs text-muted-foreground">
              {socialData.percentage}% from January {currentYear}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              GAERG OPERATION FUND
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              {formatterMoney.format(operationData.operation)}
            </div>
            <p className="text-xs text-muted-foreground">
              {operationData.percentage}% from January {currentYear}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SAVING FUND</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatterMoney.format(savingData.saving)}
            </div>
            <p className="text-xs text-muted-foreground">
              {savingData.percentage}% from January {currentYear}
            </p>
          </CardContent>
        </Card>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              NOTIFICATION SMS FOR RECLAMATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.claims.length}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
