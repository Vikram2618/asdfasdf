import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Pencil, Trash, Paperclip } from 'lucide-react';


const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [dateError, setDateError] = useState('');

    const [allProjects, setAllProjects] = useState([]);

    useEffect(()=>{
        async function fectingProjectData(){
            try{
                const ProjectData = await axiosInstance.get('/project/get');
                setAllProjects(ProjectData.data);
            }
            catch(err){
                console.log("Error fetching Project data:", err);
                toast.error('Failed to load Project data');
            }
        }
        fectingProjectData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new Date(startDate) >= new Date(endDate)) {
            setDateError('End date should be greater than start date');
            return;
        }
        setDateError('');

        axiosInstance.post('/project', {
            projectName, description, member, startDate, endDate
        }).then((res)=>{
            setAllProjects((prev)=>[ res.data, ...prev ]);
            toast.success('Project posted successfully');
        }).catch((err)=>{
            console.log('error in creation of project', err);
            toast.error('Error to post the project');
        })

    };

    const handleDeleteNotice = async (id) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
          try {
            await axiosInstance.delete(`/project/${id}`);
            setAllProjects(allProjects.filter((project) => project._id !== id));
          } catch (error) {
            console.error("Error deleting notice:", error.response?.data || error);
          }
        }
    };

    return (
        <div className='w-full px-14 py-12 flex flex-col justify-between items-center gap-14'>

            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Project</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Project Name: <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description: <span className="text-red-500">*</span></label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='flex items-center justify-between gap-4 md:flex-row flex-col'>
                        {/* number of member */}
                        <div className="mb-4 md:w-[50%] w-full">
                            <label className="block  text-gray-700">Member Required:  <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* upload file and image */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Project File:</label>
                            <input
                                type="file"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* selectng date range */}
                    <div className='flex items-center justify-between gap-4 md:flex-row flex-col'>
                        <div className="mb-4 md:w-[50%] w-full">
                            <label className="block text-gray-700">Start Date: <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 md:w-[50%] w-full">
                            <label className="block text-gray-700">End Date: <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    {dateError && <p className="text-red-500 mb-4">{dateError}</p>}

                    
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    > Create Project </button>
                </form>
                
            </div>  

            <div className='w-full p-4 flex flex-col items-center justify-center gap-4'>
                {allProjects.length > 0 ? (
                    allProjects.map((item)=>(
                        <div key={item._id} className="bg-[#d6d8db] w-full rounded-lg p-6 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-medium"><strong>Project Name :</strong> {item.projectName}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditNotice(item)}
                                        className="p-2 hover:bg-gray-700 rounded-md transition-colors">
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteNotice(item._id)}
                                        className="p-2 hover:bg-gray-700 rounded-md transition-colors text-red-400"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-900 mb-4"><strong>Member Required :</strong> {item.member}</p>
                            <p className="text-gray-900 mb-4"><strong>Project Discription :</strong> {item.description}</p>
                            {item.attachment && (
                                <div className="mb-4">
                                    {item.attachment.type.startsWith('image/') ? (
                                    <img
                                        src={item.attachment.data}
                                        alt="Notice attachment"
                                        className="max-w-full h-auto rounded-lg max-h-96 object-contain"
                                    />
                                    ) : (
                                    <a
                                        href={item.attachment.data}
                                        download={item.attachment.name}
                                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                        <span>{item.attachment.name}</span>
                                    </a>
                                    )}
                                </div>
                            )}
                            <p className="text-gray-900 mb-4"><strong>Date Range : </strong>{item.startDate} <strong>to</strong> {item.endDate}</p>

                            <div className="text-sm text-gray-500">
                                Posted on : {new Date(item.createdDate).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No Data Found</p>
                )}
            </div>
            

        </div>
    );
};

export default CreateProject;