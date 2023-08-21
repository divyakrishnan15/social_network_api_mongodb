const User = require('../models/User');
const Thought  = require('../models/Thought');

const userController ={

async getUsers(req, res) {
  try {
    const users = await User.find()
    // .populate({path:'thoughts',select:'-__v'})
    // .populate({path:'friends',select:'-__v'})
    .select('-__v');

    res.json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
},



// create a new user
async createUser({body}, res) {
  try {
    const dbUserData = await User.create(body)

    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
},




async getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},





async updateUser({params,body},res){
  try{
    const user = await User.findOneAndUpdate(
      {_id:params.userId},
      { $set:body},
      {runValidators : true, new:true}
    )
    .select('-__v')
  if(!user){
    return res.status(404).json({message:'No user with the is id'})
  }
  res.json(user)
}catch(err){
  console.log(err)
  res.status(500).json(err)
}
},




async deleteUser({params},res){
  try{
    const user = await User.findOneAndDelete(
      { _id:params.userId},
      // { $pull:{_id:params.friendId}},
      { new:true }
    )
    // .populate({path: 'friends', select: '-__v'})
    .select('-__v')

    if(!user){
      return res.status(404).json({message:'No user with this ID'})
    }
    res.json({message:'Deleted User'})
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
},


async addFriend({params,body},res){
  try{
    const userData = await User.findOneAndUpdate(
      {_id:params.userId},
      { $addToSet:{friends:params.friendId}},
      {runValidators : true, new:true}
    )
    .select('-__v')

  if(!userData){
    return res.status(404).json({message:'No user with the is'})
  }
  res.json(userData)
}catch(err){
  console.log(err)
  res.status(500).json(err)
}
},


async deleteFriend({params},res){
  try{
    const userData = await User.findOneAndUpdate(
      { _id:params.userId},
      { $pull:{friends:params.friendId}},
      { new:true }
    )
    .select('-__v')

    if(!userData){
      return res.status(404).json({message:'No user with this ID'})
    }
    res.json({message:'Deleted Friend for the User'})
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
},






}

module.exports = userController;
