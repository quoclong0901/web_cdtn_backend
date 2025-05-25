const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/log-out', UserController.logoutUser);
router.put('/update-user/:id',authUserMiddleWare , UserController.updateUser);
router.delete('/delete-user/:id',authMiddleWare , UserController.deleteUser); //authMiddleware : dùng chỉ cho admin
router.get('/getAll', authMiddleWare , UserController.getAllUser);
router.get('/get-details/:id',authUserMiddleWare , UserController.getDetailsUser);
router.post('/refresh-token', UserController.refreshToken);
router.post('/delete-many' ,authMiddleWare , UserController.deleteManyUser);

module.exports = router;