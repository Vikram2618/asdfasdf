import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from '../../config/axios';
import { StudentContext } from "../../context/student.context";
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
    const navigate = useNavigate();

    const [studentName, setStudentName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [studentClass, setStudentClass] = useState("");

    const { setStudentData } = useContext(StudentContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

            navigate('/teacher');
            
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Toaster 
                position="top-left"
                reverseOrder={false}
            />
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Teacher Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Teacher Name:</label>
                        <input 
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number:</label>
                        <input 
                            type="text"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherLogin;
