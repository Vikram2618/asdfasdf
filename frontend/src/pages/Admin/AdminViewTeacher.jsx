import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react"; // Import Lucide icons

const AdminViewTeacher = () => {
    const [students, setStudents] = useState([]);

    // Simulating fetching data (Replace with API call)
    useEffect(() => {
        const fetchData = async () => {
            // Example data - Replace with actual database/API call
            const studentData = [
                { id: 1, name: "John Doe", phone: "9876543210", class: "FYBCA", division: "A", admissionDate: "2023-06-15", completionDate: "2026-06-15", dob: "2005-04-20" },
                { id: 2, name: "Jane Smith", phone: "8765432109", class: "SYBCA", division: "B", admissionDate: "2022-06-10", completionDate: "2025-06-10", dob: "2004-08-12" },
            ];
            setStudents(studentData);
        };

        fetchData();
    }, []);

    // Delete student function
    const handleDelete = (id) => {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
    };

    // Edit student function
    const handleEdit = (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === id ? { ...student, name: newName } : student
                )
            );
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Teacher's List</h2>
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
                        {students.map((student) => (
                            <tr key={student.id} className="border-b">
                                <td className="py-2 px-4">{student.name}</td>
                                <td className="py-2 px-4">{student.phone}</td>
                                <td className="py-2 px-4">{student.class}</td>
                                <td className="py-2 px-4">{student.division}</td>
                                <td className="py-2 px-4">{student.admissionDate}</td>
                                <td className="py-2 px-4">{student.completionDate}</td>
                                <td className="py-2 px-4">{student.dob}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button 
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                        onClick={() => handleEdit(student.id)}
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button 
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminViewTeacher;
