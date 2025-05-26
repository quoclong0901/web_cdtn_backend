const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post('/create' , OrderController.createOrder);
router.get('/get-all-order/:id' ,authUserMiddleWare, OrderController.getAllDetailsOrder);
router.get('/get-details-order/:id' , OrderController.getDetailsOrder);
router.delete('/cancel-order/:id' , OrderController.cancelOrderDetails);
router.get('/get-all-order' ,authMiddleWare , OrderController.getAllOrder);

module.exports = router;
