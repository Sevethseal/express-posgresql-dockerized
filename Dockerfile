FROM node:16

WORKDIR /app

RUN npm install nodemon

COPY . .

RUN npm install

CMD ["npm","run", "start:dev"]
