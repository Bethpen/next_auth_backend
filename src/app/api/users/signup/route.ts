
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'


import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();


export const POST =async (request:NextRequest) => {
    try {
        const reqBody = await request.json();
        const {firstname, lastname, password, phone_number, email} = reqBody;

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await new User({
            firstname,
            lastname,
            password: hashedPassword,
            phone_number,
            email
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User successfully created",
            success: true
        }, {status: 201})


    } catch (error: any) {
            NextResponse.json({error: error.message}, {status: 500})
    }
}