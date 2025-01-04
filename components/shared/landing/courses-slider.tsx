"use client";

import { useCoursesStore } from "@/store/courses";
import { CourseCard } from "./course-card";
import { useEffect, useRef, useState } from "react";

export const CoursesSlider = () => {
    const { popularCourses } = useCoursesStore();
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === popularCourses.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [popularCourses.length]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${
                currentSlide * 100
            }%)`;
        }
    }, [currentSlide]);

    return (
        <div className="relative overflow-hidden h-[600px]">
            <div
                ref={sliderRef}
                className="flex transition-transform duration-700 ease-in-out h-full"
            >
                {popularCourses.map((course) => (
                    <div key={course.id} className="min-w-full px-2">
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
};
