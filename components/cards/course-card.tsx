import { Badge } from "@/components/ui/badge";
import { Star, Sparkles } from "lucide-react";
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
    image?: string;
    isFree?: boolean;
    rating?: {
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
    image,
    isFree,
    rating,
}: CourseCardProps) => {
    const discount = price.old
        ? Math.round(((price.old - price.current) / price.old) * 100)
        : 0;

    return (
        <Link href={`/courses/${id}`}>
            <div className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                {discount > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-red-500 text-white border-0 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />-{discount}%
                        </Badge>
                    </div>
                )}

                <div className="relative h-32 rounded-t-xl overflow-hidden">
                    {image ? (
                        <div className="relative h-full w-full">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    ) : (
                        <div className="relative h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E1FF01]/10 via-purple-500/5 to-blue-500/10 dark:from-[#E1FF01]/20 dark:via-purple-500/10 dark:to-blue-500/20" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E1FF01]/5 to-purple-500/10 dark:via-[#E1FF01]/10 dark:to-purple-500/20" />
                            <div className="absolute inset-0 backdrop-blur-[1px]" />
                        </div>
                    )}

                    {logo && (
                        <Image
                            src={logo}
                            alt={title}
                            width={64}
                            height={64}
                            className="absolute bottom-4 left-6 rounded-lg object-cover shadow-lg z-10"
                        />
                    )}
                </div>

                <div className="flex flex-col flex-grow p-6">
                    <div className="flex-grow">
                        <div className="min-h-[4rem] mb-3">
                            <h3 className="font-semibold text-xl text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 line-clamp-2">
                                {title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Автор:{" "}
                                {author === "KC Team" ? (
                                    <span className="text-purple-500 ">
                                        {author}
                                    </span>
                                ) : (
                                    <span className="text-black dark:text-white">
                                        {author.name}
                                    </span>
                                )}
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
                                    {discount > 0 && (
                                        <span className="text-sm font-medium ml-auto dark:text-[#9DFF3B] text-primary">
                                            Скидка {discount}%
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
