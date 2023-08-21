const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,

} = require('../../controllers/userController');

// GET ALL, POST
router.route('/').get(getUsers).post(createUser);

// GET ONE USER, PUT, DEL
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)
// **`/api/users/:userId/friends/:friendId`**

module.exports = router;
