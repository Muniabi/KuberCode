import Link from "next/link";
import { LANGUAGES } from "@/app/courses/data/languages";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LanguageCard } from "./LanguageCard";

interface LanguageListProps {
    limit?: number;
}

export function LanguageList({ limit }: LanguageListProps) {
    const languages = limit ? LANGUAGES.slice(0, limit) : LANGUAGES;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((lang) => (
                <LanguageCard key={lang.id} lang={lang} />
            ))}
        </div>
    );
}
