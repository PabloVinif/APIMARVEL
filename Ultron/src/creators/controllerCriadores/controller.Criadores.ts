import { Request, Response } from "express";
import creatorsService from '../serviceCreators/service.Creators';

const API_URL = "https://gateway.marvel.com/v1/public/series/1067/creators?apikey=f1d75b477233f6295f2e168358f0b9ed&ts=1&hash=ae8761b32df4792b243892e608a4661b";

class CreatorsController {

    async create(req: Request, res: Response){
        const createdCreators = await creatorsService.create(req.body);
        res.status(201).json(createdCreators);
    }

    async findAll(req: Request, res: Response) {
        const foundCreators = await creatorsService.findAll();
        res.status(200).json(foundCreators);
    }

    async findById(req: Request, res: Response) {
        const foundCreator = await creatorsService.findById(req.params.id);
        res.status(200).json(foundCreator);
    }

    async update(req: Request, res: Response) {
        const updatedCreators = await creatorsService.update(req.params.id, req.body);
        res.status(200).json(updatedCreators);
    }
   
    async delete(req: Request, res: Response) {
        const deletedCreators = await creatorsService.delete(req.params.id);
        res.status(200).json(deletedCreators);
    }


    async fetchCreator(req: Request, res: Response) {
        try {
            await creatorsService.fetchAndStoreCreators();
            res.json({ message: "The Creators have been saved in the database." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while saving the Creators in the database." });
        }
    }
}

export default new CreatorsController();
