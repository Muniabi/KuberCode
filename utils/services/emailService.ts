export const sendVerificationEmail = async (
    email: string,
    isMentor: string
) => {
    try {
        // Генерируем новый код
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Сохраняем новый код
        localStorage.setItem("verificationCode", code);

        const response = await fetch("/api/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                code,
                isMentor: isMentor === "true",
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Ошибка при отправке email");
        }

        console.log("Preview URL:", data.previewUrl);
        return { verificationCode: code };
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        throw error;
    }
};
