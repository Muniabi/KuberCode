import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageList } from "./LanguageList";

export function CurrentLanguages({
    showAllLanguagesLink = true,
}: {
    showAllLanguagesLink?: boolean;
}) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Изучаемые языки</CardTitle>
                {showAllLanguagesLink && (
                    <Link href="/account/languages">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Все языки
                        </button>
                    </Link>
                )}
            </CardHeader>
            <CardContent>
                <LanguageList limit={6} />
            </CardContent>
        </Card>
    );
}
