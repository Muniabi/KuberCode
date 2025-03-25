"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SignUpDialogProps {
    trigger?: React.ReactNode;
}

export default function SignUpDialog({ trigger }: SignUpDialogProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Add registration logic here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || <Button>Sign Up</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] p-0">
                <div className="grid sm:grid-cols-2">
                    {/* Left Gradient Section */}
                    <div className="hidden sm:block bg-gradient-to-b from-purple-300 to-purple-800 p-12 text-white rounded-l-lg">
                        <div className="flex flex-col items-center h-full">
                            <div className="mb-12">
                                <div className="w-8 h-8 bg-white rounded-full" />
                            </div>
                            <div className="text-center space-y-8">
                                <h1 className="text-4xl font-semibold">
                                    Get Started with Us
                                </h1>
                                <p className="text-white/90">
                                    Complete these easy steps to register your
                                    account.
                                </p>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((step) => (
                                        <div
                                            key={step}
                                            className="flex items-center gap-3 p-4 bg-white/10 rounded-lg"
                                        >
                                            <div
                                                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                                    step === 1
                                                        ? "bg-white text-purple-900"
                                                        : "bg-white/20"
                                                }`}
                                            >
                                                {step}
                                            </div>
                                            <span className="text-base">
                                                {step === 1 &&
                                                    "Sign up your account"}
                                                {step === 2 &&
                                                    "Set up your workspace"}
                                                {step === 3 &&
                                                    "Set up your profile"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">
                                Sign Up Account
                            </h2>
                            <p className="text-muted-foreground">
                                Enter your personal data to create your account.
                            </p>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <Button variant="outline" className="w-full gap-2">
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 8.12l-2.78 1.15c-.3-.64-.97-1.09-1.76-1.09-.83 0-1.51.55-1.75 1.3l-2.78-1.15c.51-1.23 1.73-2.09 3.15-2.09 1.41 0 2.63.85 3.14 2.08z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                                <Github className="w-5 h-5" />
                                Github
                            </Button>
                        </div>

                        <div className="relative my-8">
                            <Separator className="absolute inset-0" />
                            <div className="relative flex justify-center">
                                <span className="bg-background px-4 text-sm text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        First Name
                                    </label>
                                    <Input
                                        placeholder="eg. John"
                                        className="h-12 bg-muted/50"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Last Name
                                    </label>
                                    <Input
                                        placeholder="eg. Francisco"
                                        className="h-12 bg-muted/50"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="eg.johntrans@gmail.com"
                                    className="h-12 bg-muted/50"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-12 bg-muted/50"
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Must be at least 8 characters.
                                </p>
                            </div>

                            <Button
                                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90"
                                type="submit"
                                disabled={isLoading}
                            >
                                Sign Up
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-foreground hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
