import { Metadata } from "next";
import { MOCK_COURSES } from "@/store/courses";
import CourseContent from "./course-content";
import { notFound } from "next/navigation";

type Props = {
    params: { courseId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const course = MOCK_COURSES.find((c) => c.id === params.courseId);

    if (!course) {
        return {
            title: "Курс не найден | Kuber Code",
        };
    }

    return {
        title: `${course.title} | Kuber Code`,
        description: course.description,
    };
}

export default function CoursePage({ params }: Props) {
    const course = MOCK_COURSES.find((c) => c.id === params.courseId);

    if (!course) {
        notFound();
    }

    return <CourseContent courseId={params.courseId} />;
}
