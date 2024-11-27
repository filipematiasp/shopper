import DriversRepository from '../infra/inMemoryRepositories/DriversRepository'

interface IRaceDone {
  customer_id: string;
  rides: IRace[];
}

interface IRace {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: drive;
  value: number;
}

interface drive {
  id: number;
  name: string;
}

class ShowRacesService {

  public execute(customer_id: string, driver_id: number | null): IRaceDone {

    const driversRepository = new DriversRepository();

    const races = driversRepository.findRacesId(customer_id, driver_id);

    const returns = {
      customer_id,
      rides: races
    }

    if(!returns) {
      throw new Error('Failed to find drivers')
    }

    return returns;
  }
}

export default ShowRacesService;