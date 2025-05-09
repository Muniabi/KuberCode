export const sendVerificationEmail = async (
    email: string,
    isMentor: string
) => {
    try {
        // Генерируем 6-значный код подтверждения
        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const response = await fetch("/api/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                isMentor: isMentor === "true",
                code: verificationCode,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Ошибка при отправке email");
        }

        return data;
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        throw error;
    }
};
