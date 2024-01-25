# Установите базовый образ
FROM node:latest

EXPOSE 3000

# Установите рабочую директорию в контейнере
WORKDIR /app

# Копируйте файлы package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы проекта
COPY . .

# Соберите приложение
RUN npm run build

# Запустите приложение
CMD [ "node", ".output/server/index.mjs" ]