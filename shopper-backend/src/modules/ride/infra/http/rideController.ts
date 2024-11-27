import { Request, Response } from "express";
import CalculateRoutesService from "../../services/CalculateRoutesService"
import CreateRoutesService from "../../services/CreateRoutesService"
import ShowRacesService from "../../services/ShowRaces"


export default class RideController {
  public async show (request: Request, response: Response): Promise<Response> {

    const {customer_id, origin, destination} = request.body;

    const calculateRoutesService = new CalculateRoutesService();

    try {
      const route = await calculateRoutesService.execute({ customer_id, origin, destination });
      return response.json(route);

    } catch (error: any) {
      console.error('Error in RideController:', error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const createRoutesService = new CreateRoutesService();

    try {
      const race = await createRoutesService.execute(request.body);
      return response.json(race);

    } catch (error: any) {
      console.error('Error in create race:', error.message);
      return response.status(500).json({ error: error.message });
    }
  }

  public async findById (request: Request, response: Response): Promise<Response> {
    const showRacesService = new ShowRacesService();

    try {

      const {customer_id} = request.params
      const driver_id: any = request.query.driver_id ? request.query.driver_id : null;

      const race = showRacesService.execute(customer_id, driver_id);
      return response.json(race);

    } catch (error: any) {
      console.error('Error in create race:', error.message);
      return response.status(500).json({ error: error.message });
    }
  }

}