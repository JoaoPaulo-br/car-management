const express = require('express');

const router = express.Router();
const {
  createCarInfo,
  getCarsInfo,
  getCar,
  updateCar,
  deleteCar,
  getCarByOwnerId,
} = require('../../controller/car/carInfo');
const authMiddleware = require('../../middleware/auth');
const adminMiddleware = require('../../middleware/admin');

router.post('/add-car', authMiddleware, createCarInfo);
router.get('/get-car-by-owner-id/:ownerId', authMiddleware, getCarByOwnerId);
router.get('/get-cars', authMiddleware, adminMiddleware, getCarsInfo);
router.get('/get-car/:id', authMiddleware, adminMiddleware, getCar);
router.patch('/update-car/:id', authMiddleware, updateCar);
router.delete('/delete-car/:id', authMiddleware, adminMiddleware, deleteCar);

module.exports = router;
