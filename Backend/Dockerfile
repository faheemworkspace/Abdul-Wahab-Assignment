FROM node:18-alpine
WORKDIR /app/
COPY . .
RUN ls -al
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3000