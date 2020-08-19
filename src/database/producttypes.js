const router = require('express').Router();
const {deleteProducttype, updateProducttype, createProducttype, getProducttypes} = require('../database/Producttypes');

router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getProducttypes());
});



router.post('/', async (apiRequest, apiResponse) => {
  const newProducttype = apiRequest.body;
  await createLogo(newProducttype);
  apiResponse.send({
    message: 'New Producttype created.',
    allLogos: await getProducttypes(),
    thanks: true
  });
});
// endpoint to delete a Logo
router.delete('/:ProducttypeId', async (apiRequest, apiResponse) => {
  await deleteProducttype(apiRequest.params.productId);
  apiResponse.send({ message: 'Logo deleted.'});
});

// endpoint to update a Logo
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedProducttype = apiRequest.body;
  console.log({ updatedProducttype})
  await updateProducttype(apiRequest.params.id, updatedLogo);
  apiResponse.send({ message: 'Producttype updated.' });
});


module.exports = router;