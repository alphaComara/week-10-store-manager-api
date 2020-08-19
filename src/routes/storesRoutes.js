const router = require('express').Router();
const {deleteStore, updateStore, createStore, getStores} = require('../database/stores');

router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getStores());
});

router.post('/', async (apiRequest, apiResponse) => {
  const newStore = apiRequest.body;
  await createStore(newStore);
  apiResponse.send({
    message: 'New store created.',
    allStores: await getStores(),
    thanks: true
  });
});

// endpoint to delete a product
router.delete('/:storeId', async (apiRequest, apiResponse) => {
  await deleteStore(apiRequest.params.storeId);
  apiResponse.send({ message: 'Store deleted.' });
});

// endpoint to update a product
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;
  console.log({ updatedStore})
  await updateStore(apiRequest.params.id, updatedStore);
  apiResponse.send({ message: 'Store updated.' });
});

module.exports = router;



