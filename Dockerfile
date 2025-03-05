# Використовуємо офіційний образ Node.js
FROM node:16-alpine

# Встановлюємо робочу директорію
WORKDIR /usr/src/app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту до контейнера
COPY . .

# Встановлюємо залежність для компіляції TypeScript
RUN npm install -g typescript ts-node

# Компілюємо TypeScript код
RUN tsc

# Відкриваємо порт для Fastify
EXPOSE 3000

# Запускаємо сервер Fastify
CMD ["npm", "run", "docker:dev"]
