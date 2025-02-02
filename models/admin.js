import { model, models, Schema } from "mongoose";

export const adminSchema = new Schema({
    declaredwinner: {type: String},
    clickdate: []
})

const admin = models.admins || model("admins", adminSchema);

export default admin;