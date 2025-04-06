const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, updateTaggedTerritory, deleteUser, loginUser } = require('../controllers/user.controller.js')

router.get('/', getUsers);
// router.get('/:id', getUser);
router.get("/updateTaggedTerritory", updateTaggedTerritory); 
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;