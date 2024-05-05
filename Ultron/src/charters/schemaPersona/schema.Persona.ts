import { Schema, model } from "mongoose";

const personagemSchema = new Schema({
    idPersonagem: {
        type: Number,
        required: true
    },
    namePersonagem: {
        type: String,
        required: true
    },
    descriptionPersonagem: String,
    urlImagePersonagem: String
}, {
    timestamps: true 
});

export default model('Personagem', personagemSchema);
