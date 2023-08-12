const express = require('express');
const router = express.Router();

const { signup,getUser,updateUser,deleteUser } = require('../controllers/user');

router.route('/signup').post(signup)
router.route('/:userId').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;