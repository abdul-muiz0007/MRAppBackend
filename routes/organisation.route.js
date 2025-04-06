const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisation.controller');

// Define routes for organisation-related endpoints
router.get('/', organisationController.getOrganisations);
router.get('/:id', organisationController.getOrganisation);
router.post('/', organisationController.createOrganisation);
router.put('/:id', organisationController.updateOrganisation);
router.delete('/:id', organisationController.deleteOrganisation);

module.exports = router;