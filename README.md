# Репозиторий для выполнения тестового задания

Live версия: https://rates-converter-0b1o.onrender.com

# Запуск через Docker

- Фронт будет запущен на `http://localhost:4173`
- Прокси API — на `http://localhost:3000`

### Сборку можно запустить из корневой папки через команду `pnpm dev`

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

### Тесты можно запустить из корневой папки через команду `pnpm test` и `pnpm test:e2e`

## 1. Unit/Component-тесты (Jest + React Testing Library)


### Запуск
Тесты можно запустить из корневой папки через команду:
```bash
pnpm test
```

## 2. E2E-тесты (Playwright)
`Важно:` перед запуском `playwright` тестов необходимо запустить сборку через `pnpm dev`

Тесты можно запустить из корневой папки через команду:

```bash
pnpm test:e2e
```
### Конфигурация

- jest.config.ts конфиг для jest тестов
- playwright.config.ts настроен на запуск тестов из папки tests

