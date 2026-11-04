FROM node:20-slim

WORKDIR /app

# Копіюємо package.json
COPY package.json ./

# Інсталюємо залежності через Yarn (він проігнорує баги npm)
RUN yarn install

# Копіюємо решту коду фронтенду
COPY . .

EXPOSE 3000

# Запускаємо через yarn
CMD ["yarn", "dev"]

