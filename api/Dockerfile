FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8080

CMD ["sh", "-lc", "./entrypoint.sh"]
