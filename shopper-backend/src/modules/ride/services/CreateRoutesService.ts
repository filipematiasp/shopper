import DriversRepository from '../infra/inMemoryRepositories/DriversRepository'

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

interface RouteResponse {
  routes: Route[];
}

interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
}

interface Leg {
  startLocation: Location;
  endLocation: Location;
}

interface Location {
  latLng: LatLng;
}

interface LatLng {
  latitude: number;
  longitude: number;
}


class CreateRoutesService {
  public async execute(payload: any): Promise<{success: boolean}> {

    const driversRepository = new DriversRepository()

    const save = driversRepository.createRace(payload)

    if (!save?.response) {
      throw new Error('Error creating race');
    }

    return {"success": true }
  }
}

export default CreateRoutesService;