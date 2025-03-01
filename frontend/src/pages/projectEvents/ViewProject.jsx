import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';

const ViewProject = () => {

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

    return (
        <div className="max-w-4xl py-6 h-full mx-auto">
            <h2 className="text-2xl text-center font-semibold mt-2 mb-2">Interested Student Can Apply</h2>
            <div className="space-y-4 p-8 overflow-y-auto">
                {allProjects.length > 0 ? (
                        allProjects.map((item)=>(
                            <div key={item._id} className="bg-[#d6d8db] w-full rounded-lg p-6 shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-medium"><strong>Project Name :</strong> {item.projectName}</h3>
                                    
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

export default ViewProject;