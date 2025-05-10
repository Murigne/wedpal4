
export const formatDate = (date: Date): string => {
  if (!date) return '';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

export const calculateDaysUntil = (dateString: string): number => {
  // If no date provided, return 0
  if (!dateString) return 0;
  
  const now = new Date();
  const weddingDate = new Date(dateString);
  
  // Reset time portions to get accurate day difference
  now.setHours(0, 0, 0, 0);
  weddingDate.setHours(0, 0, 0, 0);
  
  // Calculate the difference in milliseconds
  const diffMs = weddingDate.getTime() - now.getTime();
  
  // Convert milliseconds to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  // Return the absolute value so if wedding date is in the past, we still get a positive number
  return diffDays > 0 ? diffDays : 0;
};
