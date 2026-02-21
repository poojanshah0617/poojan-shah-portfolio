// Current Date and Time (UTC)
const currentDateTime = () => {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
};

console.log(`Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentDateTime()}`);