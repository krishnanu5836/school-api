const Joi = require('joi');

const addSchoolSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required(),
  address: Joi.string().trim().min(5).max(500).required(),
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180)
});

module.exports = { addSchoolSchema };
