import  Mongoose  from "mongoose";

const repositorySchema = new Mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: String,
            required: true 
        }
    },
    {
        timestamps: true
    }


);

export default Mongoose.model('Repository', repositorySchema);