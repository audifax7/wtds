"use client";

import Image from "next/image";
import { CreditCard } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  MemberWithFamily,
  YearWithContributions,
} from "@/types";
import { formatDate, formatterMoney } from "@/lib/utils";

interface InfoProps {
  member: MemberWithFamily;
  fund:any ;
}

export const Info = ({ member, fund }: InfoProps) => {
  // if (!isLoaded) {
  //   return <Info.Skeleton />;
  // }

  let sum: number = 0;

  // data.cards.forEach(card => sum += card.amount);

  // members.forEach(function (member) {
  //   member.years.forEach(function (year: any) {
  //     // was missing a )
  //     year.contributions.forEach(function (contribution: any) {
  //       sum += parseFloat(contribution.amount);
  //     });
  //   });
  // });

  // const percentage: number = (sum * 100) / (36000 * family.member);

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative"></div>
      <div className="space-y-1">
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-xl">{member?.names}</p>
          <p className="font-semibold text-xl">{member.code}</p>
          <p className="font-semibold text-xl">
            {formatDate(new Date(member.dob)?.toDateString())}
          </p>
          {/* <p className="font-semibold text-xl">{member.familyId}</p> */}
        </div>
        <div className="flex  items-center text-xs text-muted-foreground ">
          <CreditCard className="h-3 w-3 mr-1" />
          <div className="flex justify-between gap-6">
            <p> DOB: {formatDate(new Date(member.dob)?.toDateString())}</p>
            <p> FAMILY: {member.family.names}</p>
            <p>
              {" "}
              JOIN DATE: {formatDate(new Date(member.joinDate)?.toDateString())}
            </p>

            <p> TOTAL CONTRIBUTIONS : {formatterMoney.format(fund)}</p>
            {/* <p> Active: {countMember}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
