import UserModel from "../models/User.js"
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Register=async(req,res)=>{
    try {
          const {userName,email,password}=req.body
          if (!userName || !email || !password) {
            return res.status(303).json({success:true,message:" All faild are required"})
          }
          const ExiteingUser= await UserModel.findOne({email})
          if (ExiteingUser) {
            return res.status(303).json({success: true, message: "User already exists"});

            
          }
          const hasePassword= await bycript.hashSync(password,10)
           const NewUser= new UserModel({
            userName,email,password:hasePassword
           })
           await NewUser.save()
           res.status(200).json({success:true,message:"User Register Successfully",user:NewUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:true,message:" Internal server error"})
        
        
    }
}

// const Login=async(req,res)=>{
//     try {
//           const {email,password}=req.body
//           if (!email || !password) {
//             return res.status(303).json({success:true,message:" All faild are required"})
            
//           }
//           const FindeUser=await UserModel.findOne({email})
//            if (!FindeUser) {
//             return res.status(404).json({success:false,message:" User Not Found"})
            
//            }
//            const CheckPassword=await bycript.compare(password,FindeUser.password)
//            if (!CheckPassword) {
//             return res.status(404).json({success:true,message:" Invalid Password"})
            
//            }
//            const token= await jwt.sign({userId:FindeUser._id},process.env.SecriteKey,{expiresIn:"3d"})
//            res.cookie('token',token,{
//             httpOnly:true,
//             secure:false,
//             maxAge:3 * 24 * 3600 * 1000
//            })
//            res.status(200).json({success:true,message:"user login successfully",user:FindeUser,token})
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({success:true,message:" Internal server error"})
//     }
// }

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const FindeUser = await UserModel.findOne({ email });
    if (!FindeUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const CheckPassword = await bycript.compare(password, FindeUser.password);
    if (!CheckPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: FindeUser._id },
      process.env.SecriteKey,
      { expiresIn: "3d" }
    );

    // ✅ Cookie सेटिंग को environment के हिसाब से manage करो
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Render पर true होगा
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 दिन
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      user: FindeUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const Logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(200).json({success:true,message:" Log out Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:true,message:" Internal server error"})
    }
}
  const isLogin=async(req,res)=>{
    try {
        const userId=req.userId
        const user=await UserModel.findById(userId)
              if (!user) {
                return res.status(200).json({success:false,message:"User Not Logind",user,isLoggedIn:false})
              }
              res.status(200).json({success:true,message:"User is Login",user,isLoggedIn:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:true,message:" Internal server error",isLoggedIn:false})
    }
}



export {Register,Login,Logout,isLogin}