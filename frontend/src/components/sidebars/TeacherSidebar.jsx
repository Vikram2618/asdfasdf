import React from 'react';
import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
    return (
        <div className="w-[20%] h-screen py-6 bg-gray-900 flex flex-col items-center justify-start shadow-lg">
            {/* Header */}
            <p className="text-white text-xl font-semibold mb-6">Teacher</p>
           
            {/* Navigation Links */}
            <Link 
                to={'/teacher/notice'} 
                className="w-[90%] flex items-center justify-center text-lg font-medium text-gray-300 px-5 py-3 rounded-md transition-all hover:bg-gray-700 hover:text-white"
            >
                Notice Board
            </Link>

            <Link 
                to={'/teacher/event'} 
                className="w-[90%] flex items-center justify-center text-lg font-medium text-gray-300 px-5 py-3 rounded-md transition-all hover:bg-gray-700 hover:text-white"
            >
                Event Calendar
            </Link>

            <Link 
                to={'/teacher/message'} 
                className="w-[90%] flex items-center justify-center text-lg font-medium text-gray-300 px-5 py-3 rounded-md transition-all hover:bg-gray-700 hover:text-white"
            >
                Message
            </Link>
        </div>
    );
};

export default TeacherSidebar;
