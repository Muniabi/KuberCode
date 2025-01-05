import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export default function DashboardPage() {
    // Временно для демонстрации
    const isProfileIncomplete = true;

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    Главная
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Личный кабинет</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {isProfileIncomplete ? (
                    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
                        <OnboardingFlow />
                    </div>
                ) : (
                    <>
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="aspect-video rounded-xl bg-stone-100/50 dark:bg-stone-800/50" />
                            <div className="aspect-video rounded-xl bg-stone-100/50 dark:bg-stone-800/50" />
                            <div className="aspect-video rounded-xl bg-stone-100/50 dark:bg-stone-800/50" />
                        </div>
                        <div className="min-h-[100vh] flex-1 rounded-xl bg-stone-100/50 md:min-h-min dark:bg-stone-800/50" />
                    </>
                )}
            </div>
        </SidebarInset>
    );
}
