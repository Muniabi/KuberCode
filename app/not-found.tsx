import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-4xl text-[--purple] font-bold text-kuber-purple mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold mb-4 text-[--purple]">
                    Страница не найдена
                </h2>
                <p className="text-gray-600 mb-8">
                    Извините, запрашиваемая страница не существует или была
                    перемещена.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[--purple] rounded-md shadow-sm hover:bg-kuber-purple/90"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
