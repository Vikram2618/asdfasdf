import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { 
        type: String,
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true, 
        trim: true
    },
    member: { 
        type: Number,
        required: true,
        trim: true
    },
    startDate: { 
        type: String, 
        required: true, 
        trim: true
    },
    endDate: { 
        type: String, 
        required: true, 
        trim: true
    },
    attachment: {
        type: String,
        name: String,
        data: String, // Base64 data
    },
    createdDate: { 
        type: Date, 
        default: Date.now
    },

});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
