# Тестовое задание

## 🚀 Технологический стек
Framework: Next.js 14+ с App Router
Language: TypeScript для типобезопасности
Styling: CSS Modules для изолированных стилей
State Management: Redux Toolkit для управления состоянием
UI Components: Кастомная компонентная библиотека
Routing: Next.js Navigation
API: [fakestoreapi.com](https://fakestoreapi.com/), требует VPN

## 🎯 Ключевые возможности
🛒 Управление товарами
* Просмотр всего каталога товаров
* Детальные страницы продуктов
* Добавление новых товаров
* Добавление / удаление в избранное

🔍 Фильтрация
* Фильтр по категориям
* Переключение между всеми товарами и избранным

## 🏗️ Архитектура
src/
├── app/                    - Next.js App Router
│   ├── products/          - Страницы продуктов
│   └── page.tsx           - Главная страница
├── components/            - UI компоненты
│   ├── ui/               - Базовые компоненты
│   └── products/         - Product-specific компоненты
├── lib/                   - Утилиты и конфигурация
│   ├── store/            - Redux store и slices
│   └── api/              - API функции
└── types/                 - TypeScript определения

## 🔧 Установка и запуск
bash
### Клонирование репозитория
git clone [repository-url]
cd goodies-ecommerce

### Установка зависимостей
npm install

### Запуск в development mode
npm run dev

### Сборка для production
npm run build

### Запуск production версии
npm start

## 📝 Скрипты
npm run dev - Development сервер

npm run build - Production сборка

npm run start - Запуск production

npm run lint - Проверка кода
