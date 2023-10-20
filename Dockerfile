FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production --force
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
