import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="w-[20%] h-full py-6 bg-gray-900 text-white flex flex-col items-center space-y-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-gray-100 tracking-wide">Admin Panel</h2>

            <nav className="w-full flex flex-col space-y-4">
                <Link 
                    to="/admin/addstudent" 
                    className="w-[90%] py-3 text-lg font-medium text-gray-200 bg-gray-800 hover:bg-blue-600 hover:text-white transition-all rounded-md flex items-center justify-center shadow-md"
                >
                    Add Student
                </Link>

                <Link 
                    to="/admin/addteacher" 
                    className="w-[90%] py-3 text-lg font-medium text-gray-200 bg-gray-800 hover:bg-blue-600 hover:text-white transition-all rounded-md flex items-center justify-center shadow-md"
                >
                    Add Teacher
                </Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;
