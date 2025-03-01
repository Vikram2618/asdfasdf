import { useState, useEffect } from 'react';
import { Pencil, Trash, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axios';

function TeacherPage() {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    attachment: null,
  });

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNotice({
          ...newNotice,
          attachment: {
            name: file.name,
            type: file.type,
            data: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (newNotice.title.trim() && newNotice.content.trim()) {
      try {
        const response = await axiosInstance.post("/notice", {
          title: newNotice.title,
          content: newNotice.content,
          attachment: newNotice.attachment || null,
        });
        setNotices([response.data, ...notices]);
        setNewNotice({ title: "", content: "", attachment: null });
      } catch (error) {
        console.error("Error adding notice:", error.response?.data || error);
      }
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      content: notice.content,
      attachment: notice.attachment,
    });
  };

  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    if (newNotice.title.trim() && newNotice.content.trim()) {
      try {
        const response = await axiosInstance.put(`/notice/${editingNotice._id}`, {
          title: newNotice.title,
          content: newNotice.content,
          attachment: newNotice.attachment,
        });
        setNotices(
          notices.map((notice) =>
            notice._id === editingNotice._id ? response.data : notice
          )
        );
        setEditingNotice(null);
        setNewNotice({ title: "", content: "", attachment: null });
      } catch (error) {
        console.error("Error updating notice:", error.response?.data || error);
      }
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await axiosInstance.delete(`/notice/${id}`);
        setNotices(notices.filter((notice) => notice._id !== id));
      } catch (error) {
        console.error("Error deleting notice:", error.response?.data || error);
      }
    }
  };

  const handleRemoveAttachment = () => {
    setNewNotice({ ...newNotice, attachment: null });
  };

  return (
    <div className='w-full bg-gray-100 min-h-screen p-6'>
      <header className="w-full h-16 bg-white shadow-md px-8 py-4 flex items-center justify-between rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800">Campus Connect</h1>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-500 transition">Chat</a>
          <Link to={'/'} className="hover:text-blue-500 transition">Dashboard</Link>
          <Link to={'/teacher'} className="hover:text-blue-500 transition">TeacherPage</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Teacher Notice Board</h2>
        
        <form onSubmit={editingNotice ? handleUpdateNotice : handleAddNotice} className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Title" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" required />
            <textarea placeholder="Content" value={newNotice.content} onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none h-32" required />
            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md inline-flex items-center space-x-2 transition">
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx" />
              <Paperclip className="w-5 h-5" />
              <span>Choose File</span>
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">{editingNotice ? 'Update Notice' : 'Add Notice'}</button>
          </div>
        </form>
        
        <div className="space-y-4 mt-6">
          {notices.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No notices available</p>
          ) : (
            notices.map((notice) => (
              <div key={notice._id} className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditNotice(notice)} className="p-2 hover:bg-gray-200 rounded-md transition"><Pencil className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteNotice(notice._id)} className="p-2 text-red-500 hover:text-red-600 transition"><Trash className="w-5 h-5" /></button>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{notice.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;
