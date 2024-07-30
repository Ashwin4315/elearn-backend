const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    contents:{
      content:[{
          name:String,
          info:String,

      }]
  },
       quizes:{
        quiz:[
          {
            question:String,
            options:[String],
            answer:String
          }
        ]
       },
      course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      required: [true, 'content must belong to a course.']
    }
  },
  {
     
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictQuery:true

  }
);






const Content = mongoose.model('Content', contentSchema);

module.exports = Content;