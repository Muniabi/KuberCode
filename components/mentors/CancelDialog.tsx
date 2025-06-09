import { AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CancelDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    sessionDate: Date;
}

export function CancelDialog({
    isOpen,
    onClose,
    onConfirm,
    sessionDate,
}: CancelDialogProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white via-red-50/5 to-white dark:from-zinc-900 dark:via-red-950/5 dark:to-zinc-900">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-red-100/50 dark:bg-red-900/20">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-red-600 dark:text-red-400">
                            Отмена сессии
                        </DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        Вы уверены, что хотите отменить сессию? Это действие
                        нельзя будет отменить.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-lg border border-red-100 dark:border-red-900/30 p-4 bg-red-50/50 dark:bg-red-900/10">
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Обратите внимание, что отмена сессии менее чем за 24
                            часа до её начала может повлечь штрафные санкции
                            согласно правилам платформы.
                        </p>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
                    >
                        Вернуться
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                    >
                        Отменить сессию
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
