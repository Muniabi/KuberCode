"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ThumbsUp, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    { id: "all", name: "Все" },
    { id: "programming", name: "Программирование" },
    { id: "design", name: "Дизайн" },
    { id: "career", name: "Карьера" },
    { id: "technology", name: "Технологии" },
];

const articles = [
    {
        id: 1,
        title: "10 трендов веб-разработки в 2024 году",
        description:
            "Обзор самых популярных технологий и инструментов в веб-разработке",
        category: "programming",
        image: "./course-school-bg.svg",
        date: "2024-01-15",
        likes: 245,
        comments: 58,
        author: {
            name: "Алексей Иванов",
            avatar: "/avatar1.png",
        },
    },
    // Добавьте больше статей...
];

export const BlogSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Фильтры и поиск */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input placeholder="Поиск статей..." className="pl-10" />
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Сортировка" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">
                                Сначала новые
                            </SelectItem>
                            <SelectItem value="popular">
                                По популярности
                            </SelectItem>
                            <SelectItem value="discussed">
                                Обсуждаемые
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Категории */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant="outline"
                        className="rounded-full"
                        size="sm"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Сетка статей */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-video">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full"
                                    >
                                        {
                                            categories.find(
                                                (c) => c.id === article.category
                                            )?.name
                                        }
                                    </Badge>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(
                                            article.date
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <CardTitle className="line-clamp-2">
                                    {article.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {article.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">
                                        {article.author.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="text-sm">
                                            {article.likes}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm">
                                            {article.comments}
                                        </span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Пагинация */}
            <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm">
                    Предыдущая
                </Button>
                <Button variant="outline" size="sm">
                    1
                </Button>
                <Button variant="default" size="sm">
                    2
                </Button>
                <Button variant="outline" size="sm">
                    3
                </Button>
                <Button variant="outline" size="sm">
                    Следующая
                </Button>
            </div>
        </motion.div>
    );
};
