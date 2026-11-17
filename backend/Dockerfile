FROM node:18-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY . .
RUN npx prisma generate
EXPOSE 8000
CMD ["npm", "run", "start:dev"]
