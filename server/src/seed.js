require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Набор иконок «Контур» · 640 штук', price: 29, category: 'Иконки', imageUrl: '/images/product-1.webp' },
  { name: 'Иконки «Линия» для интерфейсов · 320 штук', price: 19, category: 'Иконки', imageUrl: '/images/product-1.webp' },
  { name: 'Иконки «Финтех» · 180 штук', price: 24, category: 'Иконки', imageUrl: '/images/product-1.webp' },
  { name: 'Анимированные иконки Lottie · 90 штук', price: 39, category: 'Иконки', imageUrl: '/images/product-1.webp' },
  { name: 'Шрифт «Гротеск Норд» · 4 начертания', price: 59, category: 'Шрифты', imageUrl: '/images/product-2.webp' },
  { name: 'Шрифт «Моно Код» для разработчиков', price: 39, category: 'Шрифты', imageUrl: '/images/product-2.webp' },
  { name: 'Шрифт «Антиква Минск» · 6 начертаний', price: 79, category: 'Шрифты', imageUrl: '/images/product-2.webp' },
  { name: 'Акцидентный шрифт «Неон»', price: 45, category: 'Шрифты', imageUrl: '/images/product-2.webp' },
  { name: 'UI-кит «Пульт» для дашбордов', price: 89, category: 'UI-киты', imageUrl: '/images/product-3.webp' },
  { name: 'UI-кит «Касса» для интернет-магазина', price: 99, category: 'UI-киты', imageUrl: '/images/product-3.webp' },
  { name: 'UI-кит мобильного банка', price: 119, category: 'UI-киты', imageUrl: '/images/product-3.webp' },
  { name: 'Дизайн-система «Основа»', price: 149, category: 'UI-киты', imageUrl: '/images/product-3.webp' },
  { name: 'Мокапы смартфонов · 24 сцены', price: 35, category: 'Мокапы', imageUrl: '/images/product-4.webp' },
  { name: 'Мокапы ноутбуков · 12 сцен', price: 25, category: 'Мокапы', imageUrl: '/images/product-4.webp' },
  { name: 'Мокапы упаковки · 18 сцен', price: 42, category: 'Мокапы', imageUrl: '/images/product-4.webp' },
  { name: 'Иллюстрации «Городские истории» · 40 сцен', price: 55, category: 'Иллюстрации', imageUrl: '/images/product-1.webp' },
  { name: '3D-иллюстрации для лендингов · 60 штук', price: 69, category: 'Иллюстрации', imageUrl: '/images/product-3.webp' },
  { name: 'Пустые состояния для приложений · 24 сцены', price: 32, category: 'Иллюстрации', imageUrl: '/images/product-4.webp' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Добавлено товаров: ${products.length}`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
