FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --include=dev
COPY . .
RUN npx medusa build
EXPOSE 9000 7001
CMD ["/bin/sh", "-c", "npx medusa db:migrate && npx medusa start"]
