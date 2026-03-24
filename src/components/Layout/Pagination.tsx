import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageIndex: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  pageIndex,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="h-10 w-10 flex items-center justify-center rounded-lg border border-input bg-background"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 1}
        >
          <ChevronLeft className="w-6 h-6 font-bold" />
        </button>
        <span className="text-sm font-medium">
          Page {pageIndex} of {totalPages}
        </span>
        <button
          className="h-10 w-10 flex items-center justify-center rounded-lg border border-input bg-background"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= totalPages}
        >
          <ChevronRight className="w-6 h-6 font-bold" />
        </button>
      </div>
    </div>
  );
};
