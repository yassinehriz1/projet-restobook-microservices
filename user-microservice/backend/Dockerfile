FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY grpc-server.js ./

EXPOSE 50051
EXPOSE 5000

CMD ["node", "index.js"]
