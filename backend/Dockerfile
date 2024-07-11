
FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "node", "app.js" ]
