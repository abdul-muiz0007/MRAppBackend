const express = require('express');
const router = express.Router();
const { 
    getTerritory, 
    getTerritories, 
    createTerritory, 
    updateTerritory, 
    deleteTerritory 
} = require('../controllers/territory.controller.js');

router.get('/', getTerritories);
router.get('/:id', getTerritory);
router.post('/', createTerritory);
router.put('/:id', updateTerritory);
router.delete('/:id', deleteTerritory);

module.exports = router;