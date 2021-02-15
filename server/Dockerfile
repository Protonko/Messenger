FROM node:15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY tsconfig.json .
RUN yarn install
COPY . /usr/src/app/server
EXPOSE 3000

CMD [ "yarn", "start" ]
