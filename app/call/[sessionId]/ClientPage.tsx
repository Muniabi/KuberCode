"use client";

import WebRTCCall from "@/components/mentors/WebRTCCall";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function ClientPage({ sessionId }: { sessionId: string }) {
    // For a real app, you'd fetch session details here
    // For now, we'll use a placeholder for the mentor and get user from store
    const mentorName = "Виктор";
    const { user } = useAuthStore();
    const studentName = user?.name || "Студент";
    const router = useRouter();

    const handleEndCall = () => {
        // Here you could update the session status in your backend
        console.log("Call ended");
        router.push("/account/schedule");
    };

    return (
        <div className="w-screen h-screen bg-zinc-900">
            <WebRTCCall
                sessionId={sessionId}
                mentorName={mentorName}
                studentName={studentName}
                onEnd={handleEndCall}
                onClose={handleEndCall}
            />
        </div>
    );
}
