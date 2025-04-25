"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, Search, Share2, BookmarkPlus, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const newsCategories = [
    { id: "all", name: "Все" },
    { id: "development", name: "Разработка" },
    { id: "design", name: "Дизайн" },
    { id: "business", name: "Бизнес" },
    { id: "artificial-intelligence", name: "AI" },
    { id: "blockchain", name: "Blockchain" },
];

const news = [
    {
        id: 1,
        title: "OpenAI представила GPT-5",
        description:
            "Новая версия языковой модели с улучшенным пониманием контекста и программированием",
        category: "artificial-intelligence",
        date: "15 февраля 2024",
        source: "TechCrunch",
        readTime: "5 мин",
        important: true,
    },
    {
        id: 2,
        title: "React Server Components: будущее веб-разработки",
        description:
            "Как RSC меняют подход к созданию современных веб-приложений",
        category: "development",
        date: "14 февраля 2024",
        source: "React Blog",
        readTime: "7 мин",
        important: false,
    },
    // Добавьте больше новостей...
];

const events = [
    {
        id: 1,
        title: "React Conference 2024",
        date: "15 марта",
        month: "Март",
        day: "15",
        location: "Москва",
        type: "Конференция",
        price: "Бесплатно",
    },
    {
        id: 2,
        title: "Мастер-класс по TypeScript",
        date: "20 марта",
        month: "Март",
        day: "20",
        location: "Онлайн",
        type: "Воркшоп",
        price: "2999 ₽",
    },
    // Добавьте больше событий...
];

interface DigestSectionProps {
    searchQuery?: string;
    isSearching?: boolean;
}

export function DigestSection({
    searchQuery = "",
    isSearching = false,
}: DigestSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    const filteredNews = news.filter((item) => {
        const matchesCategory =
            selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch =
            item.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
            item.description
                .toLowerCase()
                .includes(localSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Верхняя панель с фильтрами */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Поиск новостей..."
                        className="pl-10"
                        value={localSearchQuery}
                        onChange={(e) => setLocalSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Фильтры
                </Button>
            </div>

            {/* Категории */}
            <ScrollArea className="w-full">
                <div className="flex space-x-2 pb-4">
                    {newsCategories.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                selectedCategory === category.id
                                    ? "default"
                                    : "outline"
                            }
                            className="rounded-full"
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </ScrollArea>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Основная лента новостей */}
                <div className="space-y-4 md:col-span-8">
                    {filteredNews.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            {item.important && (
                                                <Badge className="bg-red-500 hover:bg-red-600">
                                                    Важно
                                                </Badge>
                                            )}
                                            <h3 className="text-xl font-semibold">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{item.source}</span>
                                                <span>•</span>
                                                <span>{item.date}</span>
                                                <span>•</span>
                                                <span>{item.readTime}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon">
                                                <BookmarkPlus className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Боковая панель с событиями */}
                <div className="md:col-span-4 space-y-6">
                    {/* Подписка на рассылку */}
                    <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                        <CardHeader>
                            <CardTitle>IT-дайджест</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Получайте самые важные новости из мира IT каждую
                                неделю
                            </p>
                            <div className="space-y-2">
                                <Input placeholder="Ваш email" type="email" />
                                <Button className="w-full">Подписаться</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Календарь событий */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ближайшие события</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-12 text-center">
                                        <div className="text-2xl font-bold">
                                            {event.day}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {event.month}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">
                                            {event.title}
                                        </h4>
                                        <div className="text-sm text-gray-500 space-y-1">
                                            <div>{event.location}</div>
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline">
                                                    {event.type}
                                                </Badge>
                                                <span>{event.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full gap-2">
                                Все события
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
