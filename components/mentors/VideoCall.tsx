import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCallProps {
    sessionId: string;
    mentorName: string;
    studentName: string;
    onEnd?: () => void;
    onClose?: () => void;
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
    onClose,
}: VideoCallProps) {
    const jitsiContainer = useRef<HTMLDivElement>(null);
    const jitsiApi = useRef<any>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        // Загружаем Jitsi Meet API скрипт
        const loadJitsiScript = () => {
            const existingScript = document.querySelector(
                'script[src="https://meet.jit.si/external_api.js"]'
            );
            if (existingScript) {
                setIsScriptLoaded(true);
                return null;
            }
            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            script.onload = () => setIsScriptLoaded(true);
            document.body.appendChild(script);
            return script;
        };

        const script = loadJitsiScript();

        return () => {
            if (script) {
                script.remove();
                setIsScriptLoaded(false);
            }
        };
    }, []);

    useEffect(() => {
        // Инициализируем Jitsi Meet только после загрузки скрипта
        const initJitsi = () => {
            if (
                !jitsiContainer.current ||
                jitsiApi.current ||
                !window.JitsiMeetExternalAPI ||
                !isScriptLoaded
            ) {
                return;
            }

            try {
                const domain = "meet.jit.si";
                const options = {
                    roomName: `kubercode-session-${sessionId}`,
                    width: "100%",
                    height: "100vh",
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

                jitsiApi.current = new window.JitsiMeetExternalAPI(
                    domain,
                    options
                );

                // Обработчики событий
                jitsiApi.current.addEventListeners({
                    readyToClose: () => {
                        if (onEnd) onEnd();
                    },
                    videoConferenceLeft: () => {
                        if (onEnd) onEnd();
                        if (onClose) onClose();
                    },
                    hangup: () => {
                        if (onEnd) onEnd();
                        if (onClose) onClose();
                    },
                });
            } catch (error) {
                console.error("Error initializing Jitsi:", error);
            }
        };

        // Пытаемся инициализировать после загрузки скрипта
        if (isScriptLoaded) {
            initJitsi();
        }

        return () => {
            if (jitsiApi.current) {
                jitsiApi.current.dispose();
                jitsiApi.current = null;
            }
        };
    }, [sessionId, studentName, onEnd, onClose, isScriptLoaded]);

    const openInNewWindow = () => {
        const width = 1200;
        const height = 1000;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            `https://meet.jit.si/kubercode-session-${sessionId}`,
            "KuberCode Video Call",
            `width=${width},height=${height},top=${top},left=${left}`
        );
        if (onEnd) onEnd();
        if (onClose) onClose();
    };

    const handleClose = () => {
        if (jitsiApi.current) {
            jitsiApi.current.executeCommand("hangup");
        }
        if (onClose) onClose();
    };

    const containerStyles = {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
    };

    return (
        <Card className="w-full rounded-none" style={containerStyles}>
            <CardHeader className="flex px-6 py-1 flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Video className="w-4 h-4" />
                    Сессия с ментором {mentorName}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={openInNewWindow}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={handleClose}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
                <div
                    ref={jitsiContainer}
                    className="rounded-lg overflow-hidden h-full"
                />
            </CardContent>
        </Card>
    );
}
