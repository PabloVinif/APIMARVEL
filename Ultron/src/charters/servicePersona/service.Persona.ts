import personagemModel from '../schemaPersona/schema.Persona';
import { personagemType } from '../typesPersona/types.Persona';
import axios from 'axios';

class PersonagemService {

    async create(personagem: personagemType) {
        const createdPersonagem = await personagemModel.create(personagem);
        return createdPersonagem;
    }

    async findAll() {
        const foundPersonagens = await personagemModel.find();
        return foundPersonagens;
    }

    async findById(id: string) {
        const foundPersonagem = await personagemModel.findById(id);
        return foundPersonagem;
    }

    async update(id: string, personagem: personagemType) {
        const updatedPersonagem = await personagemModel.findByIdAndUpdate(id, {
            idPersonagem: personagem.idPersonagem,
            namePersonagem: personagem.namePersonagem,
            descriptionPersonagem: personagem.descriptionPersonagem,
            urlImagePersonagem: personagem.urlImagePersonagem
        }, { new: true });

        return updatedPersonagem;
    }

    async delete(id: string) {
        try {
            await personagemModel.findByIdAndDelete(id);
            return "The character has been deleted";
        } catch (error) {
            throw new Error(`Error deleting character: ${error}`);
        }
    }

    async fetchAndStoreCharacters() {
        try {
            const response = await axios.get(
                `https://gateway.marvel.com/v1/public/series/1067/characters?apikey=f1d75b477233f6295f2e168358f0b9ed&ts=1&hash=ae8761b32df4792b243892e608a4661b`
            );

            const characters = response.data.data.results;

            for (const character of characters) {
                const newCharacter: personagemType = {
                    idPersonagem: character.id,
                    namePersonagem: character.name,
                    descriptionPersonagem: character.description || "",
                    urlImagePersonagem: character.thumbnail.path + "." + character.thumbnail.extension
                };

                await this.create(newCharacter);
            }

            console.log("The characters have been saved in the database.");
        } catch (error) {
            console.error(`Error fetching characters: ${error}`);
        }
    }

    async listarPersonagensOrdemAlfabetica() {
        const personagensOrdem = await personagemModel.find().sort({ namePersonagem: 1 });
        return personagensOrdem;
    }
}

export default new PersonagemService();
