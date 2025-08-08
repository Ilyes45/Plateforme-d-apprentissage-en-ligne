// require express
const express = require('express');
const { register, login } = require('../controllers/user');
const { registerValidation, loginValidation, validate } = require('../midlleware/valdation');
const isauth = require('../midlleware/isauth');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// cerate router
const router = express.Router();


// route user (register & login )



//register 

router.post('/register', upload.single("image"),registerValidation(),validate ,register); 
  

// login 
router.post('/login',loginValidation(),validate , login);

// current user
router.get("/current",isauth,(req,res)=>{
    res.send(req.user);

});
 
//3- export router
module.exports = router;