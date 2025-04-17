# Документация проекта KuberCode

## Содержание

1. [Введение](#введение)
2. [Архитектура проекта](#архитектура-проекта)
3. [Технологический стек](#технологический-стек)
4. [Структура проекта](#структура-проекта)
5. [Настройка окружения](#настройка-окружения)

## Введение

KuberCode - это современная платформа онлайн-обучения, разработанная как дипломный проект. Платформа предоставляет возможность создания, управления и прохождения онлайн-курсов, а также взаимодействия между студентами и преподавателями.

### Основные возможности:

-   Система авторизации и аутентификации
-   Создание и управление курсами
-   Интерактивное обучение
-   Система прогресса и достижений
-   Адаптивный интерфейс для всех устройств

## Архитектура проекта

Проект построен на основе современной архитектуры с использованием следующих ключевых принципов:

### Frontend

-   **Next.js** - фреймворк для серверного рендеринга
-   **React** - библиотека для построения пользовательского интерфейса
-   **TypeScript** - для статической типизации
-   **Tailwind CSS** - для стилизации компонентов
-   **ShadCN** - библиотека UI-компонентов

### Backend

-   **gRPC** - для высокопроизводительного взаимодействия
-   **GraphQL** - для гибкого API
-   **NextAuth** - для аутентификации и авторизации

### Хранение данных

-   Сессионное хранение через NextAuth
-   Кэширование на клиенте
-   Интеграция с внешними API

## Технологический стек

### Основные технологии:

-   **Next.js 14** - современный фреймворк для React
-   **TypeScript 5** - строгая типизация
-   **Tailwind CSS 3** - утилитарный CSS фреймворк
-   **ShadCN UI** - компонентная библиотека
-   **NextAuth.js** - система аутентификации

### Дополнительные инструменты:

-   **Docker** - для контейнеризации
-   **ESLint** - для линтинга кода
-   **Prettier** - для форматирования кода
-   **Jest** - для тестирования

## Структура проекта

```
kuber-code/
├── app/                    # Основные страницы приложения
│   ├── (auth)/            # Страницы авторизации
│   ├── account/           # Личный кабинет
│   ├── api/               # API роуты
│   ├── components/        # Компоненты страниц
│   ├── courses/           # Страницы курсов
│   └── ...
├── components/            # Общие компоненты
│   ├── ui/               # UI компоненты
│   ├── shared/           # Общие компоненты
│   └── ...
├── hooks/                # Пользовательские хуки
├── lib/                  # Утилиты и библиотеки
├── store/                # Управление состоянием
├── types/                # TypeScript типы
└── utils/                # Вспомогательные функции
```

## Настройка окружения

### Предварительные требования:

-   Node.js (версия 18 или выше)
-   npm или yarn
-   Docker (опционально)

### Установка зависимостей:

```bash
npm install
```

### Настройка переменных окружения:

Создайте файл `.env.local` в корне проекта со следующими переменными:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth провайдеры
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
VK_ID=your-vk-id
VK_SECRET=your-vk-secret
```

### Запуск в режиме разработки:

```bash
npm run dev
```

### Сборка для продакшена:

```bash
npm run build
npm start
```

### Запуск через Docker:

```bash
docker build -t kuber-code-client .
docker run -d -p 3000:3000 --name kuber-code-client kuber-code-client
```

## Система авторизации и аутентификации

### Обзор

Система авторизации построена на NextAuth.js и поддерживает несколько методов входа:

-   Email/Password
-   GitHub OAuth
-   Google OAuth
-   VK OAuth

### Настройка провайдеров

#### Email/Password

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Логика проверки учетных данных
            },
        }),
    ],
});
```

#### Социальные сети

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import VKProvider from "next-auth/providers/vk";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        VKProvider({
            clientId: process.env.VK_ID,
            clientSecret: process.env.VK_SECRET,
        }),
    ],
});
```

### Использование в компонентах

```typescript
import { useSession } from "next-auth/react";

export default function ProtectedComponent() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return <div>Добро пожаловать, {session.user.name}!</div>;
}
```

## Работа с курсами

### Структура курса

```typescript
interface Course {
    id: string;
    title: string;
    description: string;
    author: User;
    lessons: Lesson[];
    progress: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: number;
    order: number;
    completed: boolean;
}
```

### Основные функции

#### Создание курса

```typescript
const createCourse = async (courseData: CourseCreateData) => {
    const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
    });
    return response.json();
};
```

#### Получение списка курсов

```typescript
const getCourses = async () => {
    const response = await fetch("/api/courses");
    return response.json();
};
```

#### Отслеживание прогресса

```typescript
const updateProgress = async (courseId: string, lessonId: string) => {
    const response = await fetch(`/api/courses/${courseId}/progress`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lessonId }),
    });
    return response.json();
};
```

### Хуки для работы с курсами

#### useCourseProgress

```typescript
const { progress, updateProgress } = useCourseProgress(courseId);
```

#### useCoursePurchase

```typescript
const { purchaseCourse, isPurchased } = useCoursePurchase(courseId);
```

#### useReviews

```typescript
const { reviews, addReview } = useReviews(courseId);
```

## Управление состоянием

### Store

Проект использует глобальное хранилище для управления состоянием курсов:

```typescript
// store/courses.ts
interface CoursesState {
    courses: Course[];
    currentCourse: Course | null;
    loading: boolean;
    error: string | null;
}

const initialState: CoursesState = {
    courses: [],
    currentCourse: null,
    loading: false,
    error: null,
};
```

### Действия

```typescript
const fetchCourses = async () => {
    setLoading(true);
    try {
        const courses = await getCourses();
        setCourses(courses);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
```

## Компоненты UI и стилизация

### ShadCN UI

Проект использует ShadCN UI как основную библиотеку компонентов. Все компоненты настраиваются через Tailwind CSS.

#### Установка компонентов

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

### Основные компоненты

#### Навигация

```typescript
// components/nav-main.tsx
export function NavMain() {
    return (
        <nav className="flex items-center space-x-4">
            <Link href="/courses">Курсы</Link>
            <Link href="/create">Создать курс</Link>
            <Link href="/account">Аккаунт</Link>
        </nav>
    );
}
```

#### Карточка курса

```typescript
// components/cards/course-card.tsx
export function CourseCard({ course }: { course: Course }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={course.progress} />
            </CardContent>
            <CardFooter>
                <Button>Начать обучение</Button>
            </CardFooter>
        </Card>
    );
}
```

### Стилизация

#### Глобальные стили

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --foreground-rgb: 0, 0, 0;
    --background-rgb: 255, 255, 255;
}

body {
    color: rgb(var(--foreground-rgb));
    background: rgb(var(--background-rgb));
}
```

#### Темная тема

```typescript
// components/theme-provider.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}
```

### Адаптивный дизайн

#### Хуки для определения устройства

```typescript
// hooks/use-mobile.tsx
export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
}
```

#### Медиа-запросы в Tailwind

```typescript
<div
    className="
  w-full
  md:w-1/2
  lg:w-1/3
  xl:w-1/4
"
>
    {/* Содержимое */}
</div>
```

## API и интеграции

### REST API

#### Структура API

```
/api
├── auth/          # Аутентификация
├── courses/       # Управление курсами
├── users/         # Управление пользователями
└── progress/      # Отслеживание прогресса
```

#### Примеры эндпоинтов

##### Создание курса

```typescript
// app/api/courses/route.ts
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    // Логика создания курса
}
```

##### Получение курса

```typescript
// app/api/courses/[id]/route.ts
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const course = await getCourse(params.id);
    return Response.json(course);
}
```

### Интеграция с внешними сервисами

#### gRPC

```typescript
// utils/services/grpc.ts
const client = new CourseServiceClient(
    process.env.GRPC_SERVER_URL,
    credentials.createInsecure()
);

export async function getCourseDetails(id: string) {
    const request = new GetCourseRequest();
    request.setId(id);
    return client.getCourse(request);
}
```

#### GraphQL

```typescript
// utils/services/graphql.ts
const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export async function fetchUserCourses(userId: string) {
    const { data } = await client.query({
        query: GET_USER_COURSES,
        variables: { userId },
    });
    return data.courses;
}
```

## Развертывание и мониторинг

### Подготовка к развертыванию

#### Оптимизация сборки

```bash
# Анализ размера бандла
npm run analyze

# Оптимизация изображений
npm run optimize-images
```

#### Настройка переменных окружения

```env
# .env.production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
DATABASE_URL=your-production-db-url
```

### Развертывание на Vercel

1. Установите Vercel CLI:

```bash
npm i -g vercel
```

2. Войдите в Vercel:

```bash
vercel login
```

3. Разверните проект:

```bash
vercel
```

### Docker развертывание

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: "3"
services:
    web:
        build: .
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
            - NEXTAUTH_URL=http://localhost:3000
        volumes:
            - .:/app
            - /app/node_modules
```

### Мониторинг и логирование

#### Настройка логирования

```typescript
// utils/logger.ts
import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

export default logger;
```

#### Мониторинг производительности

```typescript
// utils/monitoring.ts
import { init } from "@sentry/nextjs";

init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});
```

### Безопасность

#### Защита API

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: ["/api/:path*"],
};
```

#### CORS настройки

```typescript
// next.config.js
module.exports = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: process.env.ALLOWED_ORIGIN,
                    },
                ],
            },
        ];
    },
};
```

### Оптимизация производительности

#### Кэширование

```typescript
// utils/cache.ts
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
    max: 500,
    ttl: 1000 * 60 * 5, // 5 минут
});

export const getCachedData = async (
    key: string,
    fetchFn: () => Promise<any>
) => {
    const cached = cache.get(key);
    if (cached) return cached;

    const data = await fetchFn();
    cache.set(key, data);
    return data;
};
```

#### Оптимизация изображений

```typescript
// next.config.js
module.exports = {
    images: {
        domains: ["your-cdn-domain.com"],
        formats: ["image/avif", "image/webp"],
    },
};
```

## Заключение

### Основные преимущества проекта

-   Современный стек технологий
-   Масштабируемая архитектура
-   Высокая производительность
-   Безопасность и надежность
-   Удобство разработки и поддержки

### Планы по развитию

1. Добавление новых методов авторизации
2. Расширение функционала курсов
3. Улучшение системы аналитики
4. Оптимизация производительности
5. Добавление новых интеграций

### Рекомендации по поддержке

1. Регулярное обновление зависимостей
2. Мониторинг производительности
3. Тестирование безопасности
4. Оптимизация кода
5. Документирование изменений
