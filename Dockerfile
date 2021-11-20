# syntax=docker/dockerfile:1
FROM node:16.9.1
WORKDIR /app
COPY . .
RUN npm install
CMD cd ./src/view
RUN npm install
CMD cd ../../
CMD npm run start:server
EXPOSE 8080