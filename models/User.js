const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username:{
      type:String,
      unique:true,
      required:true,
      trim:true
    },
    email:{
      type:String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      // validate: [validateEmail, 'Please fill a valid email address'],
      // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      // var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
  },
  {
    toJSON: {
      virtuals: true,
      getters:true
    },
    id: false,
  }
);


userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('Users', userSchema);


var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

module.exports = User;




// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

// var validateEmail = function(email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

// var EmailSchema = new Schema({
//   email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       unique: true,
//       required: 'Email address is required',
//       validate: [validateEmail, 'Please fill a valid email address'],
//       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//   }
// });
