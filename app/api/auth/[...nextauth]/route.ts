import NextAuth from "next-auth";

import { authOptions } from "./authOptions"; // относительный путь!

// Создаем handler с помощью NextAuth
const handler = NextAuth(authOptions);

// Экспортируем функции GET и POST отдельно
export { handler as GET, handler as POST };

// Не экспортируем authOptions напрямую
