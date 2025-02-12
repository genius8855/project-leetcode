"use client";
import React from 'react';
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription';
import PlayGround from './PlayGround/PlayGround';
import EditorFooter from './PlayGround/PreferenceNav/EditorFooter';
import { Problem } from '@/utils/types/problem';

type WorkspaceProps = {
    problem:Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    
    return (
        <Split className='split h-screen'>
            <ProblemDescription problem = {problem} />
            <PlayGround problem = {problem} />
        </Split>
        // <EditorFooter />
    )
}
export default Workspace;