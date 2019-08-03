import Joi from 'joi';

const validateUrl = shorten => {
  const schema = {
    from: Joi.string().required(),
    to: Joi.string().required(),
    author: Joi.string().required(),
  };
  return Joi.validate(shorten, schema);
};

export default { validateUrl };
