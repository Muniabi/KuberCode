import ClientPage from "./ClientPage";

export default function Page({ params }: { params: { sessionId: string } }) {
    return <ClientPage sessionId={params.sessionId} />;
}
