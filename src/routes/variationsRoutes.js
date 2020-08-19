
const router = require('express').Router();
const {deleteVariation, updateVariation, createVariation, getVariations} = require('../database/variations');

router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getVariations());
});



router.post('/', async (apiRequest, apiResponse) => {
  const newVariation = apiRequest.body;
  await createVariation(newVariation);
  apiResponse.send({
    message: 'New Variation created.',
    allLogos: await getVariations(),
    thanks: true
  });
});
// endpoint to delete a Logo
router.delete('/:variationId', async (apiRequest, apiResponse) => {
  await deleteVariation(apiRequest.params.variationId);
  apiResponse.send({ message: 'Variation deleted.' });
});

// endpoint to update a Logo
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedVariation = apiRequest.body;
  console.log({updatedVariation})
  await updateVariation(apiRequest.params.id, updatedVariation);
  apiResponse.send({ message: 'Variation updated.'});
});


module.exports = router;