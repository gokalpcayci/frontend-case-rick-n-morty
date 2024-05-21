import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to filter unique names
export function getUniqueResults(pages: { results: { name: string }[] }[]) {
  const seen = new Set();
  const uniqueResults: { name: string }[] = [];

  pages.forEach((page) => {
    page.results.forEach((item) => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        uniqueResults.push(item);
      }
    });
  });

  return uniqueResults;
}
