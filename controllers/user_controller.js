import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js";
import { loginValidator, updateUserValidator, userValidator } from "../validators/user_validator.js";

//User signup

export const signup = async(req, res, next) => {
    //check if user exits
   try {
    const {error, value} = userValidator.validate(req.body);
    if(error){
      return res.status(400).send(error.details[0].message)
    }
    //Check if udser exits
     const email = value.email
     console.log('email', email)
 
     const findIfUserExist = await UserModel.findOne({email})
     if(findIfUserExist){
         return res.status(401).send('User already exists')
     }else{
         const hashedPassword = await bcrypt.hash(value.password, 12)
         value.password = hashedPassword
         //create user
         await UserModel.create(value)
 
         return res.status(201).send({message: 'User created successfully'})  
     }
   } catch (error) {
    next(error)
   }
}

//User login token
export const login = async (req, res, next) => {
    try {
      //Validate a login
      const { value, error } = loginValidator.validate(req.body);
      if (error) {
        return res.status(422).json(error);
    }
      const {email, username, password} = req.body;
         //Find a user using their unique identifier
      const user = await UserModel.findOne({
          $or:[
              {email: email},
              {username: username},
            ]
      })
      if(!user){
          return res.status(401).json('No user found')
      }else{
          //Verify password
          const correctPassword = bcrypt.compareSync(req.body.password, user.password);
         if(!correctPassword){
          res.status(401).json('Invalid credentials');
         }else{
           //Generate a token
           const token = jwt.sign (
              {id: user.id}, 
              process.env.JWT_PRIVATE_KEY,
              {expiresIn: '24h'},
            );
            res.status(200).json({
              message: 'User logged in successfully',
              accessToken: token
            })
         }
          
      }
    } catch (error) {
      next(error)
    }
}

//logout user
export const logout = async (req, res, next) => {
  //Destroy
  try {
    await req.session.destroy();
    //Return response
    res.status(200).json("User logged out")
  } catch (error) {
    next(error)
  }
}

//Get a user details by username
export const getByUsername = async(req, res, next) =>{
  
  try {
    const username = req.params.username.toLowerCase()
  
    //Use populate to get the user details
    const userDetails = await UserModel.findOne({username}).select("-password")
    .populate({
      path: "favourites"
    })
  
    return res.status(201).json({user: userDetails})
  } catch (error) {
    next(error)
  }
}
 
//Get a user 


// Get a single user
export const getOneUser = async (req, res, next) => {

  const id = req.session?.user?.id || req?.user.id
  try {
    // Find user by ID
    const user = await UserModel.findById(id)
    .select({password: false});

    if (!user) {
      return res.status(404).json('User not found!');
    }

    // Return user
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Update a user
export const updateUser = async (req, res, next) => {
  try {
    const {value, error} = updateUserValidator.validate(req.body)
    if (error) {
      return res.status(422).json(error);
  }

  const id = req.session?.user?.id || req?.user.id
    // Find user by ID
    const user = await UserModel.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!user) {
      return res.status(404).json('User not found!');
    }

    // Return updated user
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    //Ensure user is not deleting themselves
    if(id === req.params.id) {
      return res.status(409).json('Cannot Delete Self');
    }
      // Delete user
      await UserModel.findByIdAndDelete(req.params.id);
      // Return response
      res.status(200).json('User Deleted!');
  } catch (error) {
      next(error);
  }
}