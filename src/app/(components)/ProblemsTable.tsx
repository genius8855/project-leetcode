"use client";
import React, { useState } from 'react';
import { problems } from './Problems';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import { useEffect } from "react";
import { auth, fireStore } from '@/firebase/firebase';
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

type ProblemsTableProps = {

};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {

    const { solvedProblems } = useGetSolvedProblems();
    console.log(solvedProblems);

    const [data, setData] = useState<{ id: string;[key: string]: any }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(fireStore, "problems"), orderBy("order", "asc"));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(items);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
            }
        };

        fetchData();
    }, []);

    //   console.log(data);

    const [youtubePlayer, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: "",
    });

    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, videoId: "", });
    }

    return (
        <>
            {loading && (<div className="flex items-center justify-center h-screen">
                <span className="loader ml-80 mb-60"></span>
            </div>)
            }

            {!loading && <tbody className='text-white'>
                {data.map((problem, idx) => {
                    const difficultyColor =
                        problem.difficulty === "Easy"
                            ? "text-dark-green-s"
                            : problem.difficulty === "Medium"
                                ? "text-dark-yellow"
                                : "text-dark-pink";
                    return (
                        <tr className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={problem.id}>
                            {solvedProblems.includes(problem.id) ? (
                                <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                    <BsCheckCircle fontSize={"18"} width='18' />
                                </th>
                            )
                                :
                                (<th className='px-2 py-4 font-medium whitespace-nowrap text-gray-300-s'>
                                    <BsCheckCircle fontSize={"18"} width='18' />
                                </th>)
                            }

                            <td className='px-6 py-4'>

                                {problem.link ? (
                                    <Link
                                        href={problem.link} target='_blank'
                                        className='hover:text-blue-600 cursor-pointer'
                                    >
                                        {problem.title}
                                    </Link>
                                ) : (
                                    <Link
                                        className='hover:text-blue-600 cursor-pointer'
                                        href={`/problems/${problem.id}`}
                                    >
                                        {problem.title}
                                    </Link>
                                )}
                            </td>
                            <td className={`px-6 py-4 ${difficultyColor}`}>{problem.difficulty}</td>
                            <td className={"px-6 py-4"}>{problem.category}</td>
                            <td className={"px-6 py-4"}>
                                {problem.videoId ? (
                                    <AiFillYoutube
                                        fontSize={"28"}
                                        className='cursor-pointer hover:text-red-600'
                                        onClick={() =>
                                            setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })
                                        }
                                    />
                                ) : (
                                    <p className='text-gray-400'>Coming soon</p>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>}
            {
                youtubePlayer.isOpen && (<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                    <div
                        className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
                        onClick={closeModal}
                    ></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose
                                    fontSize={"35"}
                                    className='cursor-pointer absolute -top-16 right-0 hover:bg-red-500 transition ease-in-out rounded-full'
                                    onClick={closeModal}
                                />
                                <YouTube
                                    videoId={youtubePlayer.videoId}
                                    loading='lazy'
                                    iframeClassName='w-full min-h-[500px]'
                                />
                            </div>
                        </div>
                    </div>
                </tfoot>)
            }
        </>
    );
};
export default ProblemsTable;


function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
            if (!user) return;

            try {
                const userRef = doc(fireStore, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setSolvedProblems(userData.solvedProblems || []); // Defaults to an empty array
                }
            } catch (error) {
                console.error("Error fetching solved problems:", error);
            }
        };

        fetchSolvedProblems();
    }, [user]);

    return { solvedProblems };
}