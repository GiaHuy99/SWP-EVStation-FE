import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from "../../styles/PaginationStyles";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      {/* Previous Button */}
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        size="small"
      >
        <ChevronLeftIcon fontSize="small" />
      </PaginationButton>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationButton
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageChange(page)}
          size="small"
        >
          {page}
        </PaginationButton>
      ))}

      {/* Next Button */}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        size="small"
      >
        <ChevronRightIcon fontSize="small" />
      </PaginationButton>

      {/* Info */}
      <PaginationInfo>
        Hiển thị {startItem}-{endItem} của {totalItems}
      </PaginationInfo>
    </PaginationContainer>
  );
};

export default TablePagination;
