// Серверный компонент
import { Metadata } from "next";
import CoursesContent from "./courses-content";

export const metadata: Metadata = {
    title: "Kuber Code | Курсы",
    description:
        "Изучайте программирование, дизайн, маркетинг и другие направления с нашими экспертами",
    keywords: [
        "курсы",
        "обучение",
        "IT",
        "программирование",
        "дизайн",
        "маркетинг",
        "курсы",
        "обучение",
        "IT-платформа",
    ],
};

export default function CoursesPage() {
    return <CoursesContent />;
}
