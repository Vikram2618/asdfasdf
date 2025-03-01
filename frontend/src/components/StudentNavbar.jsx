import React from 'react';
import { Link } from 'react-router-dom';
import user from '../assets/user.png';
import { LayoutDashboard } from "lucide-react";

const StudentNavbar = (prop) => {
    return (
        <header className="w-full h-14  px-8 py-4 flex items-center justify-center">
            <nav className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Campus</h1>
                <div className="flex items-center justify-center gap-7">
                    <a href="" className="hover:underline">Chat</a>
                    <a href="" className="hover:underline">Notice</a>
                    <Link to={'/'} className="hover:underline"> <LayoutDashboard/> </Link>
                    <div className='ml-4 -mr-2'>
                        <p className=' capitalize '>-{prop.studentName}</p>
                        <p className='text-xs text-gray-400 ml-2'>{prop.studentClass}</p>
                    </div>
                    <Link to={'/student/id'} className="border-4 border-gray-500 rounded-full hover:border-gray-800">
                        <img className='w-9' src={user}  />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default StudentNavbar;