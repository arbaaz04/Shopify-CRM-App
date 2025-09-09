import React from "react";
import { Pagination } from "@shopify/polaris";

interface OrderPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const OrderPagination: React.FC<OrderPaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  if (totalItems <= pageSize) {
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
        hasPrevious={currentPage > 1}
        onPrevious={() => onPageChange(currentPage - 1)}
        hasNext={currentPage * pageSize < totalItems}
        onNext={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
