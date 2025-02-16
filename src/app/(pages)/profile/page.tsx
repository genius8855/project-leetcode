"use client";
import React, { PureComponent, useEffect, useState } from 'react';
import Topbar from '@/app/(components)/Topbar';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Tooltip, Legend } from "recharts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


type pageProps = {

};

const page: React.FC<pageProps> = () => {

    const { solvedProblems, likedProblems, dislikedProblems, starredProblems, userName, userEmail } = useGetUserData();
    const [user, loading] = useAuthState(auth);

    // const user = {
    //     name: "John Doe",
    //     email: "johndoe@example.com",
    //     solved: 120,
    //     easySolved: 50,
    //     mediumSolved: 40,
    //     hardSolved: 0,
    //     likedProblems: [],
    //     dislikedProblems: ["Graph Traversal"],
    //     starredProblems: ["Dijkstra's Algorithm"],
    //     solvedProblems: ["Palindrome Number", "Merge Intervals", "LRU Cache"],
    // };

    const difficulty = {
        "two-sum": "Easy",
        "reverse-linked-list": "Hard",
        "jump-game": "Medium",
        "valid-parentheses": "Easy",
        "search-a-2d-matrix": "Medium",
        "container-with-most-water": "Medium",
        "merge-intervals": "Medium",
        "maximum-depth-of-binary-tree": "Easy",
        "best-time-to-buy-and-sell-stock": "Easy",
        "subsets": "Medium",
    };

    const count = { Easy: 0, Medium: 0, Hard: 0 };
    const router = useRouter();

    solvedProblems.forEach(problem => {
        const level = difficulty[problem];
        if (level) count[level]++;
    });
    const notSolved = (10 - (count["Easy"]+count["Medium"]+count["Hard"]));

    const data = [
        { name: "Easy", value: count["Easy"], color: "#4CAF50" },
        { name: "Medium", value: count["Medium"], color: "#FFC107" },
        { name: "Hard", value: count["Hard"], color: "#F44336" },
        {name: "Not Solved", value: notSolved, color: "#4b5563"},
    ];

    const goToWorkspace = () => {
        router.push(`problems/{problem}`);
    }

    useEffect(() => {
        if (!loading && !user) {
          router.replace("/auth"); 
        }
      }, [user, loading, router]);

    


    return (<div className='h-screen '>
        <Topbar />
        <div className="min-h-screen bg-dark-layer-2 text-white p-8 flex items-center justify-center">

            {/* Right Side - User Info */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-2/3 space-y-8"
            >
                <div className="bg-dark-layer-1 p-8 rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h1 className="text-4xl font-extrabold">{userName}</h1>
                    <p className="text-gray-300 text-lg mt-2">{userEmail}</p>
                </div>

                {/* Pie Chart */}
                <div className="flex justify-center">
                    <PieChart width={300} height={300}>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {[
                    { title: "Liked Problems", problems: likedProblems },
                    { title: "Starred Problems", problems: starredProblems },
                    { title: "Disliked Problems", problems: dislikedProblems },
                ].map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="w-full bg-dark-layer-2 p-6 rounded-xl shadow-xl border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                        {
                            section.problems.length === 0 ? (
                                <div className=' text-gray-600 pl-1'>
                                    {index === 0 ? "You have not liked any problem" : index === 1 ? "You have not starred any problem" : "You have not disliked any problem"}
                                </div>
                            )
                                :
                                (
                                    <ul className="mt-3 space-y-2">
                                        {section.problems.map((problem, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-dark-layer-1 p-4  rounded-tr-full rounded-bl-full shadow-md hover:bg-gray-600 transition text-center text-lg cursor-pointer"
                                                onClick={goToWorkspace}
                                            >
                                                {problem}
                                            </motion.li>
                                        ))}
                                    </ul>
                                )
                        }
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </div>
    );
}
export default page;

function useGetUserData() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [likedProblems, setLikedProblems] = useState<string[]>([]);
    const [starredProblems, setStarredProblems] = useState<string[]>([]);
    const [dislikedProblems, setDislikedProblems] = useState<string[]>([]);
    const [userName, setUserName] = useState('User');
    const [userEmail, setUserEmail] = useState('user@gmail.com');
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
            if (!user) return;

            try {
                const userRef = doc(fireStore, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setSolvedProblems(userData.solvedProblems || []);
                    setDislikedProblems(userData.dislikedProblems || []);
                    setStarredProblems(userData.starredProblems || []);
                    setLikedProblems(userData.likedProblems || []);
                    setUserEmail(userData.email || 'user@gmail.com');
                    setUserName(userData.displayName || 'User');
                }
            } catch (error) {
                console.error("Error fetching users data", error);
            }
        };

        fetchSolvedProblems();
    }, [user]);

    return { solvedProblems, likedProblems, dislikedProblems, starredProblems, userName, userEmail };
}