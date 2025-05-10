
/**
 * Format a date into a readable string format
 * @param date The date to format
 * @returns Formatted date string (e.g., "May 15, 2025")
 */
export const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return 'Date not set';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

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
