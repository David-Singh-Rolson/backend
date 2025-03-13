import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})
//http://localhost:3000/api/v1/users/register
export  default registerUser