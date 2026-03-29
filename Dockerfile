FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 9000 7001

CMD ["npm", "run", "start"]
