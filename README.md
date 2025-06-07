# Репозиторий для выполнения тестового задания


### Перед установкой
- Пакетный менеджер, который используется - [pnpm](https://pnpm.io/)

### Шаги установки
- Установить зависимости 
```bash 
pnpm install
```

# Тетсирование

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
### Установка

```bash
pnpm install
pnpm add -D @playwright/test
pnpm exec playwright install
```
### Конфигурация

- playwright.config.ts настроен на запуск тестов из папки tests

### Запуск

```bash
pnpm test:e2e
```


### Запуск через Docker

Фронт будет запущен на `http://localhost:4173`, а прокси API — на `http://localhost:3000`.

По умолчанию в `docker-compose.yml` используется переменная окружения `VITE_API_BASE_URL`. При необходимости ее можно переопределить при сборке:

```bash
docker-compose build --build-arg VITE_API_BASE_URL=http://localhost:3000
```

Полный набор команд для сборки и запуска контейнеров:

```bash
docker-compose build
docker-compose up
```

