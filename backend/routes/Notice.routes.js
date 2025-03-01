import express from "express";
import NoticeModel from "../models/AddNotice.models.js";

const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const { title, content, attachment } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }
  
      const newNotice = new NoticeModel({ title, content, attachment });
      await newNotice.save();
  
      res.status(201).json(newNotice);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
      const notices = await NoticeModel.find().sort({ date: -1 }); // Latest first
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
      const { title, content, attachment } = req.body;
  
      const updatedNotice = await NoticeModel.findByIdAndUpdate(
        req.params.id,
        { title, content, attachment, date: new Date() },
        { new: true }
      );
  
      if (!updatedNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }
  
      res.json(updatedNotice);
      
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const deletedNotice = await NoticeModel.findByIdAndDelete(req.params.id);
      if (!deletedNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }
  
      res.json({ message: "Notice deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  

export default router;
