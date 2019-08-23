const express = require('express');
const superAdminMiddleware = require('../../middleware/superAdmin');
const adminMiddleware = require('../../middleware/admin');
const authMiddleware = require('../../middleware/auth');
const {
  getRegularUsers,
  getAdminUsers,
  deleteUserInfo,
  makeAdminToUser,
  makeUserToAdmin,
  getUserInfo,
  getUserInfos,
  updateUserInfo,
} = require('../../controller/user/userInfo');

const router = express.Router();

router.get('/get-regular-users', authMiddleware, adminMiddleware, getRegularUsers);
router.get('/get-admin-users', authMiddleware, superAdminMiddleware, getAdminUsers);
router.delete('/delete-user/:id', authMiddleware, adminMiddleware, deleteUserInfo);
router.get('/make-user-to-admin/:id', authMiddleware, adminMiddleware, makeUserToAdmin);
router.get('/make-admin-to-user/:id', authMiddleware, adminMiddleware, makeAdminToUser);
router.get('/get-user-info/:id', authMiddleware, getUserInfo);
router.patch('/update-user-info/:id', authMiddleware, updateUserInfo);

module.exports = router;
