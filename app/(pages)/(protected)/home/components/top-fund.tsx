import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatterMoney } from "@/lib/utils";

interface FamilyListProps {
  allFamily: any[];
  currentYear: any;
}

export function TopFunds({ allFamily, currentYear }: FamilyListProps) {
  let familiesFund: any[] = [];

  allFamily?.forEach(async (family) => {
    let sum: number = 0;

    family.members.forEach(function (member: any) {
      member.years.forEach(function (year: any) {
        // was missing a )
        year.contributions.forEach(function (contribution: any) {
          if (parseFloat(contribution.amount) === null) {
            sum = 0;
          }
          sum += parseFloat(contribution.amount);
        });
      });
    });

    familiesFund.push({
      code: family.code,
      names: family.names,
      plan: 36000 * family.member,
      received: sum,
      perctange: ((sum * 100) / (36000 * family.member)).toFixed(2),
      members: family.member,
    });
  });
  familiesFund.sort((a, b) => b.perctange - a.perctange);
  var topValues = familiesFund
    .sort((a, b) => b.perctange - a.perctange)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {topValues.map((fund: any) => (
        <div key={fund.code} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{fund.names.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{fund.names}</p>
            <p className="text-sm text-muted-foreground">
              Planned {formatterMoney.format(fund.plan)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {formatterMoney.format(fund.received)}
          </div>
        </div>
      ))}
    </div>
  );
}
