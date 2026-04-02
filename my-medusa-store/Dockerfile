FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# Build admin ở đây, trong image
RUN npx medusa build

EXPOSE 9000 7001

CMD ["npm", "run", "start"]
