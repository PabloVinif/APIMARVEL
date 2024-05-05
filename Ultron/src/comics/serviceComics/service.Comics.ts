import comicsModel from '../schemaComics/schema.Comics';
import { comicsType } from '../typesComics/types.Comics';
import axios from 'axios';

class ComicsService {

  async create(comics: comicsType){
    const createdComics = await comicsModel.create(comics);
    return createdComics;
  }

  async findAll() {
    const foundComics = await comicsModel.find();
    return foundComics;
  }

  async findById(id: string) {
    const foundComic = await comicsModel.findById(id);
    return foundComic;
  }

  async update(id: string, comics: comicsType) {
    const updatedComics = await comicsModel.findByIdAndUpdate(id, {
      titleComics: comics.titleComics,
      descriptionComics: comics.descriptionComics,
      capaComics: comics.capaComics,
      idComics: comics.idComics
    }, { new: true });

    return updatedComics;
  }

  async delete(id: string) {
    try {
      await comicsModel.findByIdAndDelete(id);
      return "Comic removed successfully";
    } catch (error) {
      throw new Error(`An error occurred while removing the comic: ${error}`);
    }
  }

  async fetchAndStoreComics(apiUrl: string, apiKey: string, privateKey: string) {
    try {
      const timestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      const hash = require('crypto').createHash('md5').update(timestamp + privateKey + apiKey).digest('hex');
      const response = await axios.get(`${apiUrl}&ts=${timestamp}&apikey=${apiKey}&hash=${hash}`);

      const comics = response.data.data.results;

      for (const comic of comics) {
        const newComic: comicsType = {
          titleComics: comic.title,
          descriptionComics: comic.description,
          capaComics: comic.thumbnail.path + "." + comic.thumbnail.extension,
          idComics: comic.id,
          publicationDateComics: comic.dates[0].date
        };

        await this.create(newComic);
      }

      console.log("Comics have been saved in the database.");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

export default new ComicsService();
