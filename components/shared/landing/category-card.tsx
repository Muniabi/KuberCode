import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { debounce } from "lodash";

export interface CategoryData {
    name: string;
    icon: React.ComponentType<any>;
    description: string;
    coursesCount: number;
    className?: string;
    gradient?: string;
}

const CategoryCard: React.FC<CategoryData> = ({
    name,
    icon: Icon,
    description,
    coursesCount,
    className,
    gradient = "from-primary/50 via-primary/40 to-transparent",
}) => {
    return (
        <Link
            href={"#"}
            className={cn(
                "group block relative",
                "backdrop-blur-xl rounded-2xl",
                "border border-border",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-1 hover:shadow-xl",
                "bg-gradient-to-br from-white/90 to-white/50",
                "dark:from-background/80 dark:to-background/40",
                "overflow-hidden",
                className
            )}
        >
            {/* Декоративные элементы фона */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Основной градиентный круг */}
                <div
                    className={cn(
                        "absolute -top-1/2 -right-1/2 w-full h-full",
                        "rounded-full blur-xl opacity-60 dark:opacity-50",
                        "bg-gradient-to-br",
                        gradient,
                        "group-hover:opacity-90 dark:group-hover:opacity-80",
                        "group-hover:scale-110",
                        "transition-all duration-500 ease-out"
                    )}
                />

                {/* Дополнительный яркий элемент */}
                <div
                    className={cn(
                        "absolute -bottom-1/2 -left-1/2 w-2/3 h-2/3",
                        "rounded-full blur-xl opacity-50 dark:opacity-40",
                        "bg-gradient-to-tr",
                        gradient,
                        "group-hover:opacity-80 dark:group-hover:opacity-70",
                        "group-hover:scale-110",
                        "transition-all duration-500 ease-out"
                    )}
                />

                {/* Верхний слой градиента */}
                <div
                    className="absolute inset-0 bg-gradient-to-t 
                            from-white/95 via-white/60 to-white/20
                            dark:from-background/90 dark:via-background/50 dark:to-background/10
                            group-hover:from-white/90 group-hover:via-white/50 group-hover:to-transparent
                            dark:group-hover:from-background/80 dark:group-hover:via-background/40 dark:group-hover:to-transparent
                            transition-all duration-500 ease-out"
                />
            </div>

            {/* Основной контент */}
            <div className="relative p-6 z-10">
                <div className="flex flex-col gap-4">
                    {/* Заголовок и иконка */}
                    <div className="flex items-center gap-4">
                        <div
                            className={cn(
                                "p-3 rounded-xl",
                                "bg-gradient-to-br from-primary/30 to-primary/10",
                                "dark:from-primary/40 dark:to-primary/20",
                                "border border-primary/30",
                                "dark:border-primary/40"
                            )}
                        >
                            <Icon className="size-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                {name}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                                {coursesCount} курсов
                            </span>
                        </div>
                    </div>

                    {/* Описание */}
                    <p className="text-sm text-muted-foreground/90 line-clamp-2">
                        {description}
                    </p>

                    {/* Кнопка */}
                    <div
                        className="flex items-center gap-2 text-sm 
                                text-primary dark:text-white
                                font-medium mt-2 group-hover:translate-x-2 
                                transition-all duration-500 ease-out"
                    >
                        Изучить направление
                        <span
                            className="opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-500"
                        >
                            →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
