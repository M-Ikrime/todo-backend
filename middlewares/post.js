const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
module.exports = async (req, res, next) => {
  const body = req.body;
  try {
    let joiSchema;

    joiSchema = {
      user_id: joi.objectId(),
      title: joi.string().max(10).required(),
      content: joi.string().required(),
      creator: joi.string().required(),
    };
    const validateControl = joi.object(joiSchema).validate(body);
    if (validateControl.error) {
      return res
        .status(401)
        .json({ error: "Validation", message: validateControl.error });
    }
    next();
  } catch (error) {
    return error;
  }
};
