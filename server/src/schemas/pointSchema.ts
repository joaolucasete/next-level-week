import { Joi } from "celebrate";

const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  whatsapp: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  uf: Joi.string().required().max(2),
  items: Joi.string()
    .required()
    .pattern(new RegExp('((([0-9],)+[0-9])|([0-9]))')),
});

module.exports = userSchema;
