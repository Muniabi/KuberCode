import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Mentor {
    id: number;
    name: string;
    photo: string;
    role: string;
    technologies: string[];
    rating: number;
    pricePerHour: number;
}

interface SimilarMentorsProps {
    currentMentorId: number;
    technologies: string[];
    specialization: string;
}

export default function SimilarMentors({
    currentMentorId,
    technologies,
    specialization,
}: SimilarMentorsProps) {
    const [similarMentors, setSimilarMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSimilarMentors = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // const response = await fetch(`/api/mentors/similar?id=${currentMentorId}&specialization=${specialization}`);
                // const data = await response.json();

                // Simulate API response
                setSimilarMentors([
                    {
                        id: 7,
                        name: "Игорь Петров",
                        photo: "/mentors/igor.jpg",
                        role: "Frontend Developer",
                        technologies: ["React", "TypeScript", "Next.js"],
                        rating: 4.7,
                        pricePerHour: 4000,
                    },
                    {
                        id: 8,
                        name: "Наталья Иванова",
                        photo: "/mentors/natalia.jpg",
                        role: "Full Stack Developer",
                        technologies: ["React", "Node.js", "MongoDB"],
                        rating: 4.8,
                        pricePerHour: 4500,
                    },
                ]);
            } catch (error) {
                console.error("Error fetching similar mentors:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSimilarMentors();
    }, [currentMentorId, specialization]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Похожие менторы</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                                        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((j) => (
                                            <div
                                                key={j}
                                                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Похожие менторы</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarMentors.map((mentor) => (
                    <Card
                        key={mentor.id}
                        className="group hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={mentor.photo}
                                        alt={mentor.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-base">
                                        {mentor.name}
                                    </CardTitle>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {mentor.role}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {mentor.technologies.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="secondary"
                                        className="bg-gray-100 dark:bg-white/5"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="font-medium">
                                        {mentor.pricePerHour}₽
                                    </span>{" "}
                                    в час
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[--purple] hover:text-[--button-bg]"
                                    onClick={() =>
                                        (window.location.href = `/mentors/${mentor.id}`)
                                    }
                                >
                                    Подробнее
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
