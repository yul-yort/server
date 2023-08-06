FROM node:16.13.0

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

ENV PORT 9000

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]