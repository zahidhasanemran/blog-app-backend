const express = require("express");
const { createPost, updatePost, getPosts, singlePost } = require("../controllers/postController")
const authMiddleware = require("../middleware/authMiddleware")


const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.patch("/update/:id", authMiddleware, updatePost);
router.get("/all", authMiddleware, getPosts);
router.get("/:id", authMiddleware, singlePost);

module.exports = router;