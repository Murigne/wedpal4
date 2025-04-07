
import { format, differenceInDays } from 'date-fns';

/**
 * Calculate the number of days between the current date and a future date
 * @param dateString The date string to calculate days until
 * @returns The number of days until the date, or "N/A" if the date is invalid
 */
export const calculateDaysUntil = (dateString: string) => {
  try {
    const weddingDate = new Date(dateString);
    const today = new Date();
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch (e) {
    return 'N/A';
  }
};

/**
 * Calculate the difference in days between two dates
 * @param startDate The start date
 * @param endDate The end date
 * @returns The number of days between the dates, or "N/A" if either date is invalid
 */
export const calculateDaysBetween = (startDate: string | Date, endDate: string | Date) => {
  try {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    return differenceInDays(end, start);
  } catch (e) {
    return 'N/A';
  }
};

/**
 * Format a date according to a specified format string
 * @param date The date to format
 * @param formatString The format string to use
 * @returns The formatted date string, or "Invalid Date" if the date is invalid
 */
export const formatDate = (date: string | Date, formatString: string = 'dd-MMM-yy') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatString);
  } catch (e) {
    return 'Invalid Date';
  }
};

/**
 * Format a date for display, with a specific format for showing month and day
 * @param date The date to format
 * @returns The formatted date string (e.g., "June 15")
 */
export const formatMonthDay = (date: string | Date) => {
  return formatDate(date, 'MMMM d');
};

/**
 * Format a date for display, with a specific format for showing month, day, and year
 * @param date The date to format
 * @returns The formatted date string (e.g., "June 15, 2025")
 */
export const formatFullDate = (date: string | Date) => {
  return formatDate(date, 'MMMM d, yyyy');
};

/**
 * Check if a date is valid
 * @param date The date to check
 * @returns True if the date is valid, false otherwise
 */
export const isValidDate = (date: string | Date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  } catch (e) {
    return false;
  }
};
