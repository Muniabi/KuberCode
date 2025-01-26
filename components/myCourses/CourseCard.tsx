"use client";

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { MoveRight } from "lucide-react";

interface CourseCardProps {
    title: string;
    description: string;
    price: string;
    rating: number;
    imageUrl: string;
    dateRange: string;
    tags: string[];
}

export const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    price,
    rating,
    imageUrl,
    dateRange,
    tags,
}) => {
    return (
        <Card className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl flex justify-between gap-12 p-4">
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={100}
                    className=" object-cover rounded-lg aspect-video"
                />
                <Badge className="absolute bottom-2 left-2 bg-white dark:bg-black text-sm text-black dark:text-white hover:bg-white dark:hover:bg-black">
                    {dateRange}
                </Badge>
            </div>
            <CardContent className="flex-grow pl-4 pb-0 flex flex-col justify-between">
                <div className="max-w-md">
                    <CardTitle className="text-lg font-semibold mb-4">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3">
                        {description}
                    </CardDescription>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-[#232529] text-white text-xs px-3 py-2 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Link
                        href={``}
                        className="bg-[--lime] text-black px-3 py-2 rounded-md flex items-center hover:scale-110 transition-all duration-200"
                    >
                        <span>
                            <MoveRight size={20} />
                        </span>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
