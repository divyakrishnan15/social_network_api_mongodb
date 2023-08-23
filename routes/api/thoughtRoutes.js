const router = require('express').Router();
const {
  getThoughts,
  createThoughts,
  getSingleThought,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require('../../controllers/thoughtController');

//GET ALL, POST
router.route('/')
.get(getThoughts)
.post(createThoughts);


router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThoughts)
.delete(deleteThoughts)

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(createReactions);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);



module.exports = router;


