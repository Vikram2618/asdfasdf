import express from "express";
import ProjectModel from "../models/AddProjectPartner.models.js";

const router = express.Router();

//for creating project
router.post("/", async (req, res) => {
    try {
      const { projectName, description, member, startDate, endDate, attachment } = req.body;
      
      if (!projectName || !description || !member || !startDate || !endDate ) {
        return res.status(400).json({ error: "All the fileds are required" });
      }
  
      const project = new ProjectModel({ projectName, description, member, startDate, endDate, attachment });
      await project.save();
  
      res.status(201).json(project);

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

//for taking project data
router.get("/get", async (req, res) => {
    try {
      const project = await ProjectModel.find().sort({ createdDate: -1 }); // Latest first

      res.json(project);

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
      const { title, content, attachment } = req.body;
  
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        req.params.id,
        { title, content, attachment, date: new Date() },
        { new: true }
      );
  
      if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      res.json(updatedProject);
      
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

      if (!deletedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      res.json({ message: "Project deleted successfully" });

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  

export default router;
