import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface MentorSkeletonProps {
    count?: number;
}

export default function MentorSkeleton({ count = 6 }: MentorSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <Card
                    key={index}
                    className="bg-white dark:bg-[--card-bg] border-none overflow-hidden"
                >
                    <CardHeader className="relative pb-0">
                        <div className="absolute top-4 right-4">
                            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                        </div>
                        <div className="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
                                />
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center p-2 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
                                    >
                                        <div className="w-4 h-4 rounded mb-1" />
                                        <div className="w-12 h-4 rounded" />
                                        <div className="w-16 h-3 rounded mt-1" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
