const express = require('express');
const router = express.Router();
const { getPOV, getPOVs, getPOVsByTerritory, createPOV, updatePOV, updateTaggedTerritory, deletePOV } = require('../controllers/pov.controller.js')

router.get('/', getPOVs);
// router.get('/:id', getPOV);
router.post('/', createPOV);
router.put('/:id', updatePOV);
router.get('/updateTaggedTerritory', updateTaggedTerritory);
router.get('/getPOVsByTerritory', getPOVsByTerritory);
router.delete('/:id', deletePOV);

module.exports = router;