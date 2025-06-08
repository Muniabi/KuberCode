import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialLink {
    type: "github" | "linkedin" | "twitter" | "website";
    url: string;
}

interface SocialLinksProps {
    links: SocialLink[];
    className?: string;
}

const ICON_MAP = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
};

const LABEL_MAP = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Личный сайт",
};

export default function SocialLinks({
    links,
    className = "",
}: SocialLinksProps) {
    if (!links?.length) return null;

    return (
        <div className={`flex gap-2 ${className}`}>
            <TooltipProvider>
                {links.map((link) => {
                    const Icon = ICON_MAP[link.type];
                    return (
                        <Tooltip key={link.type}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:text-[--purple]"
                                    onClick={() =>
                                        window.open(link.url, "_blank")
                                    }
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{LABEL_MAP[link.type]}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
}
