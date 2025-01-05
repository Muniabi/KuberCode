"use client";

import React from "react";
import { Container } from "@/components/shared/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const authorsData = [
    {
        id: 1,
        name: "Дмитрий Васильев",
        type: "UI-UX Эксперт",
        image: "/best-authors/author1.png",
        followers: "12.5K",
        courses: "8",
    },
    {
        id: 2,
        name: "Ольга Кузнецова",
        type: "Эксперт по соц. сетям",
        image: "/best-authors/author2.png",
        followers: "10K",
        courses: "6",
    },
    {
        id: 3,
        name: "Александр Морозов",
        type: "Эксперт по бизнес-идеям",
        image: "/best-authors/author3.png",
        followers: "8K",
        courses: "4",
    },
    {
        id: 4,
        name: "Марина Белова",
        type: "Эксперт по фотографиям",
        image: "/best-authors/author4.png",
        followers: "6K",
        courses: "2",
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
        <section className="relative bg-gradient-to-b from-[#FFF7EE] to-white dark:from-[#242424] dark:to-[#1a1a1a] overflow-hidden">
            <Container className="px-4 py-16 md:py-24">
                {/* Заголовок секции */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Наши{" "}
                        <span className="text-violet-500 dark:text-violet-400">
                            лучшие Авторы
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Опытные эксперты, которые помогут вам освоить новые
                        навыки и достичь профессиональных высот
                    </p>
                </div>

                {/* Карусель */}
                <Carousel
                    setApi={setApi}
                    className="w-full max-w-[90%] md:max-w-[85%] mx-auto"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {authorsData.map((author) => (
                            <CarouselItem
                                key={author.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <Card className="group transition-all duration-300 hover:shadow-lg dark:hover:shadow-violet-500/20 border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50">
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <img
                                                src={author.image}
                                                alt={author.name}
                                                className="w-full aspect-[10/9] object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                                {author.name}
                                            </h3>
                                            <p className="text-violet-500 dark:text-violet-400 font-medium mb-4">
                                                {author.type}
                                            </p>
                                            <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
                                                <span className="flex items-center gap-1">
                                                    <i className="fas fa-users" />{" "}
                                                    {author.followers}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className="fas fa-book-open" />{" "}
                                                    {author.courses} курсов
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <CarouselPrevious className="relative static hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600" />
                        <CarouselNext className="relative static hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600" />
                    </div>
                </Carousel>
            </Container>
        </section>
    );
};

export default BestAuthors;
