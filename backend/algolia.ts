import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  '0EP2Y7UUUX',
  '80acdfb6fb1232262daeb271f2d94280'
);

const amazon_index = client.initIndex('amazon_testing');

export { amazon_index }