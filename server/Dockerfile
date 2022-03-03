FROM node:14.19-alpine3.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 49170

# You can change this
CMD [ "npm", "run", "dev" ]