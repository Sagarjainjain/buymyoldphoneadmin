import mongoose, { model, models, Schema } from "mongoose";

const bidSchema = new Schema({
    useremail: {type: String, required: [true, "User Email is required"]},
    usernumber: {type: String, required: [true, "User Number is required"]},
    userbid: {type: Number, required: [true, "Bid is required"]},
    biddate: {type: String, required: [true, "Date is required"]},

})

const bid = models.bid || model("bid", bidSchema)

export default bid;