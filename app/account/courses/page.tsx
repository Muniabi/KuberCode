import CourseCardList from "@/components/myCourses/CourseCardList";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const CoursesPage = () => {
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
                                <BreadcrumbPage>Курсы</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className="flex-grow">
                    <CourseCardList />
                </div>
                <div className="min-h-[calc(100vh-64px)] max-w-md flex-none rounded-xl bg-stone-100/50 md:min-h-min dark:bg-stone-800/50 sticky top-0">
                    {/* Содержимое блока */}
                    <div className="p-4">
                        gfgsdfggdgdsdfgdsfg
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
};

export default CoursesPage;
