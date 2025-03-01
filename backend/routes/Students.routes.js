import express from "express";
import studentModel from "../models/AddStudent.models.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { studentName, studentNumber, studentClass } = req.body;

    if (!studentName || !studentNumber || !studentClass) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (studentNumber.length !== 10 ) {
        return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
    }

    try {
        const student = await studentModel.findOne({ studentName, studentNumber });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Login successful", student });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/addstudent", async (req, res) => {
    const { studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate } = req.body;

    if (!studentName || !studentNumber || !studentClass || !studentDiv || !studentDOB || !startDate || !endDate) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newStudent = await studentModel.create({
            studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate
        });

        res.status(201).json({ message: "Student added successfully", student: newStudent });

    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

router.get('/getStudent', async (req, res) =>{
    const student = await studentModel.find({});

    res.json({student});
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const student = await studentModel.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate } = req.body;

        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.id,
            { studentName, studentNumber, studentClass, studentDiv, studentDOB, startDate, endDate },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Error updating student", error });
    }
});


export default router;