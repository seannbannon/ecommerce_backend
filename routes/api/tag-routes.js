const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finds all tags and their associated product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  })
  .then((tags) => res.json(tags))
  .catch((err) => res.status(500).json(err))
});

// find a single tag by its id
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
  .then((tags) => {
    if (!req.params.id) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.json(tags)
  })
  .catch ((err) => res.status(500).json(err))
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tags) => res.status(200).json(tags))
  .catch ((err) => res.status(500).json(err))
});

// update a tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tags) => {
    if (!req.params.id) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.json(tags)
  })
  .catch ((err) => res.status(400).json(err))
});

// delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((tags) => {
    if (!req.params.id) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.json(tags)
  })
  .catch ((err) => res.status(400).json(err))
});

module.exports = router;