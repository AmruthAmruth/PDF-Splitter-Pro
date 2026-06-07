import dns from "dns";
import app from "./app.js";
import { connectDB } from "./config/db.js";
// Force Node to resolve IPv4 addresses first (avoids MongoDB Atlas DNS resolution issues on some networks)
dns.setDefaultResultOrder("ipv4first");
const PORT = process.env.PORT || 5000;
try {
    // Connect to Database
    await connectDB();
    // Start Express Server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
catch (error) {
    console.error("Critical server startup failure:", error);
    process.exit(1);
}
//# sourceMappingURL=server.js.map