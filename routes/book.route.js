const express = require("express");

const controller = require("../controllers/book.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/update/:id", controller.update);

router.post("/:id/update", controller.updatePost);

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect("/books");
});

module.exports = router;