import SignUpDialog from "./auth/SignUpForm";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav>
            {/* Другие элементы навигации */}
            <SignUpDialog
                trigger={<Button variant="default">Create Account</Button>}
            />
        </nav>
    );
}
