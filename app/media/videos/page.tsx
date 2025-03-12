import { HomeView } from "./home-view";

export const dynamic = "force-dynamic";

interface PageProps {
    searchParams: Promise<{ categoryId?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
    const { categoryId } = await searchParams;
    return <HomeView categoryId={categoryId} />;
};
export default Page;
