import { Router, Request, Response } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import RideController from "./rideController"

const rideRouter = Router();
const rideController = new RideController();

rideRouter.get('/:customer_id',
  celebrate({
    [Segments.QUERY]: {
      driver_id: Joi.number()
    }
  }),
  rideController.findById

)


rideRouter.post('/estimate',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().required(),
      origin: Joi.string().required(),
      destination: Joi.string().required()
    })
  }),
  rideController.show
);


rideRouter.patch('/confirm',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().required(),
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      distance: Joi.number().required(),
      duration: Joi.string().required(),
      driver: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
      }).required(),
      value: Joi.number().required()
    })
  }),
  rideController.create
)


export default rideRouter;