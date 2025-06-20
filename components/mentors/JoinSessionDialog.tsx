"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe, Video } from "lucide-react";
import Link from "next/link";

interface JoinSessionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    sessionId: string;
    communicationType: string;
    communicationLink?: string;
}

export function JoinSessionDialog({
    isOpen,
    onClose,
    sessionId,
    communicationType,
    communicationLink,
}: JoinSessionDialogProps) {
    const handleJoinOnPlatform = () => {
        window.open(`/call/${sessionId}`, "_blank");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Присоединиться к сессии</DialogTitle>
                    <DialogDescription>
                        Выберите способ подключения к встрече с ментором.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {communicationLink && (
                        <Button asChild variant="outline">
                            <Link
                                href={communicationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                Присоединиться через {communicationType}
                            </Link>
                        </Button>
                    )}
                    <Button onClick={handleJoinOnPlatform}>
                        <Video className="mr-2 h-4 w-4" />
                        Созвониться на платформе
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Отмена
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
