const Thought  = require('../models/Thought');
const User  = require('../models/User');

 const thoughtController = {

    async getThoughts(req,res){
      try{
        const thoughtData = await Thought.find()
        .select('-__v');
        // .sort({createdAt:-1})
        res.json(thoughtData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },


    async getSingleThought({params,body},res){
      try{
        const thoughtData = await Thought.findOne({_id:params.thoughtId})
        .select('-__v')
        // .populate({path: 'reactions',select: '-__v'})
        console.log("GET SINGLE THOUGHT = ",thoughtData)

        res.json(thoughtData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },


    async createThoughts({params,body},res){
      try{
        const thoughtData = await Thought.create(body)
        if (!thoughtData._id) {
          res.status(500).json({ message: 'Thought creation failed!' });
          return;
      }
      console.log("thoughtData._id === ",thoughtData._id)
        const resultData =  await User.findOneAndUpdate(
          {_id:params.userId},
          {$push:{thoughts:thoughtData._id}},
          {new:true}
        )
        if (!resultData) {
          res.status(404).json({ message: 'User not found!' });
          return;
      }
        res.json(resultData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },



    async updateThoughts({params,body},res){
      try{
        const thoughtData = await Thought.findOneAndUpdate(
          {_id:params.thoughtId},
          {$set:body},
          {runValidators:true, new:true}
        )
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-___v')
        if(!thoughtData){
          return res.status(404).json({message:'No thought with the is id'})
        }
        res.json(thoughtData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },




    async deleteThoughts({params,body},res){
      try{
        const thoughtData = await Thought.findOneAndDelete(
          {_id:params.thoughtId},
          // {$pull:{_id:params.friendId}},
          {new:true}
        )
        
        if(!thoughtData){
          return res.status(404).json({message:'No thought with this ID'})
        }
        res.json({message:'Deleted thoughts'})
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },



    async createReactions({params,body},res){
      try{
        const reactionData = await Thought.findOneAndUpdate(
          {_id:params.thoughtId},
          { $push:{reactions:params.body}},
          {runValidators : true, new:true}
        )
        // .populate({path: 'reactions', select: '-__v'})

        console.log("CREATE REACTIONS : ",reactionData)
        if(!reactionData){
          return res.status(404).json({message:'No Reactions with the is'})
        }
        res.json(reactionData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },



    async deleteReactions({params,body},res){
      try{
        const reactionData = await Thought.findOneAndUpdate(
          { _id:params.thoughtId},
          {$pull: {reactions: {reactionId: params.reactionId}}},
          { new:true }
        )
        res.json(reactionData)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
    },


};
module.exports = thoughtController





// up Thoughts Controller
// const thoughtsController = {

//     // Create a new thought
//     createThoughts({params, body}, res) {
//         Thoughts.create(body)
//         .then(({_id}) => {
//             return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
//         })
//         .then(dbThoughtsData => {
//             if(!dbThoughtsData) {
//                 res.status(404).json({message: 'No thoughts with this particular ID!'});
//                 return;
//             }
//             res.json(dbThoughtsData)
//         })
//         .catch(err => res.json(err)); 
//     },