import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function useCoursePurchase() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const purchaseCourse = async (courseId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/courses/${courseId}/purchase`, {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            const stripe = await stripePromise;
            if (!stripe) throw new Error("Failed to load Stripe");

            const { error } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (error) throw error;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to process purchase"
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        purchaseCourse,
        isLoading,
        error,
    };
}
