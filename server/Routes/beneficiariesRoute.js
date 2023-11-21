const express = require('express');
const router = express.Router();
const beneficiariesController = require('../Controllers/beneficiariesController');
const middleware = require("../Middleware/authorization")

router.post("/newrequest",middleware.authorize,beneficiariesController.newRequest);
router.get("/allrequest",middleware.authorize,beneficiariesController.getAllRequest);
router.put("/deleterequest/:id",middleware.authorize,beneficiariesController.deleteRequest);
router.put("/updatestatus/:id",middleware.authorize,beneficiariesController.updateRequeststatus);
router.put("/updateaccept/:id",middleware.authorize,beneficiariesController.updateRequestaccept);
router.get("/allrequestAdmin",beneficiariesController.getAllRequestAdmin);

module.exports = router;