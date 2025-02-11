"use client";
import React from 'react';
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription';
import PlayGround from './PlayGround/PlayGround';
import EditorFooter from './PlayGround/PreferenceNav/EditorFooter';

type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return (
        <Split className='split h-screen'>
            <ProblemDescription />
            <PlayGround />
        </Split>
        // <EditorFooter />
    )
}
export default Workspace;