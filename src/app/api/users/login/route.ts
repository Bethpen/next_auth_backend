
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();


export const POST =async (request:NextRequest) => {
    try {
        const reqBody = await request.json();
        const {password, phone_number} = reqBody;

        console.log(reqBody);
        
        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt)
        
        const foundUser = await User.findOne({phone_number});
        
        if(!foundUser){
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }
        
        const validpassword = await bcryptjs.compare(password, foundUser.password)

        if(!validpassword){
            return NextResponse.json({error: "You have entered a wrong password"}, {status: 400})
        }

        

        //create token data
        const tokenData = {
            id: foundUser._id,
            email: foundUser.email,
            phone_number: foundUser.phone_number
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        return NextResponse.json({
            message: "Login Successful",
            token,
            user: {
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,
                email: foundUser.email,
                phone_number: foundUser.phone_number
            }
        }, {status: 200})

        // //add the token to cookies
        // response.cookies.set("token", token, {httpOnly: true})

    } catch (error: any) {
            NextResponse.json({error: error.message}, {status: 500})
    }
}

export const GET =async () => {
    try {

        const users = await User.find({}, 'firstname lastname email phone_number');

        if(!users){
            return NextResponse.json({error: "No user found"}, {status: 400})
        }

        console.log(users)

        return NextResponse.json({
            message: "Users fetched successfully",
            users,
            success: true
        }, {status: 200})


    } catch (error: any) {
            NextResponse.json({error: error.message}, {status: 500})
    }
}