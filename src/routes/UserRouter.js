const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/log-out', UserController.logoutUser);
router.put('/update-user/:id',authMiddleWare , UserController.updateUser);
router.delete('/delete-user/:id',authMiddleWare , UserController.deleteUser);
router.get('/getAll', authMiddleWare , UserController.getAllUser);
router.get('/get-details/:id' , UserController.getDetailsUser);
router.post('/refresh-token', UserController.refreshToken);
router.post('/delete-many' ,authMiddleWare , UserController.deleteManyUser);

module.exports = router;