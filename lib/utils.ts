import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDelay(data: number) {

  if (data < 0) {
    var delay = -data;
    let months = 0,
      years = 0,
      days = 0,
      weeks = 0;
    while (delay) {
      if (delay >= 365) {
        years++;
        delay -= 365;
      } else if (delay >= 30) {
        months++;
        delay -= 30;
      } else if (delay >= 7) {
        weeks++;
        delay -= 7;
      } else {
        days++;
        delay--;
      }
    }
    return `${years} years, ${months} months, ${weeks} weeks, ${days} days`;
  }
}

export const formatterMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RWF",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
