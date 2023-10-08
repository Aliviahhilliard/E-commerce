const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

/**
 * Fetch all products with associated Category and Tag data.
 *
 * @returns {Array<Object>} Products and their associations
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, {
        model: Tag,
        through: ProductTag,
      }],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Fetch one product by its `id` with associated Category and Tag data.
 *
 * @param {Number} id - Product ID
 * @returns {Object} Product and its associations
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, {
        model: Tag,
        through: ProductTag,
      }],
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with that id' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Create a new product and associate it with tags.
 *
 * @param {Object} req.body - New product data and associated tag IDs
 * @returns {Object} New product data
 */
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Update a product by its `id` value and update associated tags.
 *
 * @param {Number} id - Product ID
 * @param {Object} req.body - Data to update product and associated tags
 * @returns {Object} Updated product data
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Delete a product by its `id` value.
 *
 * @param {Number} id - Product ID
 * @returns {Object} Deletion confirmation
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with that id' });
      return;
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
