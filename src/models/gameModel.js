import joi from "joi";

const gameModel = joi.object({
  name: joi.string().required().min(3).max(100),
  image: joi.string(),
  stockTotal: joi.number().integer().greater(0).required(),
  categoryId: joi.number().integer().required(),
  pricePerDay: joi.number().precision(2).greater(0).required(),
});

export default gameModel;
