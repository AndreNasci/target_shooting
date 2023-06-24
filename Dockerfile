# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /target_shooting
COPY . .
RUN npm install express
CMD ["node", "server.js"]
EXPOSE 3000