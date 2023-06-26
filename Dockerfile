# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /target_shooting
COPY . .
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]