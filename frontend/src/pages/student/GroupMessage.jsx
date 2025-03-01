import { useState } from "react";
import StudentSidebar from "../../components/sidebars/StudentSidebar";
import StudentNavbar from "../../components/StudentNavbar";
import { Send } from "lucide-react";


const GroupMessage = () =>{
    
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How are you?", sender: "other", image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, text: "I'm doing great!", sender: "other", image: "https://randomuser.me/api/portraits/men/1.jpg" },
      ]);
      const [input, setInput] = useState("");

      const sendMessage = () => {
        if (input.trim() !== "") {
          setMessages([...messages, { id: messages.length + 1, text: input, sender: "me", image: "https://randomuser.me/api/portraits/women/2.jpg" }]);
          setInput("");
        }
      };

    return(
        <div className='w-full'>
           <StudentNavbar/>

            <div className=' w-full h-[91vh] flex'>
                <StudentSidebar/>
                <div className=' w-[80%] flex items-center justify-center px-8 py-4 bg-gray-300'>
                    
                    <div className="flex w-full flex-col h-full rounded-lg bg-gray-100">
                        {/* Header Section */}
                        <div className="p-4 bg-white rounded-t-lg flex items-center gap-3 border-b shadow-sm">
                            <img src="data:image/jpeg;base64,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" 
                                alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="text-lg font-semibold">John Doe</div>
                        </div>
                        
                        {/* Messages Section */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-center gap-2 mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                                {msg.sender !== "me" && <img src={msg.image} alt="avatar" className="w-10 h-10 rounded-full" />}
                                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                                </div>
                                {msg.sender === "me" && <img src={msg.image} alt="avatar" className="w-10 h-10 rounded-full" />}
                            </div>
                            ))}
                        </div>
                        
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GroupMessage;



