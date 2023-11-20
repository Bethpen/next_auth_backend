
import { NextRequest, NextResponse } from 'next/server'


import connect from "@/dbConfig/dbConfig";
import Subscriber from "@/models/subscriberModel";


connect();


export const POST =async (request:NextRequest) => {
    try {
        const reqBody = await request.json();
        const {name, email} = reqBody;

        if(!email){
            return NextResponse.json({message: "Please enter your valid email address"}, {status: 400})
        }

        const user = await Subscriber.findOne({email});

        if(user){
            return NextResponse.json({message: "You are already on our list"}, {status: 400})
        }

        const newSubscriber = await new Subscriber({
            name,
            email
        })

        const savedUser = await newSubscriber.save();

        return NextResponse.json({
            message: "You have been added to our wait list successfully",
            success: true
        }, {status: 201})


    } catch (error: any) {
            NextResponse.json({message: error.message}, {status: 500})
    }
}