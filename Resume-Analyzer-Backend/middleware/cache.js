// server/middleware/cache.js
const redisClient = require('../config/redis');

async function cache(req, res, next) {
    const key = req.originalUrl;
    
    try {
        const cachedData = await redisClient.get(key);
        
        if (cachedData) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cachedData));
        }
        
        // If not cached, proceed and cache the response
        const originalSend = res.json;
        res.json = function(data) {
            // Cache for 1 hour
            redisClient.setEx(key, 3600, JSON.stringify(data));
            originalSend.call(this, data);
        };
        
        next();
    } catch (error) {
        console.error('Cache error:', error);
        next();
    }
}

module.exports = cache;