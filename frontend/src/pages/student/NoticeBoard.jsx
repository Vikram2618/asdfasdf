import React from 'react';
import StudentSidebar from '../../components/sidebars/StudentSidebar';

import StudentNavbar from '../../components/StudentNavbar';
import StudentNoticePage from '../../components/StudentNoticePage';

const NoticeBoard = () => {
    return (
        <div className='w-full'>
           <StudentNavbar/>

            <div className=' w-full h-[92vh]  flex'>
                <StudentSidebar/>
                <div className='overflow-y-scroll w-[80%] bg-slate-300 h-full flex items-center justify-center'>
                    <StudentNoticePage/>
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;