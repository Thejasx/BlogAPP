import mongoose from 'mongoose';
import 'dotenv/config';
import Blog from './models/Blog.js';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected for migration");

        const res = await Blog.updateMany(
            { isAdminApproved: { $exists: false } },
            { $set: { isAdminApproved: true } }
        );

        console.log(`Migration result: ${JSON.stringify(res)}`);
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

run();
