
import { useState } from 'react';

export type PaginationState = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export const usePagination = (totalItems: number, initialPage = 1, pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Ensure current page is within valid range
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  
  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const setPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };
  
  // Get current items for the page
  const getCurrentItems = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  
  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    getCurrentItems,
  };
};
