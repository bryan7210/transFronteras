import mongoose from "mongoose";

 const loginSchema = new mongoose.Schema({
    password: {type: String, require: true, unique: true},
    usuario: {type: String, require: true, unique: true}
})

 export default mongoose.model("Login", loginSchema)