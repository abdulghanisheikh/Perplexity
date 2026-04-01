import {Redis} from "@upstash/redis";
import "dotenv/config";

export const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN
});

const checkRedisConnection = async() => {
    try {
        await redis.ping();
        console.log("Redis connected");
    } catch(err) {
        console.log("Redis connection failed:", err.message);
    }
}

checkRedisConnection();