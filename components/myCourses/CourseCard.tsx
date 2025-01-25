"use client";

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

interface CourseCardProps {
    title: string;
    description: string;
    rating: number;
    imageUrl: string;
    dateRange: string;
    tags: string[];
}

export const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    rating,
    imageUrl,
    dateRange,
    tags,
}) => {
    return (
        <Card className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden flex">
            <div className="relative w-1/3 ">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-4 w-2/3 flex flex-col">
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-gray-600">
                    {description}
                </CardDescription>
                <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="ml-1">{rating}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{dateRange}</div>
                <div className="flex flex-wrap mt-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
