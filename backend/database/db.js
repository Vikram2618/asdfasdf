import mongoose from 'mongoose';

const DbConnection = () =>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('mongodb is connected');
    }).catch((err)=>{
        console.log('A Error is appear : ' + err);
    })
}

export default DbConnection;


