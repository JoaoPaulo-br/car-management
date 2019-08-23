const _ = require('lodash');
const {
  CarInfo,
  validateCarInfo,
} = require('../../model/car/carInfo');

const createCarInfo = async (req, res) => {
  const {
    error,
  } = validateCarInfo(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const carInfo = new CarInfo(_.pick(req.body, ['carName', 'ownerId', 'carRegistrationDate', 'carDescription', 'carMilage', 'email', 'mobileNo', 'isNew']));
  await carInfo.save();
  return res.status(200).json({
    success: true,
    data: carInfo,
  });
};

const getCarsInfo = async (req, res) => {
  const carsInfo = await CarInfo.find();
  return res.status(200).json({
    success: true,
    data: carsInfo,
  });
};

const getCar = async (req, res) => {
  const carInfo = await CarInfo.findById(req.params.id);
  if (!carInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid car id',
    });
  }

  return res.status(200).json({
    success: true,
    data: carInfo,
  });
};

const getCarByOwnerId = async (req, res) => {
  const carInfo = await CarInfo.findOne({
    ownerId: req.params.ownerId,
  });
  if (!carInfo) {
    return res.status(200).json({
      success: true,
      data: {},
    });
  }

  return res.status(200).json({
    success: true,
    data: carInfo,
  });
};

const updateCar = async (req, res) => {
  const carInfo = await CarInfo.findById(req.params.id);
  if (!carInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid car id',
    });
  }

  const {
    error,
  } = validateCarInfo(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const {
    carName,
    ownerId,
    carRegistrationDate,
    carDescription,
    carMilage,
    email,
    mobileNo,
    isNewCar,
  } = req.body;

  carInfo.carName = carName || carInfo.carName;
  carInfo.ownerId = ownerId || carInfo.ownerId;
  carInfo.carRegistrationDate = carRegistrationDate || carInfo.carRegistrationDate;
  carInfo.carDescription = carDescription || carInfo.carDescription;
  carInfo.carMilage = carMilage || carInfo.carMilage;
  carInfo.email = email || carInfo.email;
  carInfo.mobileNo = mobileNo || carInfo.mobileNo;
  carInfo.isNewCar = isNewCar || carInfo.isNewCar;

  await carInfo.save();

  return res.status(200).json({
    success: true,
    data: carInfo,
  });
};

const deleteCar = async (req, res) => {
  const carInfo = await CarInfo.findByIdAndDelete(req.params.id);
  if (!carInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid car id',
    });
  }

  return res.status(200).json({
    success: true,
    data: carInfo,
  });
};

module.exports = {
  createCarInfo,
  getCarsInfo,
  getCar,
  updateCar,
  deleteCar,
  getCarByOwnerId,
};
