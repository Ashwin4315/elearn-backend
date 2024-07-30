const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, "a course must contain a title"],
        unique: true
    },
    courseDescription: {
        type: String,
        required: [true, "a course must contain a description of the course"],
    },
    summary: {
        type: String,
    },
    youtubeOId: {
        type: String,
        required: [true, "a course must contain a youtube id"],
        
    },
    prerequisites:{
        type:String
    },
    image: {
        type: String,
    },
    duration: {
        type: Number,
        required: [true, "a course must contain a duration"],
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingsAverage: {
        type: Number,
        default: 0
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price:{
        type:String
    },
    field:{
        type:String
    },
    language:{
        type:String
    },
    whatYouLearn:{
        course_name:{type:String},
        topics:[{
            topic:String,
            subtopics:[String],

        }],
        final_project:String
    }
   

},
{
    strictQuery:true
});


exports.Course = mongoose.model("Course", courseSchema);


