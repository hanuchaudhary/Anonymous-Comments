import mongoose from "mongoose"


const dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.DATABASE_URI || "")
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("Error while connecting to Databse ,Error : ", error);
    }
}

export default dbConnect;