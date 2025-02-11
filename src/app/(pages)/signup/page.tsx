"use client";
import React, { use } from 'react';
import Navbar from '@/app/(components)/Navbar';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

type SignupProps = {

};

const page: React.FC<SignupProps> = () => {

    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
    const [createUserWithEmailAndPassword,user,loading,error,] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    useEffect(() => {
        if(error) alert(error.message);
    },[error]);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.displayName || !inputs.password) return alert("Please fill all fields!");
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/signin');
        } catch (error: any) {
            alert(error.message);
        }
    }

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center my-auto h-[80vh]'>
                <div className="bg-brand-orange-s shadow-lg rounded-2xl p-8 w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

                    <form className="space-y-4" onSubmit={handleRegister}>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-black">Email</label>
                            <input onChange={handleChangeInput}
                                name = "email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            />
                        </div>

                        {/* Name field */}
                        <div>
                            <label className="block text-sm font-medium text-black">Name</label>
                            <input onChange={handleChangeInput}
                                name = "displayName"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            />
                        </div>


                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-black">Password</label>
                            <input onChange={handleChangeInput}
                                name = "password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            />
                        </div>

                        {/* Sign up Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-orange text-white py-2 rounded-lg hover:bg-white hover:text-brand-orange hover:border-2 hover:border-brand-orange border-2 border-transparent
                            transition duration-300 ease-in-out"
                        >
                            {loading ? 'Registering..' : 'Register'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-black mt-6">
                        Already have an account?
                        <Link href="/signin" className="text-white font-medium hover:underline ml-1">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
}
export default page;