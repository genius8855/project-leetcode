"use client";
import React, { useEffect, useState } from 'react';
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription';
import PlayGround from './PlayGround/PlayGround';
import EditorFooter from './PlayGround/PreferenceNav/EditorFooter';
import { Problem } from '@/utils/types/problem';
import Confetti from "react-confetti";
import useWindowSize from '../Hooks/useWindowSize';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type WorkspaceProps = {
    problem: Problem
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {

    const [user, loading] = useAuthState(auth);
    const { width, height } = useWindowSize();
    const [success, setSuccess] = useState(false);
    const [solved, setSolved] = useState(false);
    const router = useRouter();

    // UseEffect to Auto redirect to the authentication page if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth");
        }
    }, [user, loading, router]);

    // useEffect (() => {
    //     toast.success("Congratulations Sahil!")
    // },[success]);

    if(!user) return null;

    // if(success) {
    //     toast.success("Congrats! All Test Cases Passed");
    // }

    return (
        <Split className='split' minSize={0}>
            <ProblemDescription problem={problem} _solved={solved} />
            <div className='bg-dark-fill-2'>
                <PlayGround problem={problem} setSuccess={setSuccess} setSolved={setSolved} success={success} />
                {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
            </div>
        </Split>
    );
}
export default Workspace;