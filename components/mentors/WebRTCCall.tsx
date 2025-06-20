"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    Settings,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WebRTCCall Component
 *
 * ДЕМО РЕЖИМ: В текущей реализации используется демо-режим для тестирования интерфейса.
 * В продакшене нужно заменить на реальную WebRTC логику:
 *
 * 1. Создать RTCPeerConnection
 * 2. Добавить сигнальный сервер (Socket.io, WebSocket)
 * 3. Обмениваться SDP offer/answer между участниками
 * 4. Обмениваться ICE candidates
 * 5. Использовать TURN серверы для обхода NAT
 *
 * Альтернативы для продакшена:
 * - Agora SDK (рекомендуется)
 * - Twilio Video
 * - Daily.co
 * - Socket.io + WebRTC
 */

interface WebRTCCallProps {
    sessionId: string;
    mentorName: string;
    studentName: string;
    onEnd?: () => void;
    onClose?: () => void;
}

export default function WebRTCCall({
    sessionId,
    mentorName,
    studentName,
    onEnd,
    onClose,
}: WebRTCCallProps) {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);

    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [hasLocalMedia, setHasLocalMedia] = useState(false);

    // STUN серверы для WebRTC
    const configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
        ],
    };

    useEffect(() => {
        initializeCall();
        return () => {
            cleanup();
        };
    }, []);

    const initializeCall = async () => {
        setIsConnecting(true);
        setError(null);

        try {
            // Пытаемся получить доступ к камере и микрофону
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            localStreamRef.current = stream;

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            setHasLocalMedia(true);
        } catch (err) {
            // Если не получилось, просто выводим ошибку в консоль
            // и продолжаем в демо-режиме без видео пользователя.
            console.error(
                "Не удалось получить доступ к медиа-устройствам, переход в демо-режим:",
                err
            );
            setHasLocalMedia(false);
        }

        // Для демо-режима симулируем подключение
        setTimeout(() => {
            setIsConnected(true);
            setIsConnecting(false);
            setIsDemoMode(true);
        }, 2000);
    };

    const toggleVideo = () => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoEnabled(videoTrack.enabled);
            }
        }
    };

    const toggleAudio = () => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const handleEndCall = () => {
        cleanup();
        onEnd?.();
        onClose?.();
    };

    const cleanup = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => track.stop());
            localStreamRef.current = null;
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
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
        <Card
            className="w-full h-screen rounded-none bg-zinc-900"
            style={containerStyles}
        >
            <CardHeader className="flex px-6 py-3 flex-row items-center justify-between h-16 bg-zinc-900 border-b border-zinc-800">
                <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Video className="w-4 h-4" />
                    Сессия с ментором {mentorName}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-md">
                        <div
                            className={cn(
                                "w-2 h-2 rounded-full",
                                isConnected
                                    ? "bg-green-500"
                                    : isConnecting
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            )}
                        />
                        <span className="text-xs text-zinc-300">
                            {isDemoMode
                                ? "Демо режим"
                                : isConnected
                                ? "Подключено"
                                : isConnecting
                                ? "Подключение..."
                                : "Отключено"}
                        </span>
                    </div>
                    {isDemoMode && (
                        <div className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md">
                            <span className="text-xs text-blue-300">Демо</span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-white hover:bg-zinc-800"
                        onClick={handleEndCall}
                    >
                        <PhoneOff className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0 h-[calc(100vh-4rem)] relative">
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-10">
                        <div className="text-center text-white max-w-md mx-4">
                            <div className="bg-red-800/50 rounded-lg p-6 border border-red-700">
                                <p className="text-lg font-medium mb-3">
                                    Ошибка подключения
                                </p>
                                <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                                    {error}
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={initializeCall}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Попробовать снова
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleEndCall}
                                        className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                                    >
                                        Закрыть
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isConnecting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-10">
                        <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                            <p>Подключение к звонку...</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full p-4">
                    {/* Локальное видео */}
                    <div className="relative bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
                        {hasLocalMedia ? (
                            <video
                                ref={localVideoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center text-zinc-400">
                                <VideoOff className="w-16 h-16 mx-auto mb-4" />
                                <p>Ваша камера не найдена</p>
                            </div>
                        )}

                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md">
                            <span className="text-white text-sm">
                                Вы ({studentName})
                            </span>
                        </div>
                        {hasLocalMedia && !isVideoEnabled && (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                <VideoOff className="w-16 h-16 text-zinc-400" />
                            </div>
                        )}
                    </div>

                    {/* Удаленное видео */}
                    <div className="relative bg-zinc-800 rounded-lg overflow-hidden">
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md">
                            <span className="text-white text-sm">
                                {mentorName}
                            </span>
                        </div>
                        {!isConnected && !isDemoMode && (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                <div className="text-center text-zinc-400">
                                    <Users className="w-16 h-16 mx-auto mb-4" />
                                    <p>Ожидание подключения ментора...</p>
                                </div>
                            </div>
                        )}
                        {isDemoMode && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                                <div className="text-center text-white">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-4xl font-bold">
                                            {mentorName.charAt(0)}
                                        </span>
                                    </div>
                                    <p className="text-lg font-medium mb-2">
                                        {mentorName}
                                    </p>
                                    <p className="text-sm text-zinc-300">
                                        Демо режим - ментор подключен
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Панель управления */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-zinc-800/90 backdrop-blur-sm px-6 py-3 rounded-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "w-12 h-12 rounded-full",
                            isVideoEnabled
                                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                                : "bg-red-600 text-white hover:bg-red-700"
                        )}
                        onClick={toggleVideo}
                    >
                        {isVideoEnabled ? (
                            <Video className="w-5 h-5" />
                        ) : (
                            <VideoOff className="w-5 h-5" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "w-12 h-12 rounded-full",
                            isAudioEnabled
                                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                                : "bg-red-600 text-white hover:bg-red-700"
                        )}
                        onClick={toggleAudio}
                    >
                        {isAudioEnabled ? (
                            <Mic className="w-5 h-5" />
                        ) : (
                            <MicOff className="w-5 h-5" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-12 h-12 rounded-full bg-red-600 text-white hover:bg-red-700"
                        onClick={handleEndCall}
                    >
                        <PhoneOff className="w-5 h-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
