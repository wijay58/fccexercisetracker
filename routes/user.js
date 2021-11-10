const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller.js');

router.post('/', user_controller.createUser);
router.post('/:id/exercises', user_controller.createExercise);
router.get('/:id/logs', user_controller.getExercises);

module.exports = router;
