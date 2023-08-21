const {Schema,Types} = require('mongoose')

// Schema to create Reactions model
const reactionsSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        // default: false,
        default: ()=>new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required:true,
        maxLength: 500,
      },
      username: {
        type: String,
        required:true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // get:(date)=>moment(date).format('MM DD, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        // virtuals: true,
        getters:true
      },
      id:false
    }
  );

  module.exports = reactionsSchema