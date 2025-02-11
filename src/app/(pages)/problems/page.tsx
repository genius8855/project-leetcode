import Topbar from '@/app/(components)/Topbar';
import Workspace from '@/app/(components)/Workspace/Workspace';
import React from 'react';

type ProblemPageProps = {

};

const ProblemPage: React.FC<ProblemPageProps> = () => {

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Topbar problemPage />
            <Workspace />
        </div>
    );
}
export default ProblemPage;