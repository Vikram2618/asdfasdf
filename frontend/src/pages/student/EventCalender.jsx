import React from 'react';
import StudentSidebar from '../../components/sidebars/StudentSidebar';
import Calender from '../../components/Calender';

import StudentNavbar from '../../components/StudentNavbar';

const EventCalendar = () => {
    return (
        <div className='w-full'>
           <StudentNavbar/>

            <div className=' w-full h-[91vh] flex'>
                <StudentSidebar/>
                <div className=' w-[80%] bg-slate-300  text-white p-4 '>  {/*bg-[#1a1f25]*/}
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-2xl text-center text-neutral-950 font-semibold mb-6">Calendar</h1>
                        <Calender />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;

