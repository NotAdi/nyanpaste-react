FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY client/ ./client/

RUN cd client && npm install && npm run build

# ---

FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/client/dist ./client/dist
COPY --chown=node:node package*.json ./server/

RUN cd server && npm install --production

COPY --chown=node:node server/ ./server/

RUN cd server && ls -la

EXPOSE 5000/tcp

CMD ["node", "server/server.js"]
