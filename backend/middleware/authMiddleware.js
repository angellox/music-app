const checkAuth = (req, res, next) => {
    
    const { authorization } = req.headers;
    
    console.log(authorization);

    if(authorization && authorization.startsWith('Bearer')){
        console.log('Si hay token con Bearer');
        next();
    } 

    const error = new Error('Token is not valid. Validate that your the person who is solicitating this request.');
    return res.status(403).json({ msg: error.message });
    
};

export default checkAuth;