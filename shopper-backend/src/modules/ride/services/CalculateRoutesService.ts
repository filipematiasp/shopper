import { GoogleComputerRoutesServices } from "../../../shared/infra/googleMaps/googleComputerRouterServices"
import ShowDriversService from "./ShowDrivers"

interface ICalculateRoutes {
  customer_id: string;
  origin: string;
  destination: string;
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


class CalculateRoutesService {
  //melhor a interface do retorno
  public async execute({customer_id, origin, destination}: ICalculateRoutes){
    const apiKey = process.env.GOOGLE_API_KEY || ''

    const googleComputerRoutesServices = new GoogleComputerRoutesServices(apiKey);

    const route = await googleComputerRoutesServices.execute(origin, destination, "DRIVE")

    if(!route) {
      throw new Error('Failed to fetch routes')
    }

    const { distanceMeters }: RouteResponse  = route.routes[0]

    const showDriversService = new ShowDriversService()

    const drivers = showDriversService.execute();

    let options = [];
    for (const driver of drivers) {
      if(distanceMeters >= driver.km * 1000){

        options.push({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: {
            rating: driver.rating,
            comment: driver.comment
          },
          value: (distanceMeters / 1000) * driver.rate
        })
      }
    }

    const sortedArray = options.sort((a, b) => a.value - b.value);


    return {
      origin: {
        latitude: route.routes[0].legs[0].startLocation.latLng.latitude,
        longitude: route.routes[0].legs[0].startLocation.latLng.longitude
      },
      destination: {
        latitude: route.routes[0].legs[0].endLocation.latLng.latitude,
        longitude: route.routes[0].legs[0].endLocation.latLng.longitude
      },
      distance: distanceMeters,
      duration: route.routes[0].duration,
      options: sortedArray,
      routeResponse: route
    }
  }
}

export default CalculateRoutesService;