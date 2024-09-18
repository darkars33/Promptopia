import mongoose from "mongoose";
import { models } from "mongoose";

const userSchema = new mongoose.Schema({
          email:{
                    type: String,
                    required: true,
                    unique: true,
          },
          username:{
                    type: String,
                    required: true,
                    unique: true,
          },
          image:{
                    type: String,
          }
})


const User = models.User || mongoose.model('User', userSchema);

export default User;
