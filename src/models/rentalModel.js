import joi from "joi";

const rentalModel = joi.object({
  customerId: joi.integer().required(),
  gameId: joi.integer().required(),
  daysRented: joi.integer().required(),
});

export default rentalModel;
