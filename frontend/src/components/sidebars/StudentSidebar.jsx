import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, Users, MessagesSquare, User, LogOut, X } from "lucide-react";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        { icon: Bell, text: 'Notice Board', active: false, link: '/student/notice' },
        { icon: Calendar, text: 'Event Calendar', active: false, link: '/student/event' },
        { icon: Users, text: 'Project Partner', active: false, link: '' },
        { icon: MessagesSquare, text: 'Message', active: false, link: '/student/message' },
        { icon: User, text: 'Group Message', active: false, link: '/student/groupmessage' },
    ];

    return (
        <div className="bg-gray-900 w-[20%] h-screen py-6 flex flex-col items-center justify-between shadow-lg">
            {/* Navigation */}
            <nav className="w-full space-y-2">
                {menuItems.map((item, index) => (
                    <Link 
                        to={item.link}
                        key={index}
                        onClick={item.text === "Project Partner" ? () => setOpen(true) : undefined}
                        className={`w-[90%] flex items-center gap-4 px-5 py-3 text-lg font-medium rounded-md transition-all ${
                            item.active
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.text}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="w-full px-6">
                <Link 
                    className="w-full flex items-center gap-3 text-gray-300 hover:bg-red-600 hover:text-white py-3 px-4 text-lg font-medium rounded-md transition-all" 
                    to={'/'}
                >
                    <p>Logout</p> 
                    <LogOut />
                </Link>
            </div>

            {/* Popup Modal for Project Partner */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-gray-200">
                        <div className="flex justify-between items-center mb-4 relative">
                            <h2 className="text-xl font-semibold">Project Options</h2>
                            <button onClick={() => setOpen(false)} className="p-2 absolute -top-4 -right-4">
                                <X className="text-white" size={20} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-3 py-2">
                            <Link to={'/student/projectpartner/viewproject'} 
                                className="border border-gray-600 text-center hover:bg-indigo-600 p-2 rounded transition-all"
                            > View Projects</Link>
                            <Link to={'/student/projectpartner/creatingproject'} 
                                className="border border-gray-600 text-center hover:bg-indigo-600 p-2 rounded transition-all"
                            >Create Project</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
