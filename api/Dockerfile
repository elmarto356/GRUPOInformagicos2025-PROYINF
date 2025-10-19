FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache postgresql-client dos2unix

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN dos2unix /usr/local/bin/entrypoint.sh || true \
 && sed -i '1s/^\xEF\xBB\xBF//' /usr/local/bin/entrypoint.sh \
 && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080
CMD ["/usr/local/bin/entrypoint.sh"]
