import { model, models, Schema } from "mongoose";

const adminlogsSchema = new Schema({
  email: { type: String, required: [true, "email is required"] },
  password: { type: String, required: [true, "password is Required"] },
  attempt: { type: String, required: [true, "Attempt is Required"] },
  role: { type: String, required: [true, "Role is Required"] },
  date: { type: String, required: [true, "date is Required"] },
  time: { type: String, required: [true, "time is Required"] },
});

const adminlogs = models.adminlogs || model("adminlogs", adminlogsSchema);

export default adminlogs;