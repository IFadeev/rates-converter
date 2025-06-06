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
