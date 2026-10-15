const Product = require('../models/Product');

async function getSummary(req, res) {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgPrice: 1 } },
      {
        $project: {
          _id: 0,
          category: '$_id',
          avgPrice: { $round: ['$avgPrice', 2] },
          minPrice: 1,
          maxPrice: 1,
          count: 1,
        },
      },
    ]);

    const totalProducts = categories.reduce((sum, c) => sum + c.count, 0);

    res.status(200).json({
      metric: 'avgPrice',
      currency: 'BYN',
      totalProducts,
      categories,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка расчёта аналитики', error: error.message });
  }
}

module.exports = { getSummary };
