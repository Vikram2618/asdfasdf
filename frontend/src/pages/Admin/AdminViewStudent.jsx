import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";

const AdminViewStudent = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        studentName: "",
        studentNumber: "",
        studentClass: "",
        studentDiv: "",
        studentDOB: "",
        startDate: "",
        endDate: ""
    });


    // Fetch students from backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axiosInstance.get("/student/getStudent");
                setStudents(res.data.student); 
            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Failed to load students");
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) =>{
        try {
            const res = await axiosInstance.delete(`/student/delete/${id}`); // Correct URL
            if (res.status === 200) {
                setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
                toast.success("Student deleted successfully");
            } else {
                throw new Error("Failed to delete student");
            }
        } catch (error) {
            console.error("Error deleting student:", error.response?.data || error.message);
            toast.error("Failed to delete student. Check console for details.");
        }
    }
    
    const handleEditClick = (student) => {
        setEditingStudent(student._id);
        setFormData({
            studentName: student.studentName,
            studentNumber: student.studentNumber,
            studentClass: student.studentClass,
            studentDiv: student.studentDiv,
            studentDOB: student.studentDOB,
            startDate: student.startDate,
            endDate: student.endDate
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await axiosInstance.put(`/student/update/${editingStudent}`, formData);
    
            if (res.status === 200) {
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student._id === editingStudent ? { ...student, ...formData } : student
                    )
                );
                setEditingStudent(null); // Exit edit mode
                toast.success("Student updated successfully");
            } else {
                throw new Error("Failed to update student");
            }
        } catch (error) {
            console.error("Error updating student:", error.response?.data || error.message);
            toast.error("Failed to update student.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Toaster />
            <div className="flex  items-center justify-between gap-4">
                <h2 className="text-2xl font-bold mb-4">Student List</h2>
                <h2 className="text-base font-normal ">Total: { students.length }</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Phone</th>
                            <th className="py-2 px-4">Class</th>
                            <th className="py-2 px-4">Division</th>
                            <th className="py-2 px-4">Admission Date</th>
                            <th className="py-2 px-4">Completion Date</th>
                            <th className="py-2 px-4">Date of Birth</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (students.map((student) => (
                            <tr key={student._id} className="border-b">
                                {editingStudent === student._id ? (
                                    <>
                                        <td><input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="text" name="studentNumber" value={formData.studentNumber} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="text" name="studentDiv" value={formData.studentDiv} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="month" name="startDate" value={formData.startDate} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="month" name="endDate" value={formData.endDate} onChange={handleChange} className="border p-1" /></td>
                                        <td><input type="date" name="studentDOB" value={formData.studentDOB} onChange={handleChange} className="border p-1" /></td>
                                        <td className="flex items-center justify-center flex-col gap-2 py-2">
                                            <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white rounded">Save</button>
                                            <button onClick={() => setEditingStudent(null)} className="p-2 bg-gray-500 text-white rounded ml-2">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="text-center">{student.studentName}</td>
                                        <td className="text-center">{student.studentNumber}</td>
                                        <td className="text-center">{student.studentClass}</td>
                                        <td className="text-center">{student.studentDiv}</td>
                                        <td className="text-center">{student.startDate}</td>
                                        <td className="text-center">{student.endDate}</td>
                                        <td className="text-center">{student.studentDOB}</td>
                                        <td className="flex items-center justify-center py-2">
                                            <button onClick={() => handleEditClick(student)} className="p-2 bg-green-500 text-white rounded"><Pencil className="w-5 h-5" /></button>
                                            <button onClick={() => handleDelete(student._id)} className="p-2 bg-red-500 text-white rounded ml-2"><Trash2 className="w-5 h-5" /></button>
                                        </td>
                                    </>
                                ) }
                            </tr>
                        ))): (
                             <tr>
                                <td colSpan="8" className="text-center py-4">No data found</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminViewStudent;
