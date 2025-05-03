import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Updated slugify function
export const slugify = (text: string): string => {
  if (!text) return ""; // Handle empty input

  const slug = text
    .toString()
    .normalize('NFD') // Split accented characters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars except hyphen
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text

  return slug;
};
