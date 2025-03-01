import { useEffect, useState } from 'react';
import axiosInstance from '../config/axios';
// import { PaperClipIcon } from '@heroicons/react/24/outline';

function StudentPage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get("/notice");
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
  
    fetchNotices();
  }, []);

  return (
    <div className="max-w-4xl  h-full mx-auto">
      <h2 className="text-2xl text-center font-semibold mt-2 mb-2">Student Notice Board</h2>
      <div className="space-y-4 p-8 overflow-y-auto">
        {notices.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No notices available</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-[#e9e9e9] rounded-lg p-6  shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
              <p className="text-gray-800 mb-4 ">{notice.content}</p>
              {notice.attachment && (
                <div className="mb-4">
                  {notice.attachment.type.startsWith('image/') ? (
                    <img
                      src={notice.attachment.data}
                      alt="Notice attachment"
                      className="max-w-full h-auto rounded-lg max-h-96 object-contain"
                    />
                  ) : (
                    <a
                      href={notice.attachment.data}
                      download={notice.attachment.name}
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                    >
                      {/* <PaperClipIcon className="w-5 h-5" /> */}
                      <span>{notice.attachment.name}</span>
                    </a>
                  )}
                </div>
              )}
              <div className="text-sm text-gray-400">
                Posted on: {new Date(notice.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentPage;