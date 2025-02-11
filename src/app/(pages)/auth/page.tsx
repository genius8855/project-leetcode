"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/(components)/Navbar';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [pageLoading,setPageLoading] = useState(true);
    const [user,error,loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push('/');
        if(!user && !loading) setPageLoading(false);
    },[user,router,loading]);

    if(pageLoading) return null;
    
    return <div  className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center my-auto h-[80vh]'>
                <Image src='/hero.png' alt = 'Hero Image' height={700} width={700}/>
            </div>
        </div>
    </div>
}
export default page;