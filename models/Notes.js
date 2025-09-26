const mongoose = require('mongoose');


const NotesSchema = new Schema({
  titlel:{
    type: String,
    required: true  
  },
    descriptions:{
    type: String,
    required: true,
  },
    tags:{
    type: String,
    default: "General"
  },
  date:{
    type: Date,
    default: Date.now
},
});
module.exports = mongoose.model('notes', NotesSchema);