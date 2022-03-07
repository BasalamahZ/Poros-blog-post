const User = require('../Models/User');
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Something Wrong")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Something Wrong")

        const {password, ...others} = user._doc;
        res.redirect('/');
    }catch(err){
        res.status(500).json(err);
    }
}

exports.register = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPass,
        })
        const user = await newUser.save();
        res.redirect('/auth/login');
    }catch(err){
        res.status(500).json(err);
    }
    
}