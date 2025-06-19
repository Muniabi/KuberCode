import { motion } from "framer-motion";

interface LoadingOverlayProps {
    message: string;
    steps?: { text: string; icon: string }[];
    currentStep?: number;
}

export function LoadingOverlay({
    message,
    steps,
    currentStep = 0,
}: LoadingOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
            <div className="bg-card p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
                <div className="flex flex-col items-center space-y-6">
                    {/* Loading spinner */}
                    <div className="relative w-16 h-16">
                        <motion.div
                            className="absolute inset-0 border-4 border-primary rounded-full"
                            animate={{
                                rotate: 360,
                                borderRadius: ["50%", "40%", "50%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute inset-2 border-4 border-primary/50 rounded-full"
                            animate={{
                                rotate: -360,
                                borderRadius: ["40%", "50%", "40%"],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>

                    {/* Main message */}
                    <h3 className="text-xl font-semibold text-center">
                        {message}
                    </h3>

                    {/* Steps if provided */}
                    {steps && (
                        <div className="w-full space-y-3">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-center space-x-3 ${
                                        index <= currentStep
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <span className="text-xl">{step.icon}</span>
                                    <span>{step.text}</span>
                                    {index <= currentStep && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: index * 0.2 + 0.1,
                                            }}
                                            className="ml-auto text-green-500"
                                        >
                                            ✓
                                        </motion.span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
