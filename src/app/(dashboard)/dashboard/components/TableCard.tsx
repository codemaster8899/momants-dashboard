import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface TableCardProps {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
  link?: string;
  isLoading?: boolean;
}

export const TableCard = ({
  children,
  title,
  icon: Icon,
  link,
  isLoading = false,
}: TableCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col overflow-hidden animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between px-6 pt-3 shrink-0">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>

        {/* Content Skeleton */}
        <div className="p-5 flex-1 flex flex-col min-h-0">
          <div className="border-gray-200 border rounded-md flex flex-col flex-1 h-full">
            <div className="px-6 py-3 border-b border-gray-200">
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </div>

            {/* Fake Rows */}
            <div className="flex-1 py-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="px-6 py-4 border-b border-gray-100 last:border-0"
                >
                  <div
                    className="h-4 bg-gray-200 rounded"
                    style={{
                      width: `${Math.floor(Math.random() * (90 - 60) + 60)}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Added overflow-hidden here
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-3 border-gray-200 shrink-0">
        <div className="flex momants-light-small-gray gap-2 items-center">
          {Icon && <Icon size={14} />}
          {title}
        </div>

        {link && (
          <Link
            href={link}
            className="inline-flex items-center gap-1 momants-light-small-gray hover:text-black"
          >
            <span>Show all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Content wrapper */}
      <div className="p-5 flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
};