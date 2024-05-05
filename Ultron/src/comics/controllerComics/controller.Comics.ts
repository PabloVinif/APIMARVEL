import { Request, Response } from "express";
import comicsService from '../serviceComics/service.Comics';

class ComicsController {
  
  private MARVEL_API_URL = "https://gateway.marvel.com/v1/public/series/1067/comics";
  private API_KEY = "f1d75b477233f6295f2e168358f0b9ed";
  private PRIVATE_KEY = "4b0df4ae1c40fb0765f632cea39dac8292bc4472";

  async create(req: Request, res: Response){
    const createdComics = await comicsService.create(req.body)
    res.status(201).json(createdComics);
  }

  async findAll(req: Request, res: Response) {
    const foundComics = await comicsService.findAll()
    res.status(200).json(foundComics);
  }

  async findById(req: Request, res: Response) {
    const foundComic = await comicsService.findById(req.params.id)
    res.status(200).json(foundComic);
  }

  async update(req: Request, res: Response) {
    const updatedComics = await comicsService.update(req.params.id, req.body)
    res.status(200).json(updatedComics);
  }
 
  async delete(req: Request, res: Response) {
    const deletedComics = await comicsService.delete(req.params.id)
    res.status(200).json(deletedComics);
  }

  async fetchComics(req: Request, res: Response) {
    try {
      await comicsService.fetchAndStoreComics(this.MARVEL_API_URL, this.API_KEY, this.PRIVATE_KEY);
      res.json({ message: "The comics have been saved." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching and storing the comics." });
    }
  }
}

export default new ComicsController();
