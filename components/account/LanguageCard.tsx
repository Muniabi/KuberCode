import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Language } from "@/app/courses/data/languages";

export function LanguageCard({ lang }: { lang: Language }) {
    return (
        <Link href={`/courses/${lang.id}`}>
            <Card className="group cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
                <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4">
                        <Image
                            src={`/svg/${lang.name.toLowerCase()}.svg`}
                            alt={lang.name}
                            width={48}
                            height={48}
                            className="rounded-lg"
                        />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-purple-600 transition-colors">
                        {lang.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">
                        {lang.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {lang.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-black/10 rounded-lg text-gray-600 dark:text-[--text-secondary] text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
