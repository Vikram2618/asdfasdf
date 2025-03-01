import mongoose from 'mongoose';

const DbConnection = () =>{
    mongoose.connect('mongodb+srv://vikram:dkdjdjkfdkedjdkk@cluster0.iddoh.mongodb.net/codebugbackend').then(()=>{
        console.log('mongodb is connected');
    }).catch((err)=>{
        console.log('A Error is appear : ' + err);
    })
}

export default DbConnection;


