import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    Phone,
    Maximize2,
    Minimize2,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    const [isFloating, setIsFloating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const dragStart = useRef({ x: 0, y: 0 });

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
                height: isFloating ? "300px" : "600px",
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
    }, [sessionId, studentName, onEnd, isFloating]);

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

    const openInNewWindow = () => {
        const width = 1200;
        const height = 800;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            `https://meet.jit.si/kubercode-session-${sessionId}`,
            "KuberCode Video Call",
            `width=${width},height=${height},top=${top},left=${left}`
        );
        if (onEnd) onEnd();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isFloating) {
            setIsDragging(true);
            dragStart.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isFloating) {
            document.addEventListener("mousemove", handleMouseMove as any);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener(
                    "mousemove",
                    handleMouseMove as any
                );
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, isFloating]);

    const containerStyles = isFloating
        ? {
              position: "fixed",
              top: position.y,
              left: position.x,
              zIndex: 50,
              width: "400px",
              resize: "both",
              overflow: "auto",
          }
        : {};

    return (
        <Card
            className={cn(
                "w-full transition-all duration-300",
                isFloating ? "shadow-2xl" : "max-w-4xl mx-auto"
            )}
            style={containerStyles as any}
            onMouseDown={handleMouseDown}
        >
            <CardHeader className="flex flex-row items-center justify-between cursor-move">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Video className="w-4 h-4" />
                    Сессия с ментором {mentorName}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => setIsFloating(!isFloating)}
                    >
                        {isFloating ? (
                            <Maximize2 className="w-4 h-4" />
                        ) : (
                            <Minimize2 className="w-4 h-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={openInNewWindow}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </div>
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
