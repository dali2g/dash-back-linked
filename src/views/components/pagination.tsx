import React, { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = function ({
  currentPage,
  totalPages,
  onPageChange,
}) {
  // Function to handle next page click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Function to handle previous page click
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <button
          onClick={handlePrevClick}
          className={`inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100 hover:text-gray-900"
          } dark:text-gray-400 ${
            currentPage === 1
              ? "dark:text-gray-300 cursor-not-allowed"
              : "dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Page précedent</span>
          <HiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={handleNextClick}
          className={`mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100 hover:text-gray-900"
          } dark:text-gray-400 ${
            currentPage === totalPages
              ? "dark:text-gray-300 cursor-not-allowed"
              : "dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Page suivante</span>
          <HiChevronRight className="text-2xl" />
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Affichage&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage === totalPages ? totalPages : (currentPage - 1) * 20 + 1}-{currentPage === totalPages ? (currentPage - 1) * 20 + (totalPages % 20) : currentPage * 20}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages * 20}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={handlePrevClick}
          className={`inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          } dark:bg-primary-600 ${
            currentPage === 1
              ? "dark:bg-gray-500 cursor-not-allowed"
              : "dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          }`}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="mr-1 text-base" />
          Précedent
        </button>
        <button
          onClick={handleNextClick}
          className={`inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ${
            currentPage === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          } dark:bg-primary-600 ${
            currentPage === totalPages
              ? "dark:bg-gray-500 cursor-not-allowed"
              : "dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          }`}
          disabled={currentPage === totalPages}
        >
          Suivant
          <HiChevronRight className="ml-1 text-base" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
