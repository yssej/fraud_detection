const router = require('express').Router();
const organizationController = require('../controllers/organization.controller');

router.route('/').post(organizationController.createOrganization);

module.exports = router;
