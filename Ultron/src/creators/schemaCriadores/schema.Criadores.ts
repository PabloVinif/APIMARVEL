import { Schema, model } from "mongoose";

const creatorsSchema = new Schema({
    idCriadores: {
        type: Number,
        required: true
    },
    nameCriadores: {
        type: String,
        required: true
    },
    professionCriadores: String
}, {
    timestamps: true
});

export default model('Creators', creatorsSchema);
