const User = require("../models/Users");
// require bcrypt
const bcrypt = require('bcrypt');
//require jsonwebtoken 
const jwt = require('jsonwebtoken');
// require cloudinary 
const cloudinary = require("../utils/cloudinary");

exports.register = async(req, res) => {
    try {
   
        //req.body
       
       
        const {name, email, password,phone} = req.body;
       // Vérifie si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
// Upload image sur Cloudinary si fichier présent
    let cloudinaryResult = null;
    if (req.file) {
      cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
    }


        const salRounds = 10;
        const hashPassword = await bcrypt.hash(password,salRounds);

        

         //create new user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            phone,
           image: cloudinaryResult ? cloudinaryResult.secure_url : undefined,
      cloudinary_id: cloudinaryResult ? cloudinaryResult.public_id : undefined,
        });
        
         //save user
        await newUser.save();

        //creation token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ message: 'User registered successfully', user:newUser , token });
    } catch (error) {
        res.status(500).send({ message:"can 't register user"})
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        //creation token
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'User logged in successfully', user , token });
    } catch (error) {
        res.status(500).send({ message: "can't login user" });
    }
}
   