const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authMiddleWare } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post('/create', ProductController.createProduct);
router.put('/update/:id' , ProductController.updateProduct);
router.get('/get-details/:id' , ProductController.getDetailsProduct);
router.delete('/delete/:id' , authMiddleWare, ProductController.deleteProduct);
router.get('/get-all' , ProductController.getAllProduct);
router.post('/delete-many' ,authMiddleWare , ProductController.deleteManyProduct);
router.get('/get-all-type' , ProductController.getAllType);


module.exports = router;