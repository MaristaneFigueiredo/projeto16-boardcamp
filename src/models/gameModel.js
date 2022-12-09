import joi from "joi";

const gameModel = joi.object({
  name: joi.string().required().min(3).max(100),
  image: joi.string().required(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().precision(2).required(),
});

export default gameModel;
