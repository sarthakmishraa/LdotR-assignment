import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    id:{
        required: true,
        type: Number
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

export default mongoose.model("Users", usersSchema);