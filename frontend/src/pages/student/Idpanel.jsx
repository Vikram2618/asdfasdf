import { Link } from "react-router-dom";
import { StudentContext } from "../../context/student.context";
import { useContext } from "react";

const Idpanel = () =>{

    const { studentData } = useContext(StudentContext);

    const student = studentData

    return(
        <div className='w-full'>

           <header className="w-full h-14  px-8 py-4 flex items-center justify-center">
                <nav className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Campus</h1>
                    <div className="flex items-center justify-center gap-7">
                        <a href="" className="hover:underline">Chat</a>
                        <Link to={'/'} className="hover:underline">Dashboard</Link>
                        <a href="" className="hover:underline">Notice</a>
                    </div>
                </nav>
            </header>

  
                
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-200 to-purple-300 p-6">
                <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-3xl border border-gray-300 transform hover:scale-105 transition-transform duration-300 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 relative overflow-visible">
                    <div className="relative md:w-1/3 flex justify-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/45.jpg"
                        alt="Student"
                        className="w-44 h-44 md:w-52 md:h-52 rounded-lg border-4 border-indigo-500 shadow-lg transform hover:rotate-6 transition-transform duration-300 md:absolute  md:top-1/2 md:-translate-y-1/2 md:translate-x-[-65%]"
                    />
                    </div>
                    <div className="text-gray-900 w-full md:w-3/4 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 uppercase tracking-wide mb-3">Student ID Card</h2>
                    <hr className="border-t-2 border-indigo-500 mb-3" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-lg">
                        <p><strong className="text-indigo-600">Name:</strong> {student.studentName}</p>
                        <p><strong className="text-indigo-600">Phone:</strong> {student.studentNumber}</p>
                        <p><strong className="text-indigo-600">PNR:</strong> 123456789</p>
                        <p><strong className="text-indigo-600">Class:</strong> {student.studentClass}</p>
                        <p><strong className="text-indigo-600">Division:</strong> {student.studentDiv}</p>
                        <p><strong className="text-indigo-600">Admission:</strong> {student.startDate}</p>
                        <p><strong className="text-indigo-600">Completion:</strong> {student.endDate}</p>
                        <p><strong className="text-indigo-600">DOB:</strong> {student.studentDOB}</p>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        
    )
}

export default Idpanel;

