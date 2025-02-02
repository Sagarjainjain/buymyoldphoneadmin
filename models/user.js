import  { model, models, Schema } from "mongoose";

export const UserSchema = new Schema({
  email: { type: String, required: [true, "Email is requred"] },
  password: { type: String, required: [true, "Password is requred"] },
});


const User = models.user || model("user", UserSchema);

export default User;