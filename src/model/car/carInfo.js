const Joi = require('joi');
const mongoose = require('mongoose');

const carInfoSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  carRegistrationDate: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now,
  },
  carDescription: {
    type: String,
    minLength: 5,
    maxLength: 2000,
  },
  carMilage: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  ownerId: {
    type: String,
  },
  isNewCar: {
    type: Boolean,
    default: false,
  },
  lastServicingAlertDate: {
    type: Date,
  },
});

const CarInfo = mongoose.model('Car', carInfoSchema);

const validateCarInfo = (carInfo) => {
  const Schema = {
    _id: Joi.string(),
    ownerId: Joi.string(),
    carName: Joi.string().min(3).max(50).required(),
    carRegistrationDate: Joi.date(),
    carDescription: Joi.string(),
    carMilage: Joi.number(),
    email: Joi.string().email().min(5).max(255)
      .required(),
    mobileNo: Joi.string().min(5).max(255)
      .required(),
    isNewCar: Joi.boolean(),
    lastServicingAlertDate: Joi.date(),
  };
  return Joi.validate(carInfo, Schema);
};

exports.carInfoSchema = carInfoSchema;
exports.CarInfo = CarInfo;
exports.validateCarInfo = validateCarInfo;
