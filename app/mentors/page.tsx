"use client";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { motion } from "framer-motion";
import {
    Search,
    Code2,
    Timer,
    Star,
    Users,
    Calendar,
    MessageSquare,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";
import SocialLinks from "@/components/mentors/SocialLinks";
import QuickBook from "@/components/mentors/QuickBook";
import SimilarMentors from "@/components/mentors/SimilarMentors";
import BackToTop from "@/components/shared/BackToTop";
import TopMentors from "@/components/mentors/TopMentors";
import MentorSkeleton from "@/components/mentors/MentorSkeleton";
import { useState, useEffect } from "react";

// Add types for mentors
interface SocialLink {
    type: "github" | "linkedin" | "twitter" | "website";
    url: string;
}

interface Mentor {
    id: number;
    name: string;
    photo: string;
    role: string;
    experience: string;
    description: string;
    specialization: string;
    technologies: string[];
    rating: number;
    sessions: number;
    pricePerHour: number;
    availability: string;
    socialLinks?: SocialLink[];
}

// Временные данные для менторов
const MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Александр Иванов",
        photo: "/mentors/alexander.jpg",
        role: "Senior Frontend Developer",
        experience: "8 лет опыта",
        description:
            "Эксперт по React и TypeScript, специализируюсь на производительности и архитектуре приложений",
        specialization: "Frontend Development",
        technologies: ["React", "TypeScript", "Next.js", "Redux"],
        rating: 4.9,
        sessions: 156,
        pricePerHour: 5000,
        availability: "Сегодня",
        socialLinks: [
            { type: "github", url: "https://github.com/aivanov" },
            { type: "linkedin", url: "https://linkedin.com/in/aivanov" },
            { type: "website", url: "https://aivanov.dev" },
        ],
    },
    {
        id: 2,
        name: "Мария Петрова",
        photo: "/mentors/maria.jpg",
        role: "Full Stack Developer",
        experience: "6 лет опыта",
        description:
            "Разработчик с опытом создания масштабируемых веб-приложений",
        specialization: "Full Stack Development",
        technologies: ["Node.js", "React", "PostgreSQL", "Docker"],
        rating: 4.8,
        sessions: 98,
        pricePerHour: 4500,
        availability: "Завтра",
    },
    {
        id: 3,
        name: "Дмитрий Смирнов",
        photo: "/mentors/dmitry.jpg",
        role: "Mobile Developer",
        experience: "7 лет опыта",
        description:
            "Специалист по React Native и Flutter, создаю кроссплатформенные приложения",
        specialization: "Mobile Development",
        technologies: ["React Native", "Flutter", "Firebase", "TypeScript"],
        rating: 4.9,
        sessions: 134,
        pricePerHour: 5500,
        availability: "Через 2 дня",
    },
    {
        id: 4,
        name: "Елена Козлова",
        photo: "/mentors/elena.jpg",
        role: "Backend Developer",
        experience: "5 лет опыта",
        description:
            "Эксперт по Python и Django, специализируюсь на высоконагруженных системах",
        specialization: "Backend Development",
        technologies: ["Python", "Django", "FastAPI", "PostgreSQL"],
        rating: 4.7,
        sessions: 87,
        pricePerHour: 4000,
        availability: "Сегодня",
    },
    {
        id: 5,
        name: "Сергей Волков",
        photo: "/mentors/sergey.jpg",
        role: "DevOps Engineer",
        experience: "9 лет опыта",
        description:
            "Помогаю выстраивать процессы CI/CD и облачную инфраструктуру",
        specialization: "DevOps",
        technologies: ["Kubernetes", "AWS", "Docker", "Terraform"],
        rating: 4.9,
        sessions: 192,
        pricePerHour: 6000,
        availability: "Завтра",
    },
    {
        id: 6,
        name: "Анна Соколова",
        photo: "/mentors/anna.jpg",
        role: "UX/UI Designer & Developer",
        experience: "4 года опыта",
        description:
            "Создаю красивые и удобные интерфейсы, обучаю основам дизайн-систем",
        specialization: "Frontend Development",
        technologies: ["Figma", "React", "CSS", "Tailwind"],
        rating: 4.8,
        sessions: 76,
        pricePerHour: 3500,
        availability: "Сегодня",
    },
];

const SPECIALIZATIONS = [
    { value: "all", label: "Все специализации" },
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "devops", label: "DevOps" },
];

const PRICE_RANGES = [
    { value: "all", label: "Любая цена" },
    { value: "0-3000", label: "До 3000₽/час" },
    { value: "3000-5000", label: "3000-5000₽/час" },
    { value: "5000+", label: "От 5000₽/час" },
];

// Add Schema.org markup with proper types
const generateSchemaMarkup = (mentors: Mentor[]) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: mentors.map((mentor: Mentor, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Person",
                name: mentor.name,
                image: mentor.photo,
                jobTitle: mentor.role,
                description: mentor.description,
                knowsAbout: mentor.technologies,
                skill: mentor.technologies,
                makesOffer: {
                    "@type": "Offer",
                    price: mentor.pricePerHour,
                    priceCurrency: "RUB",
                    availability:
                        mentor.availability === "Сегодня"
                            ? "https://schema.org/InStock"
                            : "https://schema.org/PreOrder",
                },
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default function MentorsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [mentors, setMentors] = useState<Mentor[]>([]);

    useEffect(() => {
        const fetchMentors = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setMentors(MENTORS);
            } catch (error) {
                console.error("Error fetching mentors:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentors();
    }, []);

    return (
        <>
            {generateSchemaMarkup(mentors)}
            <div className="min-h-screen bg-gray-50 dark:bg-[--bg-color] pb-20">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-b from-white dark:from-[--card-bg] to-transparent pt-20 pb-32">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent mb-6"
                            >
                                Найдите своего идеального ментора
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                            >
                                Персональное наставничество от опытных
                                разработчиков поможет вам быстрее достичь своих
                                целей в программировании
                            </motion.p>
                        </div>

                        {/* Filters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-[--card-bg] rounded-2xl shadow-lg p-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Поиск по имени или навыкам"
                                        className="pl-10"
                                    />
                                </div>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Специализация" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SPECIALIZATIONS.map((spec) => (
                                            <SelectItem
                                                key={spec.value}
                                                value={spec.value}
                                            >
                                                {spec.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Стоимость" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PRICE_RANGES.map((range) => (
                                            <SelectItem
                                                key={range.value}
                                                value={range.value}
                                            >
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button className="bg-[--purple] hover:bg-[--button-bg] text-white">
                                    Найти ментора
                                </Button>
                            </div>
                        </motion.div>
                    </Container>
                </div>

                {/* Top Mentors Section */}
                <Container className="mb-16">
                    <TopMentors />
                </Container>

                {/* Mentors Grid */}
                <Container>
                    {isLoading ? (
                        <MentorSkeleton count={6} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.map((mentor, index) => (
                                <motion.div
                                    key={mentor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="group bg-white dark:bg-[--card-bg] border-none overflow-hidden transition-all duration-300 hover:shadow-xl">
                                        <CardHeader className="relative pb-0">
                                            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                {mentor.availability}
                                            </div>
                                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-4">
                                                <Image
                                                    src={mentor.photo}
                                                    alt={mentor.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 96px) 100vw, 96px"
                                                    priority={index < 6}
                                                />
                                            </div>
                                            <CardTitle className="text-xl mb-1">
                                                {mentor.name}
                                            </CardTitle>
                                            <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                                                {mentor.role}
                                            </CardDescription>
                                            {mentor.socialLinks && (
                                                <SocialLinks
                                                    links={mentor.socialLinks}
                                                    className="mt-2"
                                                />
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {mentor.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {mentor.technologies.map(
                                                    (tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 dark:bg-white/5">
                                                    <Star className="w-4 h-4 text-yellow-400 mb-1" />
                                                    <span className="text-sm font-medium">
                                                        {mentor.rating}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Рейтинг
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 dark:bg-white/5">
                                                    <Users className="w-4 h-4 text-[--purple] mb-1" />
                                                    <span className="text-sm font-medium">
                                                        {mentor.sessions}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Сессий
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 dark:bg-white/5">
                                                    <Timer className="w-4 h-4 text-[--lime] mb-1" />
                                                    <span className="text-sm font-medium">
                                                        {mentor.pricePerHour}₽
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        В час
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2">
                                            <QuickBook
                                                mentorName={mentor.name}
                                                mentorId={mentor.id}
                                                availability={
                                                    mentor.availability
                                                }
                                            />
                                            <Button className="flex-1 bg-[--purple] hover:bg-[--button-bg] text-white">
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Связаться
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Similar Mentors Section */}
                    {!isLoading && mentors.length > 0 && (
                        <div className="mt-16">
                            <SimilarMentors
                                currentMentorId={mentors[0].id}
                                technologies={mentors[0].technologies}
                                specialization={mentors[0].specialization}
                            />
                        </div>
                    )}
                </Container>

                {/* How it Works Section */}
                <div className="mt-32 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent mb-16">
                        Как работает менторство
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[--purple]/10 flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-[--purple]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Выберите ментора
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Просмотрите профили менторов и выберите того,
                                кто лучше всего подходит для ваших целей
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[--lime]/10 flex items-center justify-center mx-auto mb-6">
                                <Calendar className="w-8 h-8 text-[--lime]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Запланируйте сессию
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Выберите удобное время и забронируйте вашу
                                первую менторскую сессию
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[--yellow]/10 flex items-center justify-center mx-auto mb-6">
                                <Code2 className="w-8 h-8 text-[--yellow]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Начните обучение
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Получите персональную поддержку и ускорьте свой
                                путь в программировании
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <BackToTop />
        </>
    );
}
