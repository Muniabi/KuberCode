"use client";

import React from "react";
import { Container } from "@/components/shared/container";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const authorsData = [
    {
        id: 1,
        name: "Виктор Рак",
        position:
            "Дизайнер главного офиса MasterCard, сотрудничал с компанией Google",
        image: "/best-authors/vitya.avif",
        courses: "12",
        followers: "15K",
    },
    {
        id: 2,
        name: "Ольга Кузнецова",
        position: "Эксперт по UI/UX дизайну, ведущий дизайнер в Яндекс",
        image: "/best-authors/author2.png",
        courses: "8",
        followers: "10K",
    },
    {
        id: 3,
        name: "Александр Морозов",
        position: "Senior Frontend разработчик, Tech Lead в VK",
        image: "/best-authors/author3.png",
        courses: "6",
        followers: "8K",
    },
    {
        id: 4,
        name: "Марина Белова",
        position: "Product Designer, экс-арт директор Mail.ru Group",
        image: "/best-authors/author4.png",
        courses: "4",
        followers: "12K",
    },
];

interface PopularCoursesProps {
    className?: string;
}

const BestAuthors = ({ className }: PopularCoursesProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="relative bg-white dark:bg-zinc-900 overflow-hidden">
            <Container className="px-4 py-16 md:py-24">
                <div className="flex justify-between items-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Топовые IT-эксперты делятся знаниями
                    </h2>
                    <div className="flex items-center gap-4">
                        {/* Перенесли кнопки внутрь Carousel */}
                    </div>
                </div>

                <Carousel
                    setApi={setApi}
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <div className="flex items-center justify-end mb-4">
                        <CarouselPrevious className="static border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full" />
                        <CarouselNext className="static border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full ml-4" />
                    </div>
                    <CarouselContent className="-ml-4">
                        {authorsData.map((author) => (
                            <CarouselItem
                                key={author.id}
                                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <div className="group">
                                    <div className="relative aspect-square overflow-hidden mb-6">
                                        <img
                                            src={author.image}
                                            alt={author.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                                        {author.name}
                                    </h3>
                                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                        {author.position}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                                        <Badge className="bg-[#1E1E1E] text-white dark:bg-white dark:text-black">
                                            {author.followers} подписчиков
                                        </Badge>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-[#1E1E1E] text-white dark:bg-white dark:text-black">
                                                {author.courses} курсов
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </Container>
        </section>
    );
};

export default BestAuthors;
