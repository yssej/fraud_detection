const router = require('express').Router();
const user = require('./user');
const login = require('./auth');
const organization = require('./organization')
const membership = require('./membership')

router.use('/users', user);
router.use('/auth', login);
router.use('/organization', organization);
router.use('/membership', membership);

module.exports = router;
