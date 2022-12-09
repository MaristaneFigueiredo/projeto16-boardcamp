import joi from "joi";

const customerModel = joi.object({
  name: joi.string().required().min(3).max(3),
  phone: joi.string().required().min(11).max(13),
  cpf: joi.string().required().min(11).max(11),
  birthday: joi.string().required().min(10).max(10),
});

export default customerModel;
