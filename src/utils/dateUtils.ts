
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
