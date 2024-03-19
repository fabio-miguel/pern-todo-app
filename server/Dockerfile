FROM node:20-alpine3.18

RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src/ ./src

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD npm start

EXPOSE 5000