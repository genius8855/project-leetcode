"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For App Router
import { useSearchParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Logout from './Logout';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from './Timer';
import { problems } from './Problems';
import { Problem } from '@/utils/types/problem';
import useHasMounted from './Hooks/useHashMounted';

type TopbarProps = {
    problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {


    const [user] = useAuthState(auth);
    const router = useRouter();
    const searchParams = useSearchParams();
    // const [loader,setLoader] = useState(false);

    const viewProfile = () => {
        router.replace('/profile');
    }

    const handleProblemChange = (isForward: boolean) => {
        console.log(problems)
    
        if (!searchParams) {
            console.error("Search params are not available.");
            return;
        }
    
        const pid = searchParams.get('pid'); // Get current problem ID from query
    
        if (!pid) {
            console.error("Problem ID (pid) is missing.");
            return;
        }
    
        // Filter problems to only include those with order 1-5
        const filteredProblems = problems.filter((problem) => problem.order >= 1 && problem.order <= 5);
    
        // Using a Map to lookup the problem by its ID, which is more optimized
        const problemMap = new Map(filteredProblems.map((problem) => [problem.id, problem]));
    
        // Check if the current problem exists in the filtered problems
        const currentProblem = problemMap.get(pid as string);
    
        if (!currentProblem) {
            console.error("Problem not found within range 1-5:", pid);
            return;
        }
    
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = currentProblem.order + direction;
    
        // Find the next problem within the range using the order
        const nextProblem = filteredProblems.find((problem) => problem.order === nextProblemOrder) || 
                            filteredProblems.find((problem) => problem.order === (isForward ? 1 : 5));
    
        if (nextProblem) {
            // Use router.push for navigation
            router.push(`/problems/${nextProblem.id}`);
        }
    };



    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7  '>
            <div className={`flex w-full items-center justify-between  ${!problemPage ? "max-w-[1200px] mx-auto" : "px-2 md:px-4"}`}>
                <Link href='/' className='h-[22px] flex-1 '>
                    <img src='/logo-full.png' alt='Logo' className='h-full' />
                </Link>

                {problemPage && (
                    <div className='flex items-center gap-4 flex-1 justify-center'>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(false)}
                        >
                            <FaChevronLeft />
                        </div>
                        <Link
                            href='/'
                            className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
                        >
                            <div>
                                <BsList />
                            </div>
                            <p>Problem List</p>
                        </Link>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(true)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                )}

                <div className='flex items-center space-x-4 flex-1 justify-end'>
                    <div>
                        <a
                            href=''
                            target='_blank'
                            rel='temp'
                            className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2 '
                        >
                            Premium

                        </a>
                    </div>

                    {problemPage && user && (
                        <Timer />
                    )}


                    {!user && (
                        <Link href='/auth'>
                            <button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded'>Sign In</button>
                        </Link>
                    )}

                    {user && (
                        <div className='cursor-pointer group relative' onClick={viewProfile}>
                            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                            {/* <div
                                className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
                            >
                                <p className='text-sm'>{user.email} </p>
                            </div> */}
                        </div>
                    )}

                    {user && (
                        <Logout />
                    )}

                </div>
            </div>
        </nav>
    );
}
export default Topbar;