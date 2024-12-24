const express = require("express")
const { verifyToken } = require("../utils/verifyUser.js")
const {
  create,
  deletepost,
  getPosts,
  updatepost,
} = require("../controllers/post.controller.js")

const router = express.Router()

router.post("/create", verifyToken, create)
router.get("/getposts", getPosts)
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost)
router.put("/updatepost/:postId/:userId", verifyToken, updatepost)

module.exports= router
