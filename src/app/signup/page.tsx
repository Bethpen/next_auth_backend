"use client"

import React from 'react'
import axios from 'axios'

const Signup = () => {
    const user = {
        firstname: "john",
        lastname: "Doe",
        email: "jd@gmail.com",
        phone_number: "07078863194",
        password: "malleablke"
    }
    const signUp = async () => {
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log(response.data);


        } catch (error) {
            console.log("sign up failed", error);

        }
    }
    return (
        <>
            <div className='text-3xl'>Signup</div>
            <button onClick={signUp}> Send your setails to register</button>
        </>
    )
}

export default Signup