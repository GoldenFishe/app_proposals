FROM node:14.15.4
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]