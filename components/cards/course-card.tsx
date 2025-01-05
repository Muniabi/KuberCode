import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { LEVEL_DISPLAY } from "@/store/courses";
import { Clock } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    level: string;
    duration: string;
    description: string;
    price: {
        current: number;
        old?: number;
    };
    tags: string[];
    logo: string;
    isFree: boolean;
}

export const CourseCard = ({
    title,
    author,
    level,
    duration,
    description,
    price,
    tags,
    logo,
    isFree,
}: CourseCardProps) => {
    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6">
                {/* Логотип */}
                <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 p-2 mb-4">
                    <img
                        src={logo}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Заголовок */}
                <h3 className="font-semibold text-xl mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {title}
                </h3>

                {/* Автор */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {author.name}
                    </span>
                </div>

                {/* Описание */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {description}
                </p>

                {/* Теги */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-purple-50 dark:bg-purple-900/20"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Цена */}
                <div className="flex items-center justify-between">
                    <div>
                        {isFree ? (
                            <span className="text-green-600 dark:text-green-400 font-medium">
                                Бесплатно
                            </span>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {price.current} ₽
                                </span>
                                {price.old && (
                                    <span className="text-sm text-gray-500 line-through">
                                        {price.old} ₽
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {duration}
                    </div>
                </div>
            </div>
        </div>
    );
};
