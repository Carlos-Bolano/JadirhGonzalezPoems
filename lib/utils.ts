import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, formatDistanceStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  dateString: string,
  strict: boolean = false
): string => {
  const date = new Date(dateString);

  let formattedDate = strict
    ? formatDistanceStrict(date, new Date(), { addSuffix: true })
    : formatDistanceToNow(date, { addSuffix: true });

  if (!strict) {
    formattedDate = formattedDate.replace("about ", "");
  }

  return formattedDate;
};
