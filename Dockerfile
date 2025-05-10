FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Билдим проект
RUN npm run build

# Второй этап — запуск контейнера
FROM node:20-alpine AS runner
WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Указываем переменные среды
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://kubercode-nginx:8080
ENV NEXTAUTH_SECRET=58aeddb0d583a
ENV NEXTAUTH_URL=https://147.45.68.254:3000

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start"]
