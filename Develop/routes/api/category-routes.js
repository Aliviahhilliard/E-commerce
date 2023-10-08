const router = require('express').Router();
const { Category, Product } = require('../../models');

/**
 * Fetch all categories along with associated products.
 * 
 * @returns {Array<Object>} Categories and their associated products
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Fetch one category by its `id` value along with associated products.
 * 
 * @param {Number} id - Category ID
 * @returns {Object} Category and its associated products
 */
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Create a new category.
 * 
 * @param {Object} req.body - New category data
 * @returns {Object} New category data
 */
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Update a category by its `id` value.
 * 
 * @param {Number} id - Category ID
 * @param {Object} req.body - Data to update category
 * @returns {Object} Updated category data
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Delete a category by its `id` value.
 * 
 * @param {Number} id - Category ID
 * @returns {Object} Deletion confirmation
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
