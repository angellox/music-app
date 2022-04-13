const generateId = () => {
    const ran1 = Math.random().toString(32).substring(2);
    const ran2 = Date.now().toString(32);
    return ran1 + ran2;
};

export default generateId;