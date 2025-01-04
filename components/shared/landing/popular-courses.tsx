"use client";

import { motion } from "framer-motion";
import { LampContainer } from "./lamp";
import { CoursesSlider } from "./courses-slider";

const PopularCourses = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto">
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">
                            Создаем уникальные программы совместно с лучшими
                            авторами
                        </h2>
                        <p className="text-lg text-white/60">
                            Наши курсы разработаны в сотрудничестве с ведущими
                            экспертами индустрии, обеспечивая актуальность и
                            практическую применимость знаний.
                        </p>
                    </div>
                    <CoursesSlider />
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
