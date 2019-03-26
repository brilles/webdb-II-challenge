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

router.get('/', async (req, res) => {
  try {
    const bears = await db('bears');
    res.status(200).json(bears);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
