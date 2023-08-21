const { Schema, model } = require('mongoose');
const Reaction= require('./Reaction')



// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type:String,
      required:true,
      minlength:1,
      maxlength:280
    },
    createdAt: {
      type: Date,
      default: Date.now
      // get:(date)=>moment(date).format('MM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required:true
    },
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
    }],
  },
  {
    toJSON: {
      // virtuals: true,
      getters:true
    },
    id:false
  }
);



// Create a virtual property `responses` that gets the amount of response per Thoughts
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Initialize our Thoughts model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
