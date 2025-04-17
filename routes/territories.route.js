const express = require('express');
const router = express.Router();
const { 
    getTerritory, 
    getTerritories, 
    createTerritory, 
    updateTerritory, 
    deleteTerritory,
    getCount,
    updateTaggedUsers
} = require('../controllers/territory.controller.js');

router.post('/', getTerritories);
// router.get('/:id', getTerritory);
router.post('/createTerritory', createTerritory);
router.put('/:id', updateTerritory);
router.delete('/:id', deleteTerritory);
router.get('/count', getCount);
router.post('/updateTaggedUsers', updateTaggedUsers);

module.exports = router;