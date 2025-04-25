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
import {
    Search,
    Calendar,
    ThumbsUp,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Star,
    GitFork,
    Eye,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { fetchArticles, searchArticles } from "./blog-service";
import { Article } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
    { id: "webdev", label: "Web Development", icon: "🌐" },
    { id: "programming", label: "Programming", icon: "💻" },
    { id: "javascript", label: "JavaScript", icon: "📜" },
    { id: "react", label: "React", icon: "⚛️" },
    { id: "typescript", label: "TypeScript", icon: "📘" },
    { id: "python", label: "Python", icon: "🐍" },
];

const ITEMS_PER_PAGE = 18;

interface BlogSectionProps {
    searchQuery?: string;
    isSearching?: boolean;
}

export function BlogSection({
    searchQuery = "",
    isSearching = false,
}: BlogSectionProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const loadArticles = async (
        page: number,
        category?: string,
        query?: string
    ) => {
        try {
            setLoading(true);
            setError(null);
            const options = {
                page,
                perPage: ITEMS_PER_PAGE,
                ...(category && { category }),
                ...(query && { query }),
            };
            const data = await fetchArticles(options);
            setArticles(data.articles);
            setTotalPages(data.pagesCount);
        } catch (err) {
            setError("Не удалось загрузить статьи");
            console.error("Error loading articles:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSearching) {
            setCurrentPage(1);
            loadArticles(1, selectedCategory, searchQuery);
        }
    }, [searchQuery, isSearching]);

    useEffect(() => {
        loadArticles(currentPage, selectedCategory, searchQuery);
    }, [currentPage, selectedCategory]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i)}
                    className="min-w-[40px]"
                >
                    {i}
                </Button>
            );
        }

        return (
            <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                {startPage > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            className="min-w-[40px]"
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="px-2">...</span>}
                    </>
                )}
                {pages}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="px-2">...</span>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            className="min-w-[40px]"
                        >
                            {totalPages}
                        </Button>
                    </>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* Категории */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Button
                        variant={
                            selectedCategory === "" ? "default" : "outline"
                        }
                        onClick={() => setSelectedCategory("")}
                        className="rounded-full px-6"
                    >
                        Все
                    </Button>
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                selectedCategory === category.id
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setSelectedCategory(category.id)}
                            className="rounded-full px-6"
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                        </Button>
                    ))}
                </div>

                {/* Сетка статей */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="wait">
                        {loading
                            ? Array.from({ length: ITEMS_PER_PAGE }).map(
                                  (_, index) => (
                                      <motion.div
                                          key={index}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="h-full"
                                      >
                                          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                              <Skeleton className="aspect-video w-full" />
                                              <CardHeader className="flex-1 flex flex-col">
                                                  <Skeleton className="h-4 w-24 mb-2" />
                                                  <Skeleton className="h-6 w-full mb-2" />
                                                  <Skeleton className="h-4 w-full" />
                                              </CardHeader>
                                              <CardContent className="flex justify-between border-t pt-4">
                                                  <Skeleton className="h-6 w-32" />
                                                  <Skeleton className="h-6 w-24" />
                                              </CardContent>
                                          </Card>
                                      </motion.div>
                                  )
                              )
                            : articles.map((article) => (
                                  <motion.div
                                      key={article.id}
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      transition={{ duration: 0.3 }}
                                      className="h-full"
                                  >
                                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                                          {article.image && (
                                              <div className="relative aspect-video overflow-hidden">
                                                  <img
                                                      src={article.image}
                                                      alt={article.title}
                                                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                                  />
                                              </div>
                                          )}
                                          <CardHeader className="flex-1 flex flex-col">
                                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                  {article.categories?.map(
                                                      (category) => (
                                                          <Badge
                                                              key={category}
                                                              variant="secondary"
                                                              className="rounded-full"
                                                          >
                                                              {category}
                                                          </Badge>
                                                      )
                                                  )}
                                              </div>
                                              <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                                                  <a
                                                      href={article.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="hover:underline"
                                                  >
                                                      {article.title}
                                                  </a>
                                              </CardTitle>
                                              <p className="text-muted-foreground line-clamp-3 mt-2">
                                                  {article.description}
                                              </p>
                                          </CardHeader>
                                          <CardContent className="flex justify-between items-center border-t pt-4">
                                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                  <div className="flex items-center">
                                                      <Calendar className="w-4 h-4 mr-1" />
                                                      {new Date(
                                                          article.pubDate
                                                      ).toLocaleDateString(
                                                          "ru-RU"
                                                      )}
                                                  </div>
                                                  <div className="flex items-center">
                                                      <ThumbsUp className="w-4 h-4 mr-1" />
                                                      {article.reactions || 0}
                                                  </div>
                                                  <div className="flex items-center">
                                                      <MessageSquare className="w-4 h-4 mr-1" />
                                                      {article.comments || 0}
                                                  </div>
                                              </div>
                                              <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  asChild
                                              >
                                                  <a
                                                      href={article.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center gap-2"
                                                  >
                                                      Читать
                                                      <ExternalLink className="w-4 h-4" />
                                                  </a>
                                              </Button>
                                          </CardContent>
                                      </Card>
                                  </motion.div>
                              ))}
                    </AnimatePresence>
                </div>

                {/* Пагинация */}
                {!loading && totalPages > 1 && renderPagination()}

                {error && (
                    <div className="text-red-500 text-center mt-4">{error}</div>
                )}
            </motion.div>
        </div>
    );
}
