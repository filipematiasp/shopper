import DriversRepository from '../infra/inMemoryRepositories/DriversRepository'

interface IDriver {
  "id": number;
  "name": string;
  "description": string;
  "car": string;
  "rating": string;
  "comment": string;
  "rate": number;
  "km": number;
}

class ShowDriversService {

  public execute(): IDriver[] {

    const driversRepository = new DriversRepository();

    const drivers = driversRepository.findAll();

    if(!drivers) {
      throw new Error('Failed to find drivers')
    }
    return drivers;
  }
}

export default ShowDriversService;