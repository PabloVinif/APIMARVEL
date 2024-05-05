import { Request, Response } from "express";
import personagemService from '../servicePersona/service.Persona';
import axios from 'axios';
import { personagemType } from "../typesPersona/types.Persona";

const API_URL = "https://gateway.marvel.com/v1/public/series/1067/characters?apikey=f1d75b477233f6295f2e168358f0b9ed&ts=1&hash=ae8761b32df4792b243892e608a4661b";

class PersonagemController {

    async create(req: Request, res: Response) {
        const createdPersonagem = await personagemService.create(req.body);
        res.status(201).json(createdPersonagem);
    }

    async findAll(req: Request, res: Response) {
        const foundPersonagens = await personagemService.findAll();
        res.status(200).json(foundPersonagens);
    }

    async findById(req: Request, res: Response) {
        const foundPersonagem = await personagemService.findById(req.params.id);
        res.status(200).json(foundPersonagem);
    }

    async update(req: Request, res: Response) {
        const updatedPersonagem = await personagemService.update(req.params.id, req.body);
        res.status(200).json(updatedPersonagem);
    }

    async delete(req: Request, res: Response) {
        const deletedPersonagem = await personagemService.delete(req.params.id);
        res.status(200).json(deletedPersonagem);
    }

    async fetchCharacters(req: Request, res: Response) {
        try {
            await personagemService.fetchAndStoreCharacters();
            res.json({ message: "The characters have been saved in the database." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while saving the characters in the database." });
        }
    }

    async listarOrdemAlfabetica(req: Request, res: Response) {
        try {
            const ordemPersonagens = await personagemService.listarPersonagensOrdemAlfabetica();
            return res.json(ordemPersonagens);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while listing characters in alphabetical order." });
        }
    }

}

export default new PersonagemController();
