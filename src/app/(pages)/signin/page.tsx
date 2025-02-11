"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/(components)/Navbar';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

type SigninProps = {

};

const page: React.FC<SigninProps> = () => {

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    useEffect(() => {
        if (error) alert(error.message);
    }, [error]);
    

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please fill all fields!");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (error: any) {
            alert(error.message);
        }
    }

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center my-auto h-[80vh]'>
                <div className="bg-brand-orange-s shadow-lg rounded-2xl p-8 w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-black">Email</label>
                            <input onChange={handleChangeInput}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-black">Password</label>
                            <input onChange={handleChangeInput}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            />
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-orange text-white py-2 rounded-lg flex justify-center items-center hover:bg-white hover:text-brand-orange hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-300 ease-in-out"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2 text-black" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="14" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                                    </svg>
                                    Signing...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-black mt-6">
                        Don't have an account?
                        <Link href="/signup" className="text-white font-medium hover:underline ml-1">
                            Sign up
                        </Link>
                    </p>
                    <div className='items-center text-center pt-2'>
                        <Link href="/forget-password" className="text-white font-medium hover:underline ml-1 items-center ">
                            Forgot Pasword?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default page;