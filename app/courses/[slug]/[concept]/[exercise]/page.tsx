"use client";

import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EXERCISES } from "@/app/courses/data/exercises";
import ExerciseLayout from "@/components/exercise/ExerciseLayout";

export default function ExercisePage() {
    const params = useParams();
    const router = useRouter();
    const { slug, concept, exercise: exerciseId } = params;

    // Get exercise data
    const exercises = EXERCISES[concept as string] || [];
    const exercise = exercises.find((ex) => ex.id === exerciseId);

    if (!exercise) {
        return (
            <Container className="relative z-10 py-8">
                <h1 className="text-2xl text-[--text-color]">
                    Задача не найдена
                </h1>
                <Button
                    className="mt-4 bg-[--purple] hover:bg-[--button-bg] text-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться назад
                </Button>
            </Container>
        );
    }

    // Initial code template based on the language
    const getInitialCode = () => {
        switch (slug) {
            case "cpp":
                return `#include <iostream>\n\nint main() {\n    // Ваше решение здесь\n    return 0;\n}`;
            case "python":
                return `# Ваше решение здесь\n`;
            case "javascript":
                return `// Ваше решение здесь\n`;
            default:
                return `// Начните писать код здесь\n`;
        }
    };

    return (
        <div className="min-h-screen bg-[--bg-color]">
            <ExerciseLayout
                exercise={{
                    ...exercise,
                    initialCode: getInitialCode(),
                    language: slug as string,
                    id: exerciseId as string,
                }}
            />
        </div>
    );
}
