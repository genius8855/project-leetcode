"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/(components)/Navbar';
import Link from 'next/link';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ForgetPasswordProps = {

};

const page: React.FC<ForgetPasswordProps> = () => {

    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    const router = useRouter();

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await sendPasswordResetEmail(email);
        if (success) toast.success("Password reset email Sent!");
        if(error) toast.error("Something Went Wrong");
    };

    useEffect(() => {
        if (error) alert(error.message);
    }, [error])

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <ToastContainer />
            <Navbar />
            <div className='flex items-center justify-center my-auto h-[80vh]'>
                <div className="bg-brand-orange-s shadow-lg rounded-2xl p-8 w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

                    <form className="space-y-4" onSubmit={handleReset}>
                        <p className='text-sm text-black text-center'>
                            Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
                            to reset it.
                        </p>
                        {/* Email Field */}
                        <div>

                            <input
                                type="email"
                                name='email'
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* reset Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-orange text-white py-2 rounded-lg hover:bg-white hover:text-brand-orange hover:border-2 hover:border-brand-orange border-2 border-transparent
                            transition duration-300 ease-in-out"
                        >
                            Send
                        </button>
                    </form>

                </div>
            </div>
        </div>
    </div>
}
export default page;