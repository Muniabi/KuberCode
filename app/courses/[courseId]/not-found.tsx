import Link from "next/link";
import { Container } from "@/components/shared";

export default function NotFound() {
    return (
        <Container className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Курс не найден</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Извините, но курс, который вы ищете, не существует.
                </p>
                <Link
                    href="/courses"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                    Вернуться к списку курсов
                </Link>
            </div>
        </Container>
    );
}
