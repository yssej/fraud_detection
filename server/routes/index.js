const router = require('express').Router();
const user = require('./user');
const login = require('./auth');
const organization = require('./organization')

router.use('/users', user);
router.use('/auth', login);
router.use('/organization', organization)

module.exports = router;
