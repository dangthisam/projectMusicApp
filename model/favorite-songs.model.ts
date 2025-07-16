
import mongoose from "mongoose";


const favoriteSongs=new mongoose.Schema({
    userId:String,
    songId:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,

},{
    timestamps:true
})


const FavoriteSongs=mongoose.model("FavoriteSongs",favoriteSongs,"favoriteSongs");
export default FavoriteSongs;