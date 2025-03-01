import React, { useState } from 'react';
import { MessageCircle, Send, HelpCircle, User, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function TeacherMessage() {
  const [users] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      status: 'online'
    },
    {
      id: 2,
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      status: 'online'
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      status: 'online'
    }
  ]);

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
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

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
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <header className="w-full h-14  px-8 py-4 flex items-center justify-center">
          <nav className="w-full flex items-center justify-between">
              <div className=" flex gap-3">
                <MessageCircle className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-semibold">Campus</h1>
              </div>
              <div className="flex items-center justify-center gap-7">
                  <a href="" className="hover:underline">Chat</a>
                  <Link to={'/'} className="hover:underline">Dashboard</Link>
                  <Link to={'/student'} className="hover:underline">StudentPage</Link>
              </div>
          </nav>
      </header>

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
            <div className="flex-1 overflow-y-auto p-4">
              {filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  onClick={() => handleUserSelect(user)}
                  className={`flex  items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedUser?.id === user.id 
                      ? 'bg-indigo-50 border border-indigo-100' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.status === 'online' 
                        ? 'Online' 
                        : user.lastSeen 
                          ? `Last seen ${format(user.lastSeen, 'HH:mm')}`
                          : 'Offline'
                      }
                    </p>
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
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                      </p>
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
                      placeholder={`Message ${selectedUser.name}...`}
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

      {/* AI Assistant Button */}
      <button
        onClick={() => setShowAiAssistant(!showAiAssistant)}
        className="fixed bottom-5 right-5 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <HelpCircle className="h-6 w-6 text-indigo-600" />
      </button>

      {/* AI Assistant Modal */}
      {showAiAssistant && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Hello! I'm your AI assistant. How can I help you today?
          </p>
        </div>
      )}
    </div>
  );
}

export default TeacherMessage;