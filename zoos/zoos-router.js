const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
};

const db = knex(knexConfig);

// endpoints here
router.get('/', async (req, res) => {
  // get the zoos from the database
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // get the zoo from the database
  try {
    const zoo = await db('zoos')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  '19': 'Another zoo with that name exists.'
};

router.post('/', async (req, res) => {
  // post zoo to the database
  try {
    const [id] = await db('zoos').insert(req.body);
    // const id = ids[0];
    const zoo = await db('zoos')
      .where({ id })
      .first();
    res.status(201).json(zoo);
  } catch (error) {
    const message = errors[error.errno] || 'An unknown error occured.';
    res.status(500).json({ message, error });
  }
});

router.put('/:id', async (req, res) => {
  // update zoos
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .update(req.body);

    if (count) {
      const zoo = await db('zoos')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Zoo not found.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
// delete zoo
router.delete('/:id', async (req, res) => {
  // update zoos
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .del();

    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Zoo not found.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
