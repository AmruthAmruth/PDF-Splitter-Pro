import dns from "dns";
import mongoose from "mongoose";
const PUBLIC_DNS_SERVERS = ["1.1.1.1", "8.8.8.8"];
const applyPublicDnsFallback = () => {
    try {
        dns.setServers(PUBLIC_DNS_SERVERS);
        console.log(`Using public DNS servers for MongoDB: ${PUBLIC_DNS_SERVERS.join(", ")}`);
    }
    catch (dnsError) {
        console.warn("Unable to switch DNS servers for MongoDB SRV lookup:", dnsError);
    }
};
export const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URL;
    if (!mongoURI) {
        console.error("Error: MONGODB_URL is not defined in the environment variables.");
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        const message = error.message;
        console.error(`MongoDB Connection Error: ${message}`);
        if (mongoURI.startsWith("mongodb+srv://") && message.includes("querySrv ECONNREFUSED")) {
            console.error("MongoDB Atlas SRV DNS lookup failed. Attempting a retry using public DNS servers.");
            applyPublicDnsFallback();
            try {
                const conn = await mongoose.connect(mongoURI);
                console.log(`MongoDB Connected after DNS fallback: ${conn.connection.host}`);
                return;
            }
            catch (retryError) {
                console.error(`MongoDB Retry Connection Error: ${retryError.message}`);
            }
        }
        console.error("Please verify the following:\n" +
            "- Internet connectivity from this machine\n" +
            "- DNS SRV queries are allowed by your network/DNS provider\n" +
            "- The Atlas cluster host is correct\n" +
            "- Your current IP address is whitelisted in MongoDB Atlas network access");
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map