const router = require('express').Router();
const organizationController = require('../controllers/organization.controller');
const {authMiddleware} = require("../middlewares/auth");

router.route('/').post(authMiddleware, organizationController.createOrganization);
router.route('/isNameTaken/:name').get(organizationController.isNameTaken);
router.route('/allNames').get(organizationController.findAllNames);

module.exports = router;
