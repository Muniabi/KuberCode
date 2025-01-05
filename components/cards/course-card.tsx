import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LEVEL_DISPLAY } from "@/store/courses";

interface CourseCardProps {
    id: string;
    title: string;
    author: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string;
    description: string;
    price: {
        current: number;
        old?: number;
    };
    tags: string[];
    logo?: string;
    isFree?: boolean;
    rating: {
        value: number;
        count: number;
    };
}

export const CourseCard = ({
    id,
    title,
    author,
    level,
    duration,
    description,
    price,
    tags,
    logo,
    isFree,
    rating,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                {/* Превью курса */}
                <div className="relative h-32 rounded-t-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
                    {logo && (
                        <Image
                            src={logo}
                            alt={title}
                            width={64}
                            height={64}
                            className="absolute bottom-4 left-6 rounded-lg object-cover"
                        />
                    )}
                </div>

                {/* Основной контент */}
                <div className="flex flex-col flex-grow p-6">
                    <div className="flex-grow">
                        <div className="min-h-[4rem] mb-3">
                            <h3 className="font-semibold text-xl text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 line-clamp-2">
                                {title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                By {author}
                            </p>
                            {rating?.value && (
                                <>
                                    <span className="text-gray-300 dark:text-gray-600">
                                        •
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {rating.value}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ({rating.count})
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="min-h-[3rem] mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge
                                variant="secondary"
                                className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                            >
                                {LEVEL_DISPLAY[level]}
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-gray-100 dark:bg-zinc-800"
                            >
                                {duration}
                            </Badge>
                            {tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Цена */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            {isFree ? (
                                <span className="font-medium text-green-600 dark:text-green-400">
                                    Бесплатно
                                </span>
                            ) : (
                                <>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {price.current.toLocaleString("ru-RU")}{" "}
                                        ₽
                                    </span>
                                    {price.old && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {price.old.toLocaleString("ru-RU")}{" "}
                                            ₽
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
