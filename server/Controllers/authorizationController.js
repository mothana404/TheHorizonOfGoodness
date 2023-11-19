const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();


const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().min(9).max(14).required(),
});

function validation(username, email, password, phoneNumber) {
  const valid = schema.validate({ username, email, password, phoneNumber });
  if (valid.error == undefined) {
    return true;
  } else {
    console.log(valid.error);
    return false;
  }

};

async function createUser(req, res) {
  try {
    const { username, email, password, phoneNumber, age, user_location } =
      req.body;
    const valid = validation(username, email, password, phoneNumber);
    const serach = await User.findOne({ email : email });

    if (serach != undefined || serach != null){
        res.status(400).json("this email is already have an account");
    }else{
        if (valid){
            console.log(valid)
            let user_password = await bcrypt.hash(password, 10);
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = user_password;
            newUser.phoneNumber = phoneNumber;
            newUser.age = age;
            newUser.user_location = user_location
            newUser.save();
            const accessToken = jwt.sign({id : newUser.id, email : newUser.email, role: newUser.role}, process.env.SECRET_KEY, {expiresIn: '4h'});
            res.cookie('accessToken', accessToken, { httpOnly: true });
            // res.render('homepageView.ejs', {newUser, accessToken});
            res.status(200).json({newUser, accessToken});
        }else {
            res.status(400).json("Invalid input");
        }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in user model createUser" });
  }
}

async function loginUser (req, res){

    try {
      const { email, password } = req.body;
      const valid = validation("username", email, password, "12345678910");
      if (valid){
        const theUser = await User.findOne({ email : email });
          if (theUser && theUser.email === email) {
                bcrypt.compare(password , theUser.password, (error, result) => {
                if (error) {
                    res.status(400).json(error);
                } else if (result) {
                    const accessToken = jwt.sign({id : theUser.id, email : theUser.email, role: theUser.role}, process.env.SECRET_KEY, {expiresIn: '4h'});
                    res.cookie('accessToken', accessToken, { httpOnly: true });

                    res.status(200).json({theUser, accessToken});
                    // res.render('homepageview.ejs', {accessToken});
                } else {
                    res.status(400).json('incorrect password');
                }
                });
          }else {
            res.status(401).json({ error: 'Email not found' });
          }

    } else {
      res.status(400).json("Invalid inputs");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Email not found" });
  }
};

async function updateuser(req, res){
    try{
        const id = '655a0636579c5a2037e02f7c';
        const {username, email, phoneNumber, age, user_location} = req.body;
        const updateUser = await User.findById(id);
        console.log(updateUser)
        updateUser.username = username;
        updateUser.email = email;
        updateUser.phoneNumber = phoneNumber;
        updateUser.age = age;
        updateUser.user_location = user_location;
        updateUser.save();
        res.status(201).json("user updates successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Email not found" });
  }
};

module.exports = {
  createUser,
  loginUser,

  updateuser
};
