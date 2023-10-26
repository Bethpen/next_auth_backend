
import { NextResponse } from 'next/server'

export const GET =async () => {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true
        }, {status: 200})

        //remove the token in cookies
        response.cookies.set("token", "", {httpOnly: true})

        return response;

    } catch (error: any) {
            NextResponse.json({error: error.message}, {status: 500})
    }
}