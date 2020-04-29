const express = require("express");

const controller = require("../controllers/transaction.controller");

const router = express.Router();

router.get("/", controller.index);

router.post("/create", controller.create);

module.exports = router;