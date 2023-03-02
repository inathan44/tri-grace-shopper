const router = require('express').Router();
const chalk = require('chalk');
const { Product, Tag } = require('../../DB');

// GET all prods /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProds = await Product.findAll({ include: Tag });
    res.json(allProds);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING ALL PRODUCTS'));
    next(e);
  }
});

// GET single product route /api/products/:productId
router.get('/:productId', middlewarefunc, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Tag,
    });
    if (product === null) {
      return res.status(404).send('product not found!');
    }
    res.json(product);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING SINGLE PRODUCT'));
    next(e);
  }
});

// POST (admin only - token auth headers)
// send get request to '/api/auth/:token' passing in token in header

// UPDATE (admin only - token auth headers)

// DELETE (admin only - token auth headers)

module.exports = router;
