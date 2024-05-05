import criadoresModel from '../schemaCriadores/schema.Criadores';
import { criadoresType } from '../typesCriadores/types.Criadores';
import axios from 'axios';

class CriadoresService {

  async create(criadores: criadoresType) {
    const createdCriadores = await criadoresModel.create(criadores);
    return createdCriadores;
  }

  async findAll() {
    const foundCriadores = await criadoresModel.find();
    return foundCriadores;
  }

  async findById(id: string) {
    const foundCriador = await criadoresModel.findById(id);
    return foundCriador;
  }

  async update(id: string, criadores: criadoresType) {
    const updatedCriadores = await criadoresModel.findByIdAndUpdate(id, {
      idCriadores: criadores.idCriadores,
      nameCriadores: criadores.nameCriadores,
      professionCriadores: criadores.professionCriadores
    }, { new: true });

    return updatedCriadores;
  }

  async delete(id: string) {
    try {
      await criadoresModel.findByIdAndDelete(id);
      return "Creator removed successfully";
    } catch (error) {
      throw new Error(`An error occurred while removing the creator: ${error}`);
    }
  }


  async fetchAndStoreCreators() {
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/series/1067/creators?apikey=f1d75b477233f6295f2e168358f0b9ed&ts=1&hash=ae8761b32df4792b243892e608a4661b`
      );

      const creators = response.data.data.results;

      for (const creator of creators) {
        const newCreator: criadoresType = {
          idCriadores: creator.id,
          nameCriadores: creator.fullName,
          professionCriadores: creator.role
        };

        await this.create(newCreator);
      }

      console.log("The creators have been saved in the database.");
    } catch (error) {
      console.error(`Error fetching creators: ${error}`);
    }
  }
}

export default new CriadoresService();
