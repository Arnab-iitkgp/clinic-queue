const express = require("express");
const router = express.Router();
const {
  createReceptionist,
  getReceptionists,
  deleteReceptionist,
} = require("../controllers/receptionistController");
const auth = require("../middlewares/authMiddleware");

router.post("/receptionists", auth, createReceptionist);
router.get("/receptionists", auth, getReceptionists);
router.delete("/receptionists/:id", auth, deleteReceptionist);

module.exports = router;
