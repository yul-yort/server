FROM node:16

WORKDIR /opt/app

ADD package.json package.json

RUN npm install --legacy-peer-deps

ADD . .

# RUN npm run build 
# CMD ["node", "./dist/main.js"]

# RUN npm --prune --production

CMD ["npm", "start"]
