const express = require("express");

const {
  getUser,
  getUserById,
  updateUser,
  getAllUsers,
  delUser,
} = require("../controller/user");
const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", getUser);

router.delete("/user/delete/:userId", delUser);

router.get("/users/", getAllUsers);

router.put("/user/update/:userId", updateUser);
module.exports = router;
