const express = require("express");
const { createPost, updatePost, getPosts, singlePost } = require("../controllers/postController")


const router = express.Router();

router.post("/create", createPost);
router.patch("/update/:id", updatePost);
router.get("/all", getPosts);
router.get("/:id", singlePost);

module.exports = router;