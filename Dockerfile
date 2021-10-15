FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN rm -f .npmrc

COPY . .

CMD ["npm", "start"]