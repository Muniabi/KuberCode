"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface CourseCardProps {
    course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/courses/${course.id}`);
    };

    return (
        <Card
            className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 h-full cursor-pointer transition-all hover:bg-white/10"
            onClick={handleClick}
        >
            <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-[300px] w-full">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary">{course.duration}</Badge>
                            {course.hasEmployment && (
                                <Badge variant="outline">
                                    С трудоустройством
                                </Badge>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                            {course.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {course.description}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 py-4 border-t border-white/10 mt-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={course.author.avatar} />
                            <AvatarFallback>
                                {course.author.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-base font-medium text-white">
                                {course.author.name}
                            </p>
                            <p className="text-sm text-white/60">
                                {course.author.position}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
