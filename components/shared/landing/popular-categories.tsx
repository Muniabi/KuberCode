"use client";

import React, { Suspense } from "react";
import { CategoryCardSkeleton } from "./category-card-skeleton";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Container } from "@/components/shared/container";
import {
    FileCode2,
    PenTool,
    MicVocal,
    BriefcaseBusiness,
    Database,
    Lightbulb,
} from "lucide-react";

// Ленивая загрузка компонента карточки
const CategoryCard = dynamic(() => import("./category-card"), {
    loading: () => <CategoryCardSkeleton />,
    ssr: false,
});

export interface CategoryData {
    name: string;
    icon: React.ComponentType<any>;
    description: string;
    coursesCount: number;
    gradient?: string;
}

const categories: CategoryData[] = [
    {
        name: "Разработка",
        icon: FileCode2,
        description:
            "Изучите современные языки программирования, фреймворки и инструменты разработки. От веб-разработки до мобильных приложений.",
        coursesCount: 156,
        gradient: "from-blue-500/40 via-blue-500/20 to-transparent",
    },
    {
        name: "Дизайн",
        icon: PenTool,
        description:
            "Освойте UI/UX дизайн, графический дизайн и создание цифровых продуктов. Работа с современными инструментами дизайна.",
        coursesCount: 89,
        gradient: "from-purple-500/40 via-purple-500/20 to-transparent",
    },
    {
        name: "Маркетинг",
        icon: MicVocal,
        description:
            "Digital-маркетинг, SMM, контент-маркетинг и аналитика. Современные стратегии продвижения в цифровой среде.",
        coursesCount: 94,
        gradient: "from-green-500/40 via-green-500/20 to-transparent",
    },
    {
        name: "Бизнес",
        icon: BriefcaseBusiness,
        description:
            "Управление проектами, предпринимательство и бизнес-аналитика. Практические навыки для развития бизнеса.",
        coursesCount: 127,
        gradient: "from-orange-500/40 via-orange-500/20 to-transparent",
    },
    {
        name: "Data Science",
        icon: Database,
        description:
            "Анализ данных, машинное обучение и искусственный интеллект. Работа с большими данными и предиктивная аналитика.",
        coursesCount: 73,
        gradient: "from-indigo-500/40 via-indigo-500/20 to-transparent",
    },
    {
        name: "Личное развитие",
        icon: Lightbulb,
        description:
            "Soft skills, тайм-менеджмент, продуктивность и лидерство. Развитие личной эффективности и коммуникативных навыков.",
        coursesCount: 68,
        gradient: "from-pink-500/40 via-pink-500/20 to-transparent",
    },
];

const PopularCategories: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView) {
            setIsLoading(false);
        }
    }, [inView]);

    // Оптимизированная версия с fallback для медленного интернета
    return (
        <Container className="py-12 sm:py-16 md:py-24 px-4 md:px-8">
            <div className="flex flex-col items-center text-center md:text-left md:items-start">
                <h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold 
                             bg-gradient-to-r from-primary via-primary/80 to-primary/60 
                             bg-clip-text text-transparent mb-12"
                >
                    Популярные направления
                </h2>

                {/* Сетка с карточками */}
                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                            gap-4 sm:gap-5 md:gap-6 w-full"
                >
                    {isLoading
                        ? // Показываем скелетон при загрузке
                          Array(6)
                              .fill(0)
                              .map((_, index) => (
                                  <CategoryCardSkeleton key={index} />
                              ))
                        : // Показываем реальные карточки с оптимизированной анимацией
                          categories.map((category, index) => (
                              <Suspense
                                  key={index}
                                  fallback={<CategoryCardSkeleton />}
                              >
                                  <CategoryCard
                                      {...category}
                                      className="hover:scale-[1.02] transition-transform duration-200 
                                             motion-reduce:hover:scale-100 motion-reduce:transition-none"
                                  />
                              </Suspense>
                          ))}
                </div>

                {/* Fallback для медленного интернета */}
                {isLoading && (
                    <div className="text-center mt-8 text-muted-foreground">
                        <p>Загрузка категорий...</p>
                        <button
                            onClick={() => setIsLoading(false)}
                            className="mt-2 text-primary hover:underline"
                        >
                            Показать категории без анимации
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default PopularCategories;
