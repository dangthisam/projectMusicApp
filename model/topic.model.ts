import mongoose from "mongoose";
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const topicSchema = new mongoose.Schema({
    title:String,
    avatar:String,
    status:String,
   description:String,
    deleted:{
        type:Boolean,
        default:false
    
    },
    position:Number,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
      },
    deletedAt:Date,

},
{
    timestamps:true
})


const Topic = mongoose.model("Topic",topicSchema , "topics");
export default Topic;