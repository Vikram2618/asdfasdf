import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentName:{
        type: String,
    },
    studentNumber: {
        type: String,
    },
    studentClass: {
        type: String,
    },
    studentDiv: {
        type: String,
    },
    studentDOB: {
        type: String,
    },
    photo: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
})

const studentModel = mongoose.model('AddedStudent', studentSchema);

export default studentModel;