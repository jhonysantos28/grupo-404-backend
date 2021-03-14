FROM node:15-alpine

WORKDIR /usr/app/

COPY package.json ./

EXPOSE 2000

COPY . .