"use client";

import { CourseCard } from "./CourseCard";

const courses = [
    {
        id: "1",
        title: "Основы дизайна",
        description:
            "Изучите основы графического дизайна и визуальной коммуникации.",
        rating: 4.5,
        imageUrl: "/course-school-bg.svg",
        dateRange: "15 ноября - 17 января",
        tags: ["Дизайн", "Графика"],
    },
    {
        id: "2",
        title: "UI/UX Дизайн",
        description:
            "Создайте интуитивно понятные интерфейсы и улучшите пользовательский опыт.",
        rating: 4.8,
        imageUrl: "/course-school-bg.svg",
        dateRange: "1 декабря - 15 февраля",
        tags: ["UI/UX", "Дизайн"],
    },
    {
        id: "3",
        title: "Adobe Photoshop для начинающих",
        description:
            "Научитесь работать с Photoshop и создавайте потрясающие изображения.",
        rating: 4.7,
        imageUrl: "/popular-courses/course1.png",
        dateRange: "10 января - 20 марта",
        tags: ["Photoshop", "Графика"],
    },
];

const CourseCardList: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    rating={course.rating}
                    imageUrl={course.imageUrl}
                    dateRange={course.dateRange}
                    tags={course.tags}
                />
            ))}
        </div>
    );
};

export default CourseCardList;
