const express = require("express")
const { verifyToken } = require("../utils/verifyUser.js")
const {
  createComment,
  deleteComment,
  editComment,
  getComments,
  getPostComments,
  likeComment,
} = require("../controllers/comment.controller.js")

const router = express.Router()

router.post("/create", verifyToken, createComment)
router.get("/getPostComments/:postId", getPostComments)
router.put("/likeComment/:commentId", verifyToken, likeComment)
router.put("/editComment/:commentId", verifyToken, editComment)
router.delete("/deleteComment/:commentId", verifyToken, deleteComment)

router.get("/getcomments", verifyToken, getComments)

module.exports= router
