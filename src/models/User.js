import  Mongoose  from "mongoose";

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }


);

export default Mongoose.model('User', userSchema);