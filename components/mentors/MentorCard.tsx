import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Star,
    Users,
    Timer,
    MessageSquare,
    Info,
    Mail,
    MessageCircle,
    Code2,
    GraduationCap,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialLinks from "./SocialLinks";
import QuickBook from "./QuickBook";

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
    contacts?: {
        telegram?: string;
        email?: string;
    };
    education?: string[];
    achievements?: string[];
    projects?: Array<{
        name: string;
        description: string;
        technologies: string[];
    }>;
    hourlyRate: number;
}

interface MentorCardProps {
    mentor: {
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
        contacts?: {
            telegram?: string;
            email?: string;
        };
        education?: string[];
        projects?: Array<{
            name: string;
            description: string;
            technologies: string[];
        }>;
    };
    index?: number;
}

export default function MentorCard({ mentor, index = 0 }: MentorCardProps) {
    const handleContactClick = (
        type: "telegram" | "email",
        contact?: string
    ) => {
        if (!contact) return;

        if (type === "telegram") {
            window.open(`https://t.me/${contact.replace("@", "")}`, "_blank");
        } else if (type === "email") {
            window.location.href = `mailto:${contact}`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="group bg-white dark:bg-[--card-bg] border-none overflow-hidden transition-all duration-300 hover:shadow-xl h-[600px] flex flex-col">
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
                    <CardDescription className="text-base text-zinc-600 dark:text-zinc-400">
                        {mentor.role}
                    </CardDescription>
                    {mentor.socialLinks && (
                        <SocialLinks
                            links={mentor.socialLinks}
                            className="mt-2"
                        />
                    )}
                </CardHeader>

                <CardContent className="flex-1">
                    {/* Price Section */}
                    <div className="bg-[--purple]/5 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                                Стоимость занятия
                            </span>
                            <Badge
                                variant="secondary"
                                className="bg-[--purple]/10 text-[--purple] border-none"
                            >
                                60 минут
                            </Badge>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-[--purple]">
                                {mentor.pricePerHour.toLocaleString("ru-RU")}
                            </span>
                            <span className="text-lg font-medium text-[--purple] ml-1">
                                ₽
                            </span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                                за занятие
                            </span>
                        </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                        {mentor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {mentor.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-50 dark:bg-white/5">
                            <Star className="w-4 h-4 text-yellow-400 mb-1" />
                            <span className="text-sm font-medium">
                                {mentor.rating}
                            </span>
                            <span className="text-xs text-zinc-500">
                                Рейтинг
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-50 dark:bg-white/5">
                            <Users className="w-4 h-4 text-[--purple] mb-1" />
                            <span className="text-sm font-medium">
                                {mentor.sessions}
                            </span>
                            <span className="text-xs text-zinc-500">
                                Сессий
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-50 dark:bg-white/5">
                            <Timer className="w-4 h-4 text-[--lime] mb-1" />
                            <span className="text-sm font-medium">
                                {mentor.experience}
                            </span>
                            <span className="text-xs text-zinc-500">Опыт</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2 mt-auto">
                    <QuickBook
                        mentorId={mentor.id}
                        mentorName={mentor.name}
                        availability={mentor.availability}
                        hourlyRate={mentor.pricePerHour}
                        className="w-full"
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex-1 bg-[--purple] hover:bg-[--button-bg] text-white">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Связаться
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Выберите способ связи</DialogTitle>
                                <DialogDescription>
                                    Как вы хотите связаться с ментором?
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                        handleContactClick(
                                            "telegram",
                                            mentor.contacts?.telegram
                                        )
                                    }
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.12.098.153.228.166.331.032.259.019.599-.035 1.466z" />
                                    </svg>
                                    Telegram
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                        handleContactClick(
                                            "email",
                                            mentor.contacts?.email
                                        )
                                    }
                                >
                                    <Mail className="w-5 h-5" />
                                    Email
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Info className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    Подробная информация о менторе
                                </DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="about" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="about">
                                        <Code2 className="w-4 h-4 mr-2" />О
                                        менторе
                                    </TabsTrigger>
                                    <TabsTrigger value="education">
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        Образование
                                    </TabsTrigger>
                                    <TabsTrigger value="projects">
                                        <Code2 className="w-4 h-4 mr-2" />
                                        Проекты
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="about"
                                    className="space-y-4"
                                >
                                    <div className="flex gap-6">
                                        <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                                            <Image
                                                src={mentor.photo}
                                                alt={mentor.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 192px) 100vw, 192px"
                                                priority
                                            />
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <div className="space-y-2">
                                                <h4 className="font-semibold">
                                                    Описание
                                                </h4>
                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    {mentor.description}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold">
                                                    Специализация
                                                </h4>
                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    {mentor.specialization}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold">
                                                    Технологии
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {mentor.technologies.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="secondary"
                                                                className="bg-zinc-100 dark:bg-white/5"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent
                                    value="education"
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <h4 className="font-semibold">
                                            Образование
                                        </h4>
                                        <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
                                            {mentor.education?.map(
                                                (edu, index) => (
                                                    <li key={index}>{edu}</li>
                                                )
                                            ) || (
                                                <li>
                                                    Информация об образовании
                                                    отсутствует
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent
                                    value="projects"
                                    className="space-y-4"
                                >
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h4 className="font-semibold">
                                                Проекты
                                            </h4>
                                            <div className="grid gap-4">
                                                {mentor.projects?.map(
                                                    (project, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-4 rounded-xl bg-zinc-50 dark:bg-white/5"
                                                        >
                                                            <h5 className="font-medium mb-2">
                                                                {project.name}
                                                            </h5>
                                                            <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                                                                {
                                                                    project.description
                                                                }
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.technologies.map(
                                                                    (tech) => (
                                                                        <Badge
                                                                            key={
                                                                                tech
                                                                            }
                                                                            variant="secondary"
                                                                            className="bg-zinc-100 dark:bg-white/5"
                                                                        >
                                                                            {
                                                                                tech
                                                                            }
                                                                        </Badge>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                ) || (
                                                    <p className="text-zinc-600 dark:text-zinc-400">
                                                        Информация о проектах
                                                        отсутствует
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
