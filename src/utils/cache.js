export const setCache = (key, data, ttl = 3600000) => { // 1 hour = 3600000ms
    const record = {
        data,
        expiry: new Date().getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(record));
};

export const getCache = (key) => {
    const record = localStorage.getItem(key);
    if (!record) return null;

    try {
        const parsed = JSON.parse(record);
        if (new Date().getTime() > parsed.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    } catch (error) {
        console.error("Error reading cache:", error);
        return null;
    }
};