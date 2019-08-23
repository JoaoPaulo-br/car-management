const bcrypt = require('bcrypt');
const _ = require('lodash');
const {
  UserInfo,
  validateUserInfo,
} = require('../../model/user/userInfo');

const logger = require('../../helper/logger');


const createUserInfo = async (req, res) => {
  const {
    error,
  } = validateUserInfo(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let userInfo = await UserInfo.findOne({
    email: req.body.email,
  });
  if (userInfo) {
    return res.status(400).json({
      success: false,
      message: 'User already registered',
    });
  }

  userInfo = new UserInfo(_.pick(req.body, ['name', 'email', 'password', 'imageUrl', 'authenticationType', 'googleId', 'facebookId', 'isSuperAdmin', 'isAdmin', 'isOwner']));

  if (req.body.authenticationType === 'local') {
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
  }

  await userInfo.save();

  return res.status(200).json({
    success: true,
    data: _.pick(userInfo, ['_id', 'name', 'email']),
  });
};

const getUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }

  return res.status(200).json({
    success: true,
    data: userInfo,
  });
};

const getUserInfos = async (req, res) => {
  const userInfos = await UserInfo.find();

  return res.status(200).json({
    success: true,
    data: userInfos,
  });
};

const updateUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }

  const {
    name = userInfo.name,
      email = userInfo.email,
      mobileNo = userInfo.mobileNo,
      imageUrl = userInfo.imageUrl,
  } = req.body;

  userInfo.name = name;
  userInfo.email = email;
  userInfo.mobileNo = mobileNo;
  userInfo.imageUrl = imageUrl;

  await userInfo.save();

  return res.status(200).json({
    success: false,
    message: userInfo,
  });
};

const deleteUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findByIdAndRemove(req.params.id);
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }

  return res.status(200).json({
    success: true,
    data: userInfo,
  });
};

const getRegularUsers = async (req, res) => {
  const regularUsers = await UserInfo.find({
    isSuperAdmin: false,
    isAdmin: false,
  });

  return res.status(200).json({
    success: true,
    data: regularUsers,
  });
};

const getAdminUsers = async (req, res) => {
  const adminUsers = await UserInfo.find({
    isSuperAdmin: false,
    isAdmin: true,
  });

  return res.status(200).json({
    success: true,
    data: adminUsers,
  });
};

const makeUserToAdmin = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }
  userInfo.isOwner = false;
  userInfo.isAdmin = true;
  userInfo.isSuperAdmin = false;

  const response = await userInfo.save();

  logger.info(response);

  return res.status(200).json({
    success: true,
    message: 'User promoted',
  });
};

const makeAdminToUser = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  logger.info('Previous');
  logger.info(userInfo);
  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }
  userInfo.isOwner = true;
  userInfo.isAdmin = false;
  userInfo.isSuperAdmin = false;

  const response = await userInfo.save();

  logger.info('After');
  logger.info(response);

  return res.status(200).json({
    success: true,
    message: 'Convert to user',
  });
};

module.exports = {
  createUserInfo,
  getUserInfo,
  getUserInfos,
  updateUserInfo,
  deleteUserInfo,
  getRegularUsers,
  getAdminUsers,
  makeUserToAdmin,
  makeAdminToUser,
};
