const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all by tag
router.get('/', (req, res) => {
    Tag.findAll({
        include: [
          {
            model: Product,
            through: ProductTag
          }]
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      });
// find one by tag
router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
          id: req.params.id
        },
      include: [
        {
          model: Product,
          through: ProductTag
        }]
      })
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No products found with this id' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
// create by tag
router.post('/', (req, res) => {
    Tag.create(req.body)
    .then(dbTagData => res.json(dbTagData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });
// update by tag
router.put('/:id', (req, res) => {
    Tag.update(req.body, 
        {
          where: {
            id: req.params.id
          }
      })
      .then(dbTagData => {
        if (!dbTagData[0]) {
          res.status(404).json({ message: 'No products found with this id' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
// delete by tag
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No products found with this id' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

module.exports = router;
