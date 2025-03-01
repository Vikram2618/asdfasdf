import React, { useContext, useEffect, useState } from 'react';
import { MessageCircle, Send, HelpCircle, User, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import StudentNavbar from '../../components/StudentNavbar';
import { StudentContext } from '../../context/student.context';
import axiosInstance from '../../config/axios';

function Message() {
  // const [users] = useState([
  //   {
  //     id: 1,
  //     name: "Sarah Chen",
  //     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  //     status: 'online'
  //   },
  //   {
  //     id: 2,
  //     name: "Alex Morgan",
  //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  //     status: 'offline',
  //     lastSeen: new Date(Date.now() - 3600000)
  //   },
  //   {
  //     id: 3,
  //     name: "David Kim",
  //     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  //     status: 'online'
  //   },
  //   {
  //     id: 4,
  //     name: "Emma Wilson",
  //     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  //     status: 'online'
  //   }
  // ]);



  const [messages] = useState([
    {
      id: 1,
      text: "Hey there! How's it going?",
      sender: "Sarah Chen",
      timestamp: new Date(Date.now() - 3600000),
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      recipientId: 0
    },
    {
      id: 2,
      text: "I'm doing great! Just finished that project we discussed.",
      sender: "Current User",
      timestamp: new Date(Date.now() - 1800000),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      recipientId: 1
    },
    {
      id: 3,
      text: "Hey Alex, did you get my email about the meeting?",
      sender: "Current User",
      timestamp: new Date(Date.now() - 900000),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      recipientId: 2
    },
    {
      id: 4,
      text: "Yes, I'll review it and get back to you soon!",
      sender: "Alex Morgan",
      timestamp: new Date(Date.now() - 600000),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      recipientId: 0
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [students, setStudents] = useState([]);

  const { studentData } = useContext(StudentContext);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
        try {
            const res = await axiosInstance.get("/student/getStudent");
            setStudents(res.data.student); 
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    fetchStudents();
}, []);

  const users = students;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "Current User",
        timestamp: new Date(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        recipientId: selectedUser.id
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const filteredUsers = users.filter(user => 
    user.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Filter messages for the selected user
    const userMessages = messages.filter(message => 
      (message.recipientId === user.id && message.sender === "Current User") ||
      (message.recipientId === 0 && message.sender === user.name)
    );
    setChatMessages(userMessages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StudentNavbar studentName={studentData?.studentName} studentClass={studentData?.studentClass}/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-lg h-[calc(100vh-10rem)] flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            
            {/* Users List */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4 scrollbar-hide">
              {filteredUsers.filter(user => user.studentName.toLowerCase() !== studentData?.studentName.toLowerCase()).map(user => (

                    <div 
                      key={user._id} 
                      onClick={() => handleUserSelect(user)}
                      className={`flex bg-gray-100 items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedUser?._id === user._id 
                      ? 'bg-indigo-50 border border-indigo-100' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <div className="relative">
                    <img
                      src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
                      alt={user.studentName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {/* <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} /> */}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 capitalize">{user.studentName}</h3>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-lg shadow-lg h-[calc(100vh-10rem)] flex flex-col">
            {selectedUser ? (
              <>
                {/* Selected User Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
                      alt={selectedUser.studentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">{selectedUser.studentName}</h3>
                      {/* <p className="text-sm text-gray-500">
                        {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                      </p> */}
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 mb-6 ${
                        message.sender === "Current User" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`flex flex-col ${
                          message.sender === "Current User" ? "items-end" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {message.sender}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(message.timestamp, 'HH:mm')}
                          </span>
                        </div>
                        <div
                          className={`rounded-lg px-4 py-2 max-w-md ${
                            message.sender === "Current User"
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="border-t border-gray-200 p-4 bg-white rounded-b-lg"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message ${selectedUser.studentName}...`}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Select a chat</h3>
                  <p className="text-sm text-gray-500">Choose a user from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Message;