const express = require("express");
const {
  deleteUser,
  getUserById,
  getUsers,
  signout,
  updateUser,
} = require("../controllers/user.controller")
const { verifyToken } = require("../utils/verifyUser.js")

const router = express.Router()

router.put("/update/:userId", verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post("/signout", signout)

router.get("/getusers", verifyToken, getUsers)

router.get("/:userId", getUserById)

module.exports= router;
