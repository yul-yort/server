## Description

yul-yort-back-end project documentation.

# Running the app
- сперва запускаем приложение Docker на компьютере

## development
```bash
docker-compose up
```

## Stopping the docker
```bash
docker-compose down
```

Приложение запустится на порту:9000

Swagger будет доступен по адресу http://localhost:9000/swagger

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
