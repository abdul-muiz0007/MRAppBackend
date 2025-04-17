const express = require('express');
const router = express.Router();
const { 
    getVisitLogs, 
    getVisitLog, 
    createVisitLog, 
    updateVisitLog, 
    deleteVisitLog, 
    getVisitLogsByPOV 
} = require('../controllers/visitLog.controller.js');

router.get('/', getVisitLogs);
router.get('/:id', getVisitLog);
router.post('/', createVisitLog);
router.put('/:id', updateVisitLog);
router.delete('/:id', deleteVisitLog);
router.post('/getVisitLogsByPOV', getVisitLogsByPOV);

module.exports = router;