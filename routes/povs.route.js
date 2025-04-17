const express = require('express');
const router = express.Router();
const { getPOV, getPOVs, getPOVsByTerritory, createPOV, updatePOV, updateTaggedTerritory, deletePOV, getCount } = require('../controllers/pov.controller.js')

router.post('/', getPOVs);
// router.get('/:id', getPOV);
router.post('/createPOV', createPOV);
router.put('/:id', updatePOV);
router.post('/updateTaggedTerritory', updateTaggedTerritory);
router.post('/getPOVsByTerritory', getPOVsByTerritory);
router.delete('/:id', deletePOV);
router.get('/count', getCount); 

module.exports = router;