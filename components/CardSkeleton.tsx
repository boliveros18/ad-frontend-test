import { FC } from "react";

export const CardSkeleton: FC = () => {
  return (
    <div data-testid="card-skeleton" className="p-6 rounded-2xl border border-gray-300 animate-pulse">
      <div className="relative w-full aspect-square rounded-t-lg bg-gray-200" />
      <div className="mt-4 h-4 w-1/3 bg-gray-200 rounded" />
      <div className="flex items-center justify-between mt-4">
        <div className="h-5 w-1/2 bg-gray-300 rounded" />
        <div className="h-5 w-1/4 bg-gray-300 rounded" />
      </div>
      <div className="mt-4 h-10 w-full bg-gray-200 rounded-md" />
    </div>
  );
};
