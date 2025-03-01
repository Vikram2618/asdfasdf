import React, { useContext } from 'react';
import StudentSidebar from '../../components/sidebars/StudentSidebar';
import StudentNavbar from '../../components/StudentNavbar';
import { StudentContext } from '../../context/student.context';

const StudentPage = () => {

    const { studentData } = useContext(StudentContext);

    return (
        <div className='w-full'>
           <StudentNavbar studentName={studentData?.studentName} studentClass={studentData?.studentClass}/>

            <div className=' w-full h-[91vh] flex'>
                <StudentSidebar/>
                
                <div className='w-[80%]  flex items-center justify-center'>
                    <p className="text-gray-600">Select an option from the sidebar to get started</p>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;




//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">Campus</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-600 hover:text-gray-900">
//                 <RiDashboardLine className="h-6 w-6" />
//               </button>
//               <button className="text-gray-600 hover:text-gray-900">
//                 <FaBell className="h-5 w-5" />
//               </button>
//               <div className="h-8 w-8 rounded-full bg-gray-200"></div>
//             </div>
//           </div>
//         </div>
//       </header>
