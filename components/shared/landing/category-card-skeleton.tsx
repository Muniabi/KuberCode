import { cn } from "@/lib/utils";

export const CategoryCardSkeleton = () => {
    return (
        <div className="relative rounded-2xl border border-border overflow-hidden">
            <div className="p-6 space-y-4">
                {/* Заголовок и иконка */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="space-y-2">
                        <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>
                {/* Описание */}
                <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};
