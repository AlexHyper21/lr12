# ЛР 12 — визуализация данных (Plotly.js)

Full-stack приложение «пиксельмаркет» (вариант 3) со страницей аналитики `/analytics`: линейный график средней цены товаров по категориям. Данные агрегируются на бэкенде через MongoDB `aggregate`.

## Новое API

`GET /api/analytics/summary`

```json
{
  "metric": "avgPrice",
  "currency": "BYN",
  "totalProducts": 18,
  "categories": [
    { "category": "Иконки", "avgPrice": 27.75, "minPrice": 19, "maxPrice": 39, "count": 4 },
    { "category": "Мокапы", "avgPrice": 34, "minPrice": 25, "maxPrice": 42, "count": 3 }
  ],
  "generatedAt": "2026-10-13T14:30:00.000Z"
}
```

## Запуск

1. MongoDB запущен, строка подключения — в `server/.env`.

2. Сервер:

```bash
cd server
npm install
npm run seed
npm run dev
```

API: http://localhost:5000

3. Клиент (в другом терминале):

```bash
cd client
npm install
npm run dev
```

Открыть http://localhost:5173/analytics (запросы `/api` проксируются на порт 5000).

Production-вариант: `npm run build` в `client`, затем `npm start` в `server` и http://localhost:5000/analytics.
