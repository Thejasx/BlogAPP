import mongoose from "mongoose";

// Cache the connection for serverless environments (Vercel)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connDb = async () => {
    // If already connected, return the cached connection
    if (cached.conn) {
        return cached.conn;
    }

    // If a connection is in progress, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,  // Disable buffering so we get errors instead of timeouts
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose
            .connect(`${process.env.MONGODB_URI}/blogApp`, opts)
            .then((mongoose) => {
                console.log("Database Connected");
                return mongoose;
            })
            .catch((err) => {
                cached.promise = null; // Reset so next request can retry
                console.log(`Database connection error: ${err.message}`);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};

export default connDb;