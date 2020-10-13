FROM node:10 as build
ARG NODE_ENV=production

WORKDIR /home/node/app
COPY ./server/ ./
RUN npm install

FROM node:10-alpine as deploy
USER node
ENV MONGODB_URI "localhost/url-shortener"
ENV PORT 3000
WORKDIR /home/node/app
COPY --from=build --chown=node /home/node/app .

CMD [ "npm", "start" ]