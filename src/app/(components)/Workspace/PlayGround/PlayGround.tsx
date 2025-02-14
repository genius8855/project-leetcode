"use client";
import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript"
// import {cpp} from "@codemirror/lang-cpp"
import EditorFooter from './PreferenceNav/EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/utils/problems';
import { pid } from 'process';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlayGroundProps = {
    problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayGround:React.FC<PlayGroundProps> = ({problem, setSuccess, setSolved}) => {

	const [activeTestCase,setActiveTestCase] = useState(0);
	let [userCode, setUserCode] = useState(problem.starterCode);
	const [user] = useAuthState(auth);
	const {
		query: {pid},
	} = useRouter();

	const handleSubmit = async () => {
		if(!user) {
			toast.error("Please Login To Submit Code",{position: "top-center", autoClose: 3000, theme:'dark'});
			return;
		}
		try{
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;
			if(typeof handler === "function") {
				const success = handler(cb);
				if(success) {
					toast.success("Congrats! All test cases passed",{
						position: "top-center",
						theme: 'dark',
						
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
					const userRef = doc(fireStore,"users",user.uid);
					await updateDoc(userRef,{solvedProblems:arrayUnion(pid)});
					setSolved(true);
				}
			}
		}catch(error: any){
			toast.error("Error while submitting the code");
		}
	}

	const changeCode = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`,JSON.stringify(value));
	}

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if(user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		}
		else {
			setUserCode(problem.starterCode);
		}
	},[pid,user,problem.starterCode]);
    
    return (
        <div className='flex flex-col bg-dark-layer-1 relative'>
            <PreferenceNav />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{fontSize: 16}}
						onChange={changeCode}
						//dummy push
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					<div className='flex'>
						{problem.examples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={example.id}
								onClick={() => setActiveTestCase(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCase === index ? "text-white" : "text-gray-500"}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCase].inputText}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCase].outputText}
						</div>
					</div>
				</div>
            </Split>
            <EditorFooter handleSubmit = {handleSubmit} />
        </div>
    )
}
export default PlayGround;