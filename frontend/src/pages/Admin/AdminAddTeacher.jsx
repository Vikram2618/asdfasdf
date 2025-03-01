import React, { useState } from 'react';
import StudentNavbar from '../../components/StudentNavbar';
import { Link } from 'react-router-dom';


const AdminAddTeacher = () => {

    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentDiv, setStudentDiv] = useState('');
    const [studentDOB, setStudentDOB] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [dateError, setDateError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    
    const [bundel, setBundel] = useState([]);

    const handleSubmit = (e) => {
            e.preventDefault();
            if (new Date(startDate) >= new Date(endDate)) {
                setDateError('Invalide Date range');
                return;
            }
            setDateError('');
    
            if (studentNumber.length < 10) {
                setPhoneNumberError("Phone number must be 10 digits");
                return
            }
            setPhoneNumberError('');
    
            // Handle form submission logic here
    
            setBundel(prev => [...prev, {
                studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate
            }])
            
            localStorage.setItem('info' , JSON.stringify(bundel));
    
            console.log({ studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate });
    };

    const handlePhoneNumberChange = (e) => {
            const value = e.target.value;
            
            // Allow only numbers
            if (!/^\d*$/.test(value)) {
                setPhoneNumberError("Only numbers are allowed");
            } 
            // Validate length
            else if (value.length > 10) {
                setPhoneNumberError("Phone number must be 10 digits");
            } 
            else {
                setPhoneNumberError("");
            }
    
            setStudentNumber(value);
    };

    return (
        <div className='w-full'>
           <StudentNavbar/>

            <div className=' w-full h-[100%] pr-5 flex flex-row items-center justify-center gap-10'>

                <div className="w-[70%] flex flex-col items-center justify-center mt-5 p-6 bg-white rounded-lg ">
                    <h1 className="text-2xl font-bold mb-6 text-center">Add Teacher</h1>
                    <form onSubmit={handleSubmit} className='w-[60%]'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Teacher Name: <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Phone Number: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={studentNumber}
                                onChange={handlePhoneNumberChange}
                                maxLength="10"
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
                        </div>

                        <div className='flex items-center justify-between gap-4 md:flex-row flex-col'>
                            {/* class of student */}
                            <div className="mb-4 md:w-[50%] w-full">
                                <label className="block text-gray-700">Class: <span className="text-red-500">*</span></label>
                                <select
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select Class</option>
                                    <option value="FYBCA">FYBCA</option>
                                    <option value="SYBCA">SYBCA</option>
                                    <option value="TYBCA">TYBCA</option>
                                    <option value="FYBScIT">FYBScIT</option>
                                    <option value="SYBScIT">SYBScIT</option>
                                    <option value="TYBScIT">TYBScIT</option>
                                </select>
                            </div>

                            {/* student image */}
                            <div className="mb-4 md:w-[50%] w-full">
                                <label className="block text-gray-700">Photo:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        > Add student </button>
                    </form>
                </div>

                <div className='h-[80vh] mt-10 w-[15%] flex items-start justify-end '>
                    <Link to={'/admin/addteacher/view'} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition">
                        List of Teacher's
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AdminAddTeacher;