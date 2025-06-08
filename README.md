# Репозиторий для выполнения тестового задания

Live версия: https://rates-converter-0b1o.onrender.com

# Запуск через Docker

Фронт будет запущен на `http://localhost:4173`, а прокси API — на `http://localhost:3000`.

По умолчанию в `docker-compose.yml` используется переменная окружения `VITE_API_BASE_URL`. При необходимости ее можно переопределить при сборке:

```bash
docker-compose build --build-arg VITE_API_BASE_URL=http://localhost:3000
```

Полный набор команд для сборки и запуска контейнеров:

```bash
docker-compose build --build-arg VITE_API_BASE_URL=http://localhost:3000
docker-compose up
```

# Тестирование

## 1. Unit/Component-тесты (Jest + React Testing Library)

### Установка
```bash
pnpm install
pnpm add -D jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```
### Запуск

```bash
pnpm test
```

## 2. E2E-тесты (Playwright)

```bash
pnpm test
```
### Конфигурация

- jest.config.ts конфиг для jest тестов
- playwright.config.ts настроен на запуск тестов из папки tests

### Запуск

- Запустить `jest` тесты можно из корневой папки через команду 

```bash
cd front && pnpm install && pnpm exec jest --config jest.config.ts
```

- Запустить `playwright` тесты можно из корневой папки через команду. 
`Важно:` перед запуском `playwright` тестов необходимо запустить сборку через `pnpm dev`

```bash
pnpm test:e2e
```
