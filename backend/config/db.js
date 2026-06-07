import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URL;
        if (!mongoURI) {
            console.error("Error: MONGODB_URL is not defined in the environment variables.");
            process.exit(1);
        }
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map