FROM node:15-alpine

WORKDIR /usr/app/

COPY package.json ./

RUN yarn install

EXPOSE 3000

COPY . .

CMD yarn start