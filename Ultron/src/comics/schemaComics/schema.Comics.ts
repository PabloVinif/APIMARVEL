import { Schema, model } from "mongoose";

const comicsSchema = new Schema ({
    titleComics: {
        type: String,
        required: true
    },
    descriptionComics: {
        type: String,
        required: true
    },
    capaComics: {
        type: String,
        required: true
    },
    idComics: {
        type: Number,
        required: true,
        unique: true
    },
    publicationDateComics: {
        type: Date,
        required: true
    }
}, {
    timestamps: true 
});

export default model('Comics', comicsSchema);
