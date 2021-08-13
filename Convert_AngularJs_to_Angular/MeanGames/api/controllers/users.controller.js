const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

const User = mongoose.model("User");

module.exports.registerUser = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      const newUser = {
        userName: req.body.userName,
        name: req.body.name,
        password: hashedPassword,
      };

      console.log('user',newUser)
      User.create(newUser, (err, createdUser) => {
        const response = {
          status: 201,
          message: createdUser,
        };
        console.log('createdUser',createdUser)
        if (err) {
          response.status = 400;//user error
           response.message = err;
        }
        console.log(response.message)
        res.status(response.status).json(response.message);
      });
    });
  });
};

module.exports.logIn = (req, res) => {
  const currentUser = {
    userName: req.body.userName,
    password: req.body.password,
  };

  console.log('trying to login')
  User.findOne({ userName: currentUser.userName }).exec((err, user) => {
    const response = {
      status: 200,
      message: user,
    };
    if (err) {
      (response.status = 500), (response.message = err);
    }
    if (response.status !== 200) {
      res.status(response.status).json(response.message);
    } else {
      if (user) {
        bcrypt.compare(currentUser.password, user.password, (err, same) => {
          if (err) {
            response.status = 400; // user error
            response.message = err;
          }
          console.log("error:", err, "same:", same);
          if (!same) {
            response.status = 401; //unauthorized access
            response.message = "Unauthorized access";
          }
          else{
              let token=jwt.sign({userName:user.userName},process.env.PASS_PHRASE,{expiresIn:3600});
              response.message={
                  success:true,
                  token:token,
              }
          }
          res.status(response.status).json(response.message);
        });
      } else {
        response.status = 400; //bad request
        response.message = `user name or password is incorrect`;

        res.status(response.status).json(response.message);
      }
    }
  });
};




module.exports.authenticate = function(req,res,next){
    const headerExists = req.headers.authorization;
    if(headerExists){
      console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        console.log('token:',token)
        jwt.verify(token,process.env.PASS_PHRASE,(err,decodedToken)=>{
            if(err){
                console.log('jwt verify error',err);
                res.status(401).json({message:'Unauthorized'});
            }
            else{
                next();
            }
        })
    }else{
        res.status(403).json({message:'Token missing'}) //403 ->forbidden
    }
}