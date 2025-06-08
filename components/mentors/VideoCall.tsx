import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Mic, MicOff, VideoOff, Phone } from "lucide-react";

interface VideoCallProps {
    sessionId: string;
    mentorName: string;
    studentName: string;
    onEnd?: () => void;
}

declare global {
    interface Window {
        JitsiMeetExternalAPI: any;
    }
}

export default function VideoCall({
    sessionId,
    mentorName,
    studentName,
    onEnd,
}: VideoCallProps) {
    const jitsiContainer = useRef<HTMLDivElement>(null);
    const jitsiApi = useRef<any>(null);

    useEffect(() => {
        // Загружаем Jitsi Meet API скрипт
        const loadJitsiScript = () => {
            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            document.body.appendChild(script);
            return script;
        };

        // Инициализируем Jitsi Meet
        const initJitsi = () => {
            if (!jitsiContainer.current) return;

            const domain = "meet.jit.si";
            const options = {
                roomName: `kubercode-session-${sessionId}`,
                width: "100%",
                height: "500px",
                parentNode: jitsiContainer.current,
                lang: "ru",
                userInfo: {
                    displayName: studentName,
                },
                configOverwrite: {
                    startWithAudioMuted: true,
                    startWithVideoMuted: false,
                    prejoinPageEnabled: false,
                    disableDeepLinking: true,
                },
                interfaceConfigOverwrite: {
                    TOOLBAR_BUTTONS: [
                        "microphone",
                        "camera",
                        "desktop",
                        "chat",
                        "raisehand",
                        "hangup",
                    ],
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    DEFAULT_BACKGROUND: "#1a1b1e",
                },
            };

            jitsiApi.current = new window.JitsiMeetExternalAPI(domain, options);

            // Обработчики событий
            jitsiApi.current.addEventListeners({
                readyToClose: () => {
                    if (onEnd) onEnd();
                },
                participantLeft: () => {
                    console.log("Участник покинул звонок");
                },
                videoConferenceJoined: () => {
                    console.log("Вы присоединились к звонку");
                },
                videoConferenceLeft: () => {
                    console.log("Вы покинули звонок");
                    if (onEnd) onEnd();
                },
            });
        };

        const script = loadJitsiScript();
        script.onload = () => {
            if (window.JitsiMeetExternalAPI) {
                initJitsi();
            }
        };

        return () => {
            if (jitsiApi.current) {
                jitsiApi.current.dispose();
            }
            script.remove();
        };
    }, [sessionId, studentName, onEnd]);

    const toggleAudio = () => {
        if (jitsiApi.current) {
            jitsiApi.current.executeCommand("toggleAudio");
        }
    };

    const toggleVideo = () => {
        if (jitsiApi.current) {
            jitsiApi.current.executeCommand("toggleVideo");
        }
    };

    const endCall = () => {
        if (jitsiApi.current) {
            jitsiApi.current.executeCommand("hangup");
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Сессия с ментором {mentorName}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    ref={jitsiContainer}
                    className="rounded-lg overflow-hidden"
                />

                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleAudio}
                        className="rounded-full h-12 w-12"
                    >
                        <Mic className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleVideo}
                        className="rounded-full h-12 w-12"
                    >
                        <Video className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={endCall}
                        className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
                    >
                        <Phone className="w-5 h-5 rotate-[135deg]" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
