"use client";

import { CourseCard } from "./CourseCard";

const courses = [
    {
        id: "1",
        title: "Основы дизайна",
        description:
            "Изучите основы графического дизайна и визуальной коммуникации. Этот курс поможет вам понять ключевые принципы дизайна, такие как композиция, цветовая палитра и типографика, а также научит вас применять эти знания на практике.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course5.png",
        dateRange: "15 января - 5 марта",
        tags: ["Дизайн", "Графика"],
    },
    {
        id: "2",
        title: "UI/UX Дизайн",
        description:
            "Создайте интуитивно понятные интерфейсы и улучшите пользовательский опыт. В этом курсе вы изучите методы проектирования, которые помогут вам создавать удобные и привлекательные интерфейсы, а также получите практические навыки в тестировании и оценке пользовательского опыта.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course2.png",
        dateRange: "3 февраля - 18 апреля",
        tags: ["UI/UX", "Дизайн"],
    },
    {
        id: "3",
        title: "Adobe Photoshop для начинающих",
        description:
            "Научитесь работать с Photoshop и создавайте потрясающие изображения. Этот курс охватывает все основные инструменты и техники, необходимые для редактирования фотографий и создания графики, а также включает практические задания для закрепления полученных знаний.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course1.png",
        dateRange: "20 января - 7 марта",
        tags: ["Photoshop", "Графика"],
    },
    {
        id: "4",
        title: "Иллюстрация в Adobe Illustrator",
        description:
            "Научитесь создавать векторные иллюстрации с помощью Adobe Illustrator. Этот курс охватывает основные инструменты и техники, необходимые для создания профессиональных иллюстраций.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course4.png",
        dateRange: "10 февраля - 25 марта",
        tags: ["Иллюстрация", "Графика"],
    },
    {
        id: "5",
        title: "Основы веб-дизайна",
        description:
            "Изучите основы веб-дизайна и создания пользовательских интерфейсов. Этот курс поможет вам понять, как проектировать эффективные и привлекательные веб-сайты.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course3.png",
        dateRange: "1 марта - 15 апреля",
        tags: ["Веб-дизайн", "UI"],
    },
    {
        id: "6",
        title: "Анимация в After Effects",
        description:
            "Научитесь создавать анимацию и визуальные эффекты с помощью Adobe After Effects. Этот курс охватывает основные техники анимации и композитинга.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course1.png",
        dateRange: "5 марта - 20 апреля",
        tags: ["Анимация", "Визуальные эффекты"],
    },
    {
        id: "7",
        title: "Фотография для начинающих",
        description:
            "Изучите основы фотографии и научитесь делать потрясающие снимки. Этот курс охватывает основные принципы композиции, освещения и редактирования фотографий.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course2.png",
        dateRange: "10 января - 28 февраля",
        tags: ["Фотография", "Искусство"],
    },
    {
        id: "8",
        title: "Креативное письмо",
        description:
            "Развивайте свои навыки креативного письма и научитесь создавать увлекательные истории. Этот курс поможет вам раскрыть свой творческий потенциал.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course3.png",
        dateRange: "15 февраля - 30 марта",
        tags: ["Письмо", "Творчество"],
    },
    {
        id: "9",
        title: "Основы маркетинга в социальных сетях",
        description:
            "Научитесь продвигать свой бизнес в социальных сетях. Этот курс охватывает стратегии и инструменты для эффективного маркетинга в социальных сетях.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course4.png",
        dateRange: "1 апреля - 15 мая",
        tags: ["Маркетинг", "Социальные сети"],
    },
    {
        id: "10",
        title: "Введение в программирование",
        description:
            "Изучите основы программирования и научитесь создавать простые приложения. Этот курс подходит для начинающих и охватывает основные концепции программирования.",
        rating: {
            value: 4.5,
            count: 100,
        },
        imageUrl: "/popular-courses/course5.png",
        dateRange: "20 марта - 10 мая",
        tags: ["Программирование", "Технологии"],
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
                    rating={course.rating.value}
                    imageUrl={course.imageUrl}
                    dateRange={course.dateRange}
                    tags={course.tags}
                    price={""}
                />
            ))}
        </div>
    );
};

export default CourseCardList;
