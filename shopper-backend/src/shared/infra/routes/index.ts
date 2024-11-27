import { Router } from "express";
import rideRouter from "../../../modules/ride/infra/http/ride.routes"

const routes = Router();

routes.use('/ride', rideRouter);

export default routes;
