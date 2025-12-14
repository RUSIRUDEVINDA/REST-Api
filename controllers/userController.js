const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// GET own profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE own profile
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// DELETE own account
exports.deleteProfile = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'Account deleted' });
  } catch (error) {
    next(error);
  }
};

//create new user
exports.createUser = async(req,res,next)=>{
    try{
        const{name,email,age} = req.body; //extracting name,email and age from req.body

        //minimal validation :name and email reequired for now
        if(!name||!email){
            return res.status(400).json({message:'name and email are required'})
        }
        //create and save
        const user = new User({name,email,age})
        await user.save();

        return res.status(201).json({message:'user created successfully',user})
    }catch(err){
        //handle duplicate email error(uniquie index)
        if (err.code ===11000 && err.keyPattern && err.keyPattern.email){
            return res.status(400).json({message:'Email already exists',err:err.message})
        }
        next(err) //forward to centralized error handler

    }
}

//get list of users

exports.getUsers = async(req,res,next)=>{
    try{
        const users = await User.find().sort({createdAt:-1});
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message : 'Error retrieving users',err:err.message})
    }
};

//get user by id

exports.getUserById = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: 'Error retrieving user',err:err.message})
    }
}

//update user by id

 exports.updateUser = async(req,res,next)=>{
    try{
        //runValidators ensure mongoose validate update data
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
        });
        if(!user)return res.status(404).json({message:'user not found'})
        res.json(user)
    }catch(err){
        //duplicate email on update
        if (err.code ===11000 && err.keyPattern && err.keyPattern.email){
            return res.status(400).json({message:'Email already exists',err:err.message})
        }
        next(err)
    }
    
};

//delete user by id

exports.deleteuser =  async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)return res.status(404).json({message:'user not found'});
        res.json({message:'User deleted'});
    }catch(err){
        next(err) 

    }
    
}





