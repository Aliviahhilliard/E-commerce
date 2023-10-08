const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

/**
 * Fetch all tags with associated Product data.
 *
 * @returns {Array<Object>} Tags and their associations
 */
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Fetch one tag by its `id` with associated Product data.
 *
 * @param {Number} id - Tag ID
 * @returns {Object} Tag and its associations
 */
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Create a new tag.
 *
 * @param {Object} req.body - New tag data
 * @returns {Object} New tag data
 */
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Update a tag by its `id` value.
 *
 * @param {Number} id - Tag ID
 * @param {Object} req.body - Data to update tag
 * @returns {Object} Updated tag data
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Delete a tag by its `id` value.
 *
 * @param {Number} id - Tag ID
 * @returns {Object} Deletion confirmation
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
