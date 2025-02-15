"use client";
import React, { PureComponent } from 'react';
import Topbar from '@/app/(components)/Topbar';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

type pageProps = {

};

const page: React.FC<pageProps> = () => {

    const solved = 745;
    const total = 3455;
    const attempting = 70;
    const easySolved = 334, easyTotal = 858;
    const mediumSolved = 383, mediumTotal = 1796;
    const hardSolved = 28, hardTotal = 801;

    const data = [
        { value: easySolved, color: "#17c1e8" },
        { value: mediumSolved, color: "#f8b400" },
        { value: hardSolved, color: "#eb5757" },
        { value: attempting, color: "#bdbdbd" }
    ];

    return (<>
    <Topbar />
        <div className='min-h-screen bg-dark-layer-2 flex flex-col items-center justify-center overflow-hidden'>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-[400px]">
                {/* Circular Progress Chart */}
                <div className="relative flex flex-col items-center">
                    <PieChart width={150} height={150}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-xl font-semibold">
                        {solved} / {total}
                        <span className="text-green-500 text-sm">✔ Solved</span>
                    </div>
                </div>

                {/* Right Side Stats */}
                <div className="flex flex-col gap-3 w-full">
                    <div className="bg-gray-100 p-3 rounded-lg text-sm text-center">
                        <span className="text-cyan-500 font-semibold">Easy</span>
                        <div>{easySolved} / {easyTotal}</div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm text-center">
                        <span className="text-yellow-500 font-semibold">Med.</span>
                        <div>{mediumSolved} / {mediumTotal}</div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm text-center">
                        <span className="text-red-500 font-semibold">Hard</span>
                        <div>{hardSolved} / {hardTotal}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default page;