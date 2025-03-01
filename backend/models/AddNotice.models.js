import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true, 
    trim: true
  },
  attachment: {
    type: String,
    name: String,
    data: String,
  },
  date: { 
    type: Date, 
    default: Date.now
  },
});

const NoticeModel = mongoose.model("Notice", noticeSchema);

export default NoticeModel;
