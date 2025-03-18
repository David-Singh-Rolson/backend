import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async (req,res)=>{
    // get user details from frontend
    //validation -not empty
    // check if user already exists:username, email
    // check for images, avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    console.log("PASSD",req.files);
    
    const {fullname,email,username,password}=req.body
    // console.log("email",email);

    // if (fullname==="") {
    //     throw new ApiError(400,"Fullname is required")
    // }

    if (
        [fullname,email,username,password].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    
    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }
    
    // const avatarLocalPath=req.files?.avatar[0]?.path;
    const avatarLocalPath=req.files?.avatar[0]?.path;
    console.log("hii",avatarLocalPath);
    
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) {
        coverImageLocalPath=req.files.coverImage[0].path
    }
    

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // return res.send(avatarLocalPath);

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const cover=await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is req")
        // res.send(avatarLocalPath);
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:cover?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})
//http://localhost:3000/api/v1/users/register
export  default registerUser