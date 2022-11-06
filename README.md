## Description

yul-yort-back-end project documentation.

## Installation

```bash
npm install
```

# Docker
- сперва запускаем приложение Docker на компьютере
## Running the docker
```bash
docker-compose up
```

## Stopping the docker

```bash
docker-compose down
```

# Running the app

## development
```bash
npm run start
```

Приложение запустится на порту:9000

Swagger будет доступен по адресу http://localhost:9000/swagger

## watch mode
```bash
npm run start:dev
```

## production mode
```bash
npm run start:prod
```

# Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
# Documentation

## Documentation generate
```bash
npm run docgen
```
Документация будет доступна по адресу http://127.0.0.1:8080 или откройте файл [documentation/index.html](documentation/index.html) в браузере. 
